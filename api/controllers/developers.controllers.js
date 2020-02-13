const mongoose = require('mongoose');
const DeveloperModel = require('../models/developers.models');
const httpsStatus = require('http-status-codes');

const addNewDeveloper = async (req, res) => {
    try {
        const name = req.body.name;
        const prepObj = {
            _id: mongoose.Types.ObjectId(),
            name
        }
        await DeveloperModel.addNewDeveloper(prepObj);

        res.status(httpsStatus.CREATED).send({
            message: 'Content created'
        })

    } catch (error) {
        console.log('error in add new developer ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const updateDeveloper = async (req, res) => {
    try {
        const id = req.params.developerId
        const name = req.body.name;

        const developer = await DeveloperModel.updateDeveloper(id, name);

        if (!developer) {
            console.log('developer not found');
            return res.status(httpsStatus.NOT_FOUND)
        }

        res.status(httpsStatus.CREATED).send({
            message: 'Content created',
            developer
        })

    } catch (error) {
        console.log('error in add new developer ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const deleteDeveloper = async (req, res) => {
    try {
        const id = req.params.developerId;
        await DeveloperModel.deleteDeveloper(id);
        res.status(httpsStatus.OK).send({
            message: 'content is deleted'
        })

    } catch (error) {
        console.log('error in add new developer ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const getAllDeveloper = async (req, res) => {
    try {
        const developers = await DeveloperModel.getAllDevelopers();
        if (developer.length === 0) {
            return res.status(httpsStatus.NO_CONTENT).send({
                message: 'there is no content'
            })
        }
        res.status(httpsStatus.OK).send({
            developers
        })
    } catch (error) {
        console.log('error in add new developer ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const getDeveloperById = async (req, res) => {
    try {
        const id = req.params.developerId;
        const developer = await DeveloperModel.getDeveloperById(id);
        if (!developer) {
            return res.status(httpsStatus.NO_CONTENT).send({
                message: 'there is no content'
            })
        }
        res.status(httpsStatus.OK).send({
            developer
        })
    } catch (error) {
        console.log('error in add new developer ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

module.exports = {
    addNewDeveloper,
    updateDeveloper,
    deleteDeveloper,
    getAllDeveloper,
    getDeveloperById
}