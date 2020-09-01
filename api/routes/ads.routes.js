/* IMPORTING MODULES */
const express = require("express");
const adsController = require("../controllers/ads.controllers");
/* Validations */
/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post('/test', adsController.testScrap)

module.exports = router;