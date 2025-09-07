const MawbModal = require("../models/MAWBModal");
const HawbModal = require("../models/HAWBModal");

// function to save mawb details and hawb details and get the hawb details ids and store to the ref in mawb
const saveMawbAndHawbDetails = async (req, res) => {
    try {
        const {mawbDetails, allHawbDetails} = req.body;
        const savedHawbDetails = await HawbModal.insertMany(allHawbDetails);
        const hawbIds = savedHawbDetails.map((h) => h._id);
        const newMawbDetails = new MawbModal({
            ...mawbDetails,
            hawbIds
        });
        const savedMawbAndHawbDetails = await newMawbDetails.save();
        res.status(201).json(savedMawbAndHawbDetails);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

// function to get the Mawb and Hawb details
const getAllMawbAndHawbDetails = async (req, res) => {
    try {
        const allDetails = await MawbModal.find().populate("hawbIds");
        if(allDetails.length > 0){
            return res.status(200).json(allDetails);
        } else {
            return res.status(400).json("No Mawb and Hawb details found!");
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

module.exports = {
    saveMawbAndHawbDetails,
    getAllMawbAndHawbDetails,
}