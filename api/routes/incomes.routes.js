/* IMPORTING MODULES */
const express = require("express");
const incomesController = require("../controllers/incomes.controllers");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post("/add", incomesController.addNewIncome);
router.patch("/update/:incomeId", incomesController.updateIncome);
router.delete("/delete/:incomeId", incomesController.deleteIncome);
router.get("/getAllIncomes", incomesController.getAllIncomes);
router.get("/getSingleIncome/:incomeId", incomesController.getIncomeById);

module.exports = router;