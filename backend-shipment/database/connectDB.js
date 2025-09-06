
const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect("mongodb+srv://forlearningsites:lFh3nBB5BfNhQHpu@shipment.rjdsw.mongodb.net/shipment?retryWrites=true&w=majority&appName=shipment").then(() => {
            console.log("Successfully connected to Database");
        }).catch(err =>  console.log(err))
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;