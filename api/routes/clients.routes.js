/* IMPORTING MODULES */
const express = require("express");
const clientsController = require("../controllers/clients.controllers");
/* Validations */
const clientsValidator = require('../validators/clients.validators');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post("/add", clientsValidator.addClientValidator, clientsController.addNewClient);
router.patch("/update/:clientId", clientsValidator.updateClientValidator, clientsController.updateClient);
router.delete("/delete/:clientId", clientsValidator.deleteClientValidator, clientsController.deleteClient);
router.get("/getAllClients", clientsController.getAllClients);
router.get("/getSingleClient/:clientId", clientsValidator.getClientByIdValidator, clientsController.getClientById);
router.post('/getClientIdByClientName/', clientsController.getClientIdByClientName);
module.exports = router;