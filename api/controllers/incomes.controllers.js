const mongoose = require('mongoose');
const IncomeModel = require('../models/incomes.models');
const httpsStatus = require('http-status-codes');

const addNewIncome = async (req, res) => {
    try {
        const { amount, developer, project, client, hours } = req.body;
        const startDate = new Date(`${req.body.startDate} GMT`);
        const endDate = new Date(`${req.body.endDate} GMT`);
        const prepObj = {
            _id: mongoose.Types.ObjectId(),
            amount,
            developer,
            project,
            client,
            hours,
            startDate,
            endDate
        }
        await IncomeModel.addNewIncome(prepObj);

        res.status(httpsStatus.CREATED).send({
            message: 'Content created'
        })

    } catch (error) {
        console.log('error in add new income ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const updateIncome = async (req, res) => {
    try {
        const id = req.params.incomeId;
        if (req.body["startDate"]) {
            req.body["startDate"] = new Date(`${req.body.startDate} GMT`);
        }
        if (req.body["endDate"]) {
            req.body["endDate"] = new Date(`${req.body.endDate} GMT`);
        }
        const prepObj = { ...req.body };



        const income = await IncomeModel.updateIncome(id, prepObj);
        console.log('income ', income)

        if (!income) {
            console.log('income not found');
            return res.status(httpsStatus.NO_CONTENT).json({
                message: 'Content not found'

            })
        }

        res.status(httpsStatus.CREATED).json({
            message: 'Content created',
            income
        })
    } catch (error) {
        console.log('error in add new income ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const deleteIncome = async (req, res) => {
    try {
        const id = req.params.incomeId;
        await IncomeModel.deleteIncome(id);
        res.status(httpsStatus.OK).send({
            message: 'content is deleted'
        })

    } catch (error) {
        console.log('error in add new income ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const getAllIncomes = async (req, res) => {
    try {
        const incomes = await IncomeModel.getAllIncomes();
        if (incomes.length === 0) {
            return res.status(httpsStatus.NO_CONTENT).send({
                message: 'there is no content'
            })
        }
        const obj = {
            total_Amount: incomes.reduce((sum, { amount }) => sum + amount, 0)
        }
        res.status(httpsStatus.OK).send({
            totalIncomes: obj.total_Amount,
            incomes
        })
    } catch (error) {
        console.log('error in add new income ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const getIncomeById = async (req, res) => {
    try {
        const id = req.params.incomeId;
        const income = await IncomeModel.getIncomeById(id);
        if (!income) {
            return res.status(httpsStatus.NO_CONTENT).send({
                message: 'there is no content'
            })
        }
        res.status(httpsStatus.OK).send({
            income
        })
    } catch (error) {
        console.log('error in add new income ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const getIncomeByClientId = async (req, res) => {
    try {
        const id = req.params.clientId;
        const incomes = await IncomeModel.getIncomeByClient(id);
        if (incomes.length <= 0) {
            return res.status(httpsStatus.NO_CONTENT).json({
                message: 'there is no content'
            })
        }
        const totalIncome = incomes[0].total;
        res.status(httpsStatus.OK).json({
            'totalIncome': totalIncome
        })
    } catch (error) {
        console.log('error in add new income ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}
const searchIncomes = async (req, res) => {
    try {
        const searchData = req.body;
        console.log(searchData)
        const incomes = await IncomeModel.getIncomeByDifferentParameters(searchData);
        console.log('incomes ... @ === ', incomes)
        if (incomes.length <= 0) {
            return res.status(httpsStatus.NO_CONTENT).json({
                message: 'there is no content'
            })
        }
        console.log('incomes ... ')
        console.log(incomes)
        const obj = {
            total_Amount: incomes.reduce((sum, { amount }) => sum + amount, 0)
        }
        res.status(httpsStatus.OK).json({
            'total': obj.total_Amount,
            'incomes': incomes
        })
    } catch (error) {
        console.log('error in searching incomes ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}


module.exports = {
    addNewIncome,
    updateIncome,
    deleteIncome,
    getAllIncomes,
    getIncomeById,
    getIncomeByClientId,
    searchIncomes
}