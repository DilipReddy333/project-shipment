
const mongoose = require('mongoose');

const MawbSchema = mongoose.Schema({
    clientName: {
        type:String,
        required:true,
        unique:true,
    },
    mawbNo:{
        type:String,
        required: true,
        unique: true,
        maxLength:11,
    },
    origin: {
        type: String,
        required: true,
        maxLength:3,
    },
    destination: {
        type: String,
        required: true,
        maxLength:3,
    },
    totalNoOfPieces: {
        type: Number,
        required: true,
    },
    grossWeight: {
        type: Number,
        required: true,
    },
    hawbIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hawb"
    }]
})
const MawbModal = mongoose.model("Mawb",MawbSchema);
module.exports = MawbModal;