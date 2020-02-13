const Income = require('../schemas/income');
const httpsStatus = require('http-status-codes')

const addNewIncome = async (incomeObj) => {
    try {
        const income = new Income(incomeObj);
        return await income.save();

    } catch (error) {
        console.log('error in add new income ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const updateIncome = async (id, updateObj) => {
    try {
        return await Client.findByIdAndUpdate({ _id: id }, { updateObj }, { upsert: true, new: true });
    } catch (error) {
        console.log('error in updating name income ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const deleteIncome = async (id) => {
    try {
        return await Income.delete({ _id: id });
    } catch (error) {
        console.log('error in deleting name income ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getAllIncomes = async () => {
    try {
        return await Income.find({}).lean().select(`_id type amount payee date`);
    } catch (error) {
        console.log('error in getting all incomes ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getIncomeById = async (id) => {
    try {
        return await Income.findOne({ _id: id }).lean().select(`_id type amount payee date`);
    } catch (error) {
        console.log('error in getting income by id ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getIncomeByProject = async (project) => {
    try {
        return await Income.findOne({ project }).lean().select(`_id type amount payee date`);
    } catch (error) {
        console.log('error in getting income by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getIncomeByClient = async (client) => {
    try {
        return await Income.findOne({ client }).lean().select(`_id type amount payee date`);
    } catch (error) {
        console.log('error in getting income by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getIncomeByStartDate = async (startDate) => {
    try {
        return await Income.findOne({ startDate }).lean().select(`_id type amount payee date`);
    } catch (error) {
        console.log('error in getting income by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getIncomeByEndDate = async (endDate) => {
    try {
        return await Income.findOne({ endDate }).lean().select(`_id type amount payee date`);
    } catch (error) {
        console.log('error in getting income by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}
const getIncomeByDeveloper = async (startDate) => {
    try {
        return await Income.findOne({ developer }).lean().select(`_id type amount payee date`);
    } catch (error) {
        console.log('error in getting income by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

module.exports = {
    addNewIncome,
    updateIncome,
    deleteIncome,
    getAllIncomes,
    getIncomeById,
    getIncomeByClient,
    getIncomeByEndDate,
    getIncomeByProject,
    getIncomeByStartDate,
    getIncomeByDeveloper
}