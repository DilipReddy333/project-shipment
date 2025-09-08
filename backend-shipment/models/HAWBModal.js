const mongoose = require("mongoose");

const HawbSchema = mongoose.Schema(
  {
    hawbNo: {
      type: String,
      required: true,
      unique: true,
      maxLength: 25,
      trim: true,
    },
    origin: {
      type: String,
      required: true,
      maxlength: 3,
      uppercase: true,
      match: /^[A-Z]{3}$/,
    },
    destination: {
      type: String,
      required: true,
      maxlength: 3,
      uppercase: true,
      match: /^[A-Z]{3}$/,
    },
    totalNoOfPieces: {
      type: Number,
      required: true,
      min: 1,
    },
    grossWeight: {
      type: Number,
      required: true,
      min: 0,
    },
    commodity: {
      type: String,
      required: true,
      maxLength: 25,
      trim: true,
    },
    mawbId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mawb",
      required: true,
    },
  },
  { timestamps: true }
);
const HawbModal = mongoose.model("Hawb", HawbSchema);
module.exports = HawbModal;
