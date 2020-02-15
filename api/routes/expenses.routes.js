/* IMPORTING MODULES */
const express = require("express");
const expensesController = require("../controllers/expenses.controllers");
/* Validations */
const expensesValidator = require('../validators/expenses.validators');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post("/add", expensesValidator.addExpenseValidator, expensesController.addNewExpense);
router.post("/search", expensesValidator.searchExpenseValidator, expensesController.searchExpense);
router.patch("/update/:expenseId", expensesValidator.updateExpenseValidator, expensesController.updateExpense);
router.delete("/delete/:expenseId", expensesValidator.deleteExpenseValidator, expensesController.deleteExpense);
router.get("/getAllExpenses", expensesController.getAllExpenses);
//TODO: get single expense has been removed

module.exports = router;