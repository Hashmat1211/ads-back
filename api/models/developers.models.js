const mongoose = require("mongoose");
const Developer = require('../schemas/developer');
const httpsStatus = require('http-status-codes')

const addNewDeveloper = async (developerObj) => {
    try {
        const developer = new Developer(developerObj);
        return await developer.save();
    } catch (error) {
        console.log('error in add new developer ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const updateDeveloper = async (id, name) => {
    try {
        return await Developer.updateOne({ _id: id }, { name });
    } catch (error) {
        console.log('error in updating name developer ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const deleteDeveloper = async (id) => {
    try {
        return await Developer.deleteOne({ _id: id });
    } catch (error) {
        console.log('error in deleting name developer ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getAllDevelopers = async () => {
    try {
        return await Developer.find({}).lean().select(`_id name`);
    } catch (error) {
        console.log('error in getting all developers ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getDeveloperById = async (id) => {
    try {
        return await Developer.findOne({ _id: id }).lean().select(`_id name`);
    } catch (error) {
        console.log('error in getting developer by id ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getDeveloperByName = async (name) => {
    try {
        return await Developer.findOne({ name }).lean().select(`_id name`);
    } catch (error) {
        console.log('error in getting developer by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}


module.exports = {
    addNewDeveloper,
    updateDeveloper,
    deleteDeveloper,
    getAllDevelopers,
    getDeveloperById,
    getDeveloperByName
}