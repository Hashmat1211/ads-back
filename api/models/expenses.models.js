const Expense = require('../schemas/expense');
const httpsStatus = require('http-status-codes')

const addNewExpense = async (expenseObj) => {
    try {
        const expense = new Expense(expenseObj);
        return await expense.save();

    } catch (error) {
        console.log('error in add new expense ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const updateExpense = async (id, updateObj) => {
    try {
        return await Expense.findByIdAndUpdate({ _id: id }, updateObj, { upsert: true, new: true });
    } catch (error) {
        console.log('error in updating name expense ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const deleteExpense = async (id) => {
    try {
        return await Expense.deleteOne({ _id: id });
    } catch (error) {
        console.log('error in deleting name expense ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getAllExpenses = async () => {
    try {
        return await Expense.find({}).lean().select(`_id type amount payee date`);
    } catch (error) {
        console.log('error in getting all expenses ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getExpenseById = async (id) => {
    try {
        return await Expense.findOne({ _id: id }).lean().select(`_id type amount payee date`);
    } catch (error) {
        console.log('error in getting expense by id ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getExpenseByPayee = async (payee) => {
    try {
        return await Expense.findOne({ payee }).lean().select(`_id type amount payee date`);
    } catch (error) {
        console.log('error in getting expense by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getExpenseByType = async (payee) => {
    try {
        return await Expense.findOne({ type }).lean().select(`_id type amount payee date`);
    } catch (error) {
        console.log('error in getting expense by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getExpenseByDate = async (payee) => {
    try {
        return await Expense.findOne({ date }).lean().select(`_id type amount payee date`);
    } catch (error) {
        console.log('error in getting expense by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

module.exports = {
    addNewExpense,
    updateExpense,
    deleteExpense,
    getAllExpenses,
    getExpenseById,
    getExpenseByPayee,
    getExpenseByType,
    getExpenseByDate
}