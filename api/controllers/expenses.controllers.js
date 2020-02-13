const mongoose = require('mongoose');
const ExpenseModel = require('../models/expenses.models');
const httpsStatus = require('http-status-codes');

const addNewExpense = async (req, res) => {
    try {
        const name = req.body.name;
        const { type, amount, payee, date } = req.body;
        const prepObj = {
            _id: mongoose.Types.ObjectId(),
            name,
            type,
            amount,
            payee,
            date
        }
        await ExpenseModel.addNewExpense(prepObj);

        res.status(httpsStatus.CREATED).send({
            message: 'Content created'
        })

    } catch (error) {
        console.log('error in add new expense ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const updateExpense = async (req, res) => {
    try {
        const id = req.params.expenseId
        const prepObj = { ...req.body };

        const expense = await ExpenseModel.updateExpense(id, prepObj);

        if (!expense) {
            console.log('expense not found');
            return res.status(httpsStatus.NOT_FOUND)
        }

        res.status(httpsStatus.CREATED).send({
            message: 'Content created',
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
        if (expense.length === 0) {
            return res.status(httpsStatus.NO_CONTENT).send({
                message: 'there is no content'
            })
        }
        res.status(httpsStatus.OK).send({
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

module.exports = {
    addNewExpense,
    updateExpense,
    deleteExpense,
    getAllExpenses,
    getExpenseById
}