
const mongoose = require('mongoose');

const HawbSchema = mongoose.Schema({
    hawbNo:{
        type:String,
        required: true,
        unique: true,
        maxLength: 25,
    },
    origin: {
        type: String,
        required: true,
        maxLength:3,
    },
    destination: {
        type: String,
        required: true,
        MaxLength:3,
    },
    totalNoOfPieces: {
        type: Number,
        required: true,
    },
    grossWeight: {
        type: Number,
        required: true,
    },
    commodity: {
        type: String,
        required: true,
        maxLength: 25,
    }
})
const HawbModal = mongoose.model("Hawb",HawbSchema);
module.exports = HawbModal;