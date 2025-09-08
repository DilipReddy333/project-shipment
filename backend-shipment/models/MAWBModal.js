const mongoose = require("mongoose");

const MawbSchema = mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      // unique:true,
    },
    mawbNo: {
      type: String,
      required: true,
      unique: true,
      maxLength: 11,
      trim: true,
    },
    origin: {
      type: String,
      required: true,
      maxlength: 3,
      uppercase: true, // force codes like "DEL"
      match: /^[A-Z]{3}$/, // IATA code
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
    hawbIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hawb",
      },
    ],
  },
  { timestamps: true }
);
const MawbModal = mongoose.model("Mawb", MawbSchema);
module.exports = MawbModal;
