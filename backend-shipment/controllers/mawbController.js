const mongoose = require("mongoose");
const MawbModal = require("../models/MAWBModal");
const HawbModal = require("../models/HAWBModal");

// function to save mawb details to the database
// const saveMawbDetails = async (req, res) => {
//   try {
//     const { mawbDetails } = req.body;
//     if (!mawbDetails) {
//       return res.status(400).json({ message: "No Mawb details to save" });
//     }
//     const savedMawbDetail = await MawbModal.create(mawbDetails);
//     if (savedMawbDetail) {
//       return res.status(201).json(savedMawbDetail);
//     } else {
//       return res.status(400).json({ message: "Failed to create Mawb details" });
//     }
//   } catch (error) {
//     console.log("Error in saving Mawb details:", error);
//     return res.status(400).json({ message: error.message });
//   }
// };

// function to get all mawb details
// const getAllMawbDetails = async (req, res) => {
//   try {
//     const allMawbDetails = await MawbModal.find();
//     return res.status(200).json(allMawbDetails);
//   } catch (error) {
//     console.log("Error in getting all Mawb details:", error);
//     return res.status(400).json({ message: error.message });
//   }
// };

// function to update mawb details
// const updateMawbDetail = async (req, res) => {
//   try {
//     const { mawbId } = req.params;
//     const { mawbDetails } = req.body;
//     if (!mawbId) {
//       return res.status(400).json({ message: "No Mawb Id found to update" });
//     }
//     if (!mawbDetails) {
//       return res
//         .status(400)
//         .json({ message: "Please provide valid Mawb details to update" });
//     }
//     const updatedMawbDetail = await MawbModal.findByIdAndUpdate(
//       mawbId,
//       mawbDetails,
//       { new: true }
//     );
//     if (updatedMawbDetail) {
//       return res.status(200).json(updatedMawbDetail);
//     } else {
//       return res
//         .status(400)
//         .json({ message: "Mawb details not found in Database to update" });
//     }
//   } catch (error) {
//     console.log("Error in updating Mawb details:", error);
//     return res.status(400).json({ message: error.message });
//   }
// };

// function to delete Mawb details
// const deleteMawbDetail = async (req, res) => {
//   try {
//     const { mawbId } = req.params;
//     if (!mawbId) {
//       return res.status(400).json({ message: "No Mawb Id found to delete" });
//     }
//     const deletedDetail = await MawbModal.findByIdAndDelete(mawbId);
//     if (deletedDetail) {
//       return res
//         .status(200)
//         .json({ message: "Mawb detail deleted successfully" });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "No Mawb details found to delete" });
//     }
//   } catch (error) {
//     console.log("Error in deleting Mawb details:", error);
//     return res.status(400).json({ message: error.message });
//   }
// };

const saveMawbAndHawbDetails = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { mawbDetails, allHawbDetails } = req.body;
    // 1. Save Mawb
    const savedMawbDetail = await MawbModal.create([mawbDetails], { session });
    const mawbId = savedMawbDetail[0]._id;

    // 2. Attach mawbId to Hawbs and insert
    const updatedHawbDetails = allHawbDetails.map((d) => ({
      ...d,
      mawbId,
    }));
    const savedHawbDetails = await HawbModal.insertMany(updatedHawbDetails, {
      session,
    });

    const hawbIds = savedHawbDetails.map((h) => h._id);

    // 3. Update Mawb with hawbIds
    await MawbModal.findByIdAndUpdate(
      mawbId,
      { $set: { hawbIds } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    // 4. Return populated MAWB
    const foundMawbDetails = await MawbModal.findById(mawbId).populate(
      "hawbIds"
    );
    res.status(201).json(foundMawbDetails);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error saving Mawb + Hawb:", error);
    return res.status(400).json({ message: "Failed to save Mawb + Hawb" });
  }
};

// function to get the Mawb and Hawb details
const getAllMawbAndHawbDetails = async (req, res) => {
  try {
    const allDetails = await MawbModal.find().populate("hawbIds");
    if (allDetails.length > 0) {
      return res.status(200).json(allDetails);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// function to update mawb and hawb details
const updateMawbAndHawbDetails = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { mawbId } = req.params;
    const { mawbDetails, allHawbDetails } = req.body;
    // 1. Ensure Mawb exists
    const existingMawb = await MawbModal.findById(mawbId).session(session);
    if (!existingMawb) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Mawb not found" });
    }
    const hawbIds = [];
    // 2. Upsert HAWBs
    // If hawb detail is found in the database, update it or add as a new and push the _id of the newly added hawbId to hawbIds array
    for (const data of allHawbDetails) {
      const updatedHawb = await HawbModal.findOneAndUpdate(
        { hawbNo: data.hawbNo }, // filter because of hawb details is new, we won't be having _id so find the hawb detail using hawbNo
        { ...data, mawbId }, // update fields
        { upsert: true, new: true, session } // if not found, insert
      );
      hawbIds.push(updatedHawb?._id);
      //   console.log("Result:", result);
    }
    console.log("Hawb documents updated successfully!");
    console.log("hawbIds:", hawbIds);
    // 3. Update Mawb
    const updatedMawbDetail = await MawbModal.findByIdAndUpdate(
      mawbId,
      { ...mawbDetails, hawbIds },
      { new: true, session }
    );
    await session.commitTransaction();
    session.endSession();
    // 4. Populate and return
    const populatedMawb = await MawbModal.findById(
      updatedMawbDetail._id
    ).populate("hawbIds");

    return res.status(200).json(populatedMawb);
  } catch (error) {
    console.log("error in updating mawb and hawb details:", error);
    return res.status(400).json(error);
  }
};

// delete mawb details and all it's associated hawb details
const deleteMawbAndHawbDetails = async (req, res) => {
  try {
    const { mawbId } = req.params;
    const foundMawbDetail = await MawbModal.findOne({ _id: mawbId });
    if (foundMawbDetail) {
      // delete Hawb details in Hawb Model using the id's present in foundMawbDetail
      await HawbModal.deleteMany({ _id: { $in: foundMawbDetail.hawbIds } });

      // delete the mawb detail itself
      await MawbModal.findByIdAndDelete(mawbId);

      return res.status(200).json({ message: "Mawb and Hawb details deleted" });
    } else {
      return res
        .status(400)
        .json({ message: "No Mawb detail found to delete" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  saveMawbAndHawbDetails,
  getAllMawbAndHawbDetails,
  updateMawbAndHawbDetails,
  deleteMawbAndHawbDetails,
};
