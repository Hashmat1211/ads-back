/* IMPORTING MODULES */
const express = require("express");
const incomesController = require("../controllers/incomes.controllers");
/* Validations */
const incomesValidator = require('../validators/incomes.validators');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post("/add", incomesValidator.addIncomeValidator, incomesController.addNewIncome);
router.patch("/update/:incomeId", incomesValidator.updateIncomeValidator, incomesController.updateIncome);
router.delete("/delete/:incomeId", incomesValidator.deleteIncomeValidator, incomesController.deleteIncome);
router.post('/search', incomesController.searchIncomes)
router.get("/getAllIncomes", incomesController.getAllIncomes);
router.get("/getSingleIncome/:incomeId", incomesValidator.getIncomeByIdValidator, incomesController.getIncomeById);
router.get('/client/:clientId', incomesController.getIncomeByClientId);
module.exports = router;