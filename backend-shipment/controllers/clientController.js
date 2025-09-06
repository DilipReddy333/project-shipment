const clientModel = require("../models/clientModel")

const getClients = async (req, res) => {
    try {
        const allClients = await clientModel.find();
        if(allClients.length === 0){
            return res.status(200).json({message:"No Clients Added"})
        }else{
            return res.status(200).json({clients:allClients});
        }

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const saveClient = async (req, res) => {
    try {
        const newClient = await clientModel.create(req.body);
        // console.log(newClient);
        if(newClient){
            res.status(201).json({message:"Client added successfully"})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getSingleClient = async (req, res) => {
    try {
        const client = await clientModel.findById(req.params.clientId);
        if(client){
            res.status(200).json(client);
        }else{
            res.status(400).json({message:"Could not find the client"});
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const updateClient = async (req, res) => {
    try {
        const updatedClient = await clientModel.findByIdAndUpdate(req.params.clientId,{...req.body},{new:true});
        if(updatedClient){
            res.status(200).json(updatedClient)
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const deleteClient = async (req, res) => {
    const {clientId} = req.params;
    try {
        const deletedClient = await clientModel.findByIdAndDelete(clientId);
        if(deletedClient){
            res.status(200).json({message:"Client deleted successfully"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({message:error.message})
    }
}

module.exports = {
    getClients,
    saveClient,
    getSingleClient,
    updateClient,
    deleteClient,
}