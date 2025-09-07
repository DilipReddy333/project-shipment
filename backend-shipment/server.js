
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const clientRouter = require('./routes/ClientRouter');
const connectDB = require('./database/connectDB');
const mawbRouter = require('./routes/mawbRouter');


const PORT = process.env.PORT || 4000;

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/clients",clientRouter);
app.use("/mawb", mawbRouter);



app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`);
})