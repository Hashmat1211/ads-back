const Client = require('../schemas/client');
const httpsStatus = require('http-status-codes')

const addNewClient = async (clientObj) => {
    try {
        const client = new Client(clientObj);
        return await client.save();
    } catch (error) {
        console.log('error in add new client ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const updateClient = async (id, updateObj) => {
    try {
        return await Client.findByIdAndUpdate({ _id: id }, { updateObj }, { upsert: true, new: true });
    } catch (error) {
        console.log('error in updating name client ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const deleteClient = async (id) => {
    try {
        return await Client.delete({ _id: id });
    } catch (error) {
        console.log('error in deleting client ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getAllClients = async () => {
    try {
        return await Client.find({}).lean().select(`_id name contact`);
    } catch (error) {
        console.log('error in getting all clients ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getClientById = async (id) => {
    try {
        return await Client.findOne({ _id: id }).lean().select(`_id name contact`);
    } catch (error) {
        console.log('error in getting client by id ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getClientByName = async (name) => {
    try {
        return await Client.findOne({ name }).lean().select(`_id name contact`);
    } catch (error) {
        console.log('error in getting client by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}
const getClientByContact = async (contact) => {
    try {
        return await Client.findOne({ contact }).lean().select(`_id name contact`);
    } catch (error) {
        console.log('error in getting client by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}


module.exports = {
    addNewClient,
    updateClient,
    deleteClient,
    getAllClients,
    getClientById,
    getClientByName,
    getClientByContact
}