
const express = require('express');
const { saveMawbAndHawbDetails, getAllMawbAndHawbDetails } = require('../controllers/mawbController');

const mawbRouter = express.Router();

mawbRouter.post("/", saveMawbAndHawbDetails);
mawbRouter.get("/", getAllMawbAndHawbDetails);

module.exports = mawbRouter;