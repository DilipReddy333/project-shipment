const express = require("express");
const {
  saveMawbAndHawbDetails,
  getAllMawbAndHawbDetails,
  updateMawbAndHawbDetails,
  deleteMawbAndHawbDetails,
} = require("../controllers/mawbController");

const mawbRouter = express.Router();

mawbRouter.post("/", saveMawbAndHawbDetails);
mawbRouter.get("/", getAllMawbAndHawbDetails);
mawbRouter.put("/:mawbId", updateMawbAndHawbDetails);
mawbRouter.delete("/:mawbId", deleteMawbAndHawbDetails);

module.exports = mawbRouter;
