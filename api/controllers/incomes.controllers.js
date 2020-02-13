const mongoose = require('mongoose');
const IncomeModel = require('../models/incomes.models');
const httpsStatus = require('http-status-codes');

const addNewIncome = async (req, res) => {
    try {
        const name = req.body.name;
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

        if (!income) {
            console.log('income not found');
            return res.status(httpsStatus.NOT_FOUND)
        }

        res.status(httpsStatus.CREATED).send({
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
        res.status(httpsStatus.OK).send({
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

module.exports = {
    addNewIncome,
    updateIncome,
    deleteIncome,
    getAllIncomes,
    getIncomeById
}