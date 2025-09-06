
const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    panNo:{
        type:String,
        required:true
    },
    groupName:{
        type:String,
        required:true,
    },
    companyName:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    }
},
{
    timestamps:true
}
)

const clientModel = mongoose.model("clientDetails",clientSchema);
module.exports = clientModel;