/* IMPORTING MODULES */
const express = require("express");
const expensesController = require("../controllers/projects.controller");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post("/add", expensesController.addNewExpense);
router.patch("/update/:expenseId", expensesController.updateExpense);
router.delete("/delete/:expenseId", expensesController.deleteExpense);
router.get("/getAllExpenses", expensesController.getAllExpenses);
router.get("/getSingleExpense/:expenseId", expensesController.getSingleExpense);

module.exports = router;