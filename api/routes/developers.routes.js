/* IMPORTING MODULES */
const express = require("express");
const developersController = require("../controllers/developers.controllers");
/* Validations */
const developersValidator = require('../validators/developers.validators');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post("/add", developersValidator.addDeveloperValidator, developersController.addNewDeveloper);
router.patch("/update/:developerId", developersValidator.updateDeveloperValidator, developersController.updateDeveloper);
router.delete("/delete/:developerId", developersValidator.deleteDeveloperValidator, developersController.deleteDeveloper);
router.get("/getAllDevelopers", developersController.getAllDeveloper);
router.get("/getSingleDeveloper/:developerId", developersValidator.getDeveloperByIdValidator, developersController.getDeveloperById);

module.exports = router;