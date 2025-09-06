
const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("Successfully connected to Database");
        }).catch(err =>  console.log(err))
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;