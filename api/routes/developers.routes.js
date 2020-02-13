/* IMPORTING MODULES */
const express = require("express");
const developersController = require("../controllers/developers.controllers");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post("/add", developersController.addNewDeveloper);
router.patch("/update/:developerId", developersController.updateDeveloper);
router.delete("/delete/:developerId", developersController.deleteDeveloper);
router.get("/getAllDevelopers", developersController.getAllDevelopers);
router.get("/getSingleDeveloper/:developerId", developersController.getDeveloperById);

module.exports = router;