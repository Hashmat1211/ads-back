const mongoose = require("mongoose");
const Project = require('../schemas/project');
const httpsStatus = require('http-status-codes')

const addNewProject = async (projectObj) => {
    try {
        const project = new Project(projectObj);
        return await project.save();

    } catch (error) {
        console.log('error in add new project ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const updateProject = async (id, name) => {
    try {
        return await Project.updateOne({ _id: id }, { name });
    } catch (error) {
        console.log('error in updating name project ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const deleteProject = async (id) => {
    try {
        return await Project.deleteOne({ _id: id });
    } catch (error) {
        console.log('error in deleting name project ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getAllProjects = async () => {
    try {
        return await Project.find({}).lean().select(`_id name`);
    } catch (error) {
        console.log('error in getting all projects ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getProjectById = async (id) => {
    try {
        return await Project.findOne({ _id: id }).lean().select(`_id name`);
    } catch (error) {
        console.log('error in getting project by id ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}

const getProjectByName = async (name) => {
    try {
        return await Project.findOne({ name }).lean().select(`_id name`);
    } catch (error) {
        console.log('error in getting project by name ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send('error')
    }
}


module.exports = {
    addNewProject,
    updateProject,
    deleteProject,
    getAllProjects,
    getProjectById,
    getProjectByName
}