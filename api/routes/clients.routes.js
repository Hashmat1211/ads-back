/* IMPORTING MODULES */
const express = require("express");
const clientsController = require("../controllers/clients.controllers");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post("/add", clientsController.addNewClient);
router.patch("/update/:clientId", clientsController.updateClient);
router.delete("/delete/:clientId", clientsController.deleteClient);
router.get("/getAllClients", clientsController.getAllClients);
router.get("/getSingleClient/:clientId", clientsController.getClientById);

module.exports = router;