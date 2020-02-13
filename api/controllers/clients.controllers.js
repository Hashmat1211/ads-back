const mongoose = require('mongoose');
const ClientModel = require('../models/clients.models');
const httpsStatus = require('http-status-codes');

const addNewClient = async (req, res) => {
    try {
        const name = req.body.name;
        const contact = req.body.contact;
        const prepObj = {
            _id: mongoose.Types.ObjectId(),
            name,
            contact
        }
        await ClientModel.addNewClient(prepObj);

        res.status(httpsStatus.CREATED).send({
            message: 'Content created'
        })

    } catch (error) {
        console.log('error in add new client ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const updateClient = async (req, res) => {
    try {
        const id = req.params.clientId
        const prepObj = { ...req.body };
        const client = await ClientModel.updateClient(id, prepObj);

        if (!client) {
            console.log('client not found');
            return res.status(httpsStatus.NOT_FOUND)
        }

        res.status(httpsStatus.OK).send({
            message: 'Content updated'
        })
    } catch (error) {
        console.log('error in add new client ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const deleteClient = async (req, res) => {
    try {
        const id = req.params.clientId;
        await ClientModel.deleteClient(id);
        res.status(httpsStatus.OK).send({
            message: 'content is deleted'
        })

    } catch (error) {
        console.log('error in add new client ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const getAllClients = async (req, res) => {
    try {
        const clients = await ClientModel.getAllClients();
        if (clients.length === 0) {
            return res.status(httpsStatus.NO_CONTENT).send({
                message: 'there is no content'
            })
        }
        res.status(httpsStatus.OK).send({
            clients
        })
    } catch (error) {
        console.log('error in add new client ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const getClientById = async (req, res) => {
    try {
        const id = req.params.clientId;
        const client = await ClientModel.getClientById(id);
        if (!client) {
            return res.status(httpsStatus.NO_CONTENT).send({
                message: 'there is no content'
            })
        }
        res.status(httpsStatus.OK).send({
            client
        })
    } catch (error) {
        console.log('error in add new client ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

module.exports = {
    addNewClient,
    updateClient,
    deleteClient,
    getAllClients,
    getClientById
}