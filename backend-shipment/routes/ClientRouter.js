const express = require("express");
const { saveClient, getClients,getSingleClient, deleteClient, updateClient } = require("../controllers/clientController");


const clientRouter = express.Router();

clientRouter.get("/",getClients);
clientRouter.post("/save", saveClient);
clientRouter.get("/:clientId",getSingleClient)
clientRouter.put("/:clientId",updateClient);
clientRouter.delete("/delete/:clientId",deleteClient);

module.exports = clientRouter;