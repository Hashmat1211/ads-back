const mongoose = require('mongoose');
const ExpenseModel = require('../models/expenses.models');
const httpsStatus = require('http-status-codes');

const addNewExpense = async (req, res) => {
    try {
        const name = req.body.name;
        const { type, amount, payee } = req.body;
        let date = new Date(`${req.body.date} GMT`); //TODO: date day should be plus one every time
        if (date instanceof Date && !isNaN(date.valueOf())) {
            const prepObj = {
                _id: mongoose.Types.ObjectId(),
                type,
                amount,
                payee,
                date
            }
            console.log('ex ', prepObj)
            const newExpense = await ExpenseModel.addNewExpense(prepObj);
            console.log('new Expense ', newExpense)

            res.status(httpsStatus.CREATED).send({
                message: 'Content created'
            })
        } else {
            return res.status(httpsStatus.BAD_REQUEST).json({
                message: "check your date format please"
            })
        }

    } catch (error) {
        console.log('error in add new expense ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const updateExpense = async (req, res) => {
    try {
        const id = req.params.expenseId;
        if (req.body["date"]) {
            req.body["date"] = new Date(`${req.body.date} GMT`);
        }
        const prepObj = { ...req.body };

        const expense = await ExpenseModel.updateExpense(id, prepObj);

        if (!expense) {
            console.log('expense not found');
            return res.status(httpsStatus.NOT_FOUND)
        }

        res.status(httpsStatus.OK).send({
            message: 'Content updated',
            expense
        })
    } catch (error) {
        console.log('error in add new expense ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const deleteExpense = async (req, res) => {
    try {
        const id = req.params.expenseId;
        await ExpenseModel.deleteExpense(id);
        res.status(httpsStatus.OK).send({
            message: 'content is deleted'
        })

    } catch (error) {
        console.log('error in add new expense ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseModel.getAllExpenses();
        if (expenses.length === 0) {
            return res.status(httpsStatus.NO_CONTENT).send({
                message: 'there is no content'
            })
        }
        const obj = {
            total_Amount: expenses.reduce((sum, { amount }) => sum + amount, 0)
        }
        res.status(httpsStatus.OK).send({
            totalExpenses: obj.total_Amount,
            expenses
        })
    } catch (error) {
        console.log('error in add new expense ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const getExpenseById = async (req, res) => {
    try {
        const id = req.params.expenseId;
        const expense = await ExpenseModel.getExpenseById(id);
        if (!expense) {
            return res.status(httpsStatus.NO_CONTENT).send({
                message: 'there is no content'
            })
        }
        console.log('expense', expense)
        res.status(httpsStatus.OK).send({
            expense
        })
    } catch (error) {
        console.log('error in add new expense ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const searchExpense = async (req, res) => {
    try {
        const searchData = req.body;
        const expenses = await ExpenseModel.getExpenseByDifferentParameters(searchData);
        // console.log('expenses ... @ === ', expenses)
        if (expenses.length <= 0) {
            return res.status(httpsStatus.NO_CONTENT).json({
                message: 'there is no content'
            })
        }
        const obj = {
            total_Amount: expenses.reduce((sum, { amount }) => sum + amount, 0)
        }
        console.log('expenses ', expenses)
        res.status(httpsStatus.OK).json({
            'total': obj.total_Amount,
            'expenses': expenses
        })
    } catch (error) {
        console.log('error in searching new expense ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

module.exports = {
    addNewExpense,
    updateExpense,
    deleteExpense,
    getAllExpenses,
    getExpenseById,
    searchExpense
}