/* IMPORTING MODULES */
const express = require("express");
const expensesController = require("../controllers/expenses.controllers");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post("/add", expensesController.addNewExpense);
router.patch("/update/:expenseId", expensesController.updateExpense);
router.delete("/delete/:expenseId", expensesController.deleteExpense);
router.get("/getAllExpenses", expensesController.getAllExpenses);
//TODO: get single expense has been removed

module.exports = router;