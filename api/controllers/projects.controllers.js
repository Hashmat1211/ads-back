const mongoose = require('mongoose');
const ProjectModel = require('../models/projects.models');
const httpsStatus = require('http-status-codes');

const addNewProject = async (req, res) => {
    try {
        const name = req.body.name;
        const prepObj = {
            _id: mongoose.Types.ObjectId(),
            name
        }
        await ProjectModel.addNewProject(prepObj);

        res.status(httpsStatus.CREATED).send({
            message: 'Content created'
        })

    } catch (error) {
        console.log('error in add new project ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const updateProject = async (req, res) => {
    try {
        const id = req.params.projectId
        const name = req.body.name;

        const project = await ProjectModel.updateProject(id, name);

        if (!project) {
            console.log('project not found');
            return res.status(httpsStatus.NOT_FOUND)
        }

        res.status(httpsStatus.OK).send({
            message: 'Content updated'
        })

    } catch (error) {
        console.log('error in add new project ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const deleteProject = async (req, res) => {
    try {
        const id = req.params.projectId;
        await ProjectModel.deleteProject(id);
        res.status(httpsStatus.OK).send({
            message: 'content is deleted'
        })

    } catch (error) {
        console.log('error in add new project ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.getAllProjects();
        if (projects.length === 0) {
            return res.status(httpsStatus.NO_CONTENT).send({
                message: 'there is no content'
            })
        }
        res.status(httpsStatus.OK).send({
            projects, totalProjects: projects.length
        })
    } catch (error) {
        console.log('error in add new project ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const getProjectById = async (req, res) => {
    try {
        const id = req.params.projectId;
        const project = await ProjectModel.getProjectById(id);
        if (!project) {
            return res.status(httpsStatus.NO_CONTENT).send({
                message: 'there is no content'
            })
        }
        res.status(httpsStatus.OK).send({
            project
        })
    } catch (error) {
        console.log('error in getting  project by id ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

const getProjectIdByProjectName = async (req, res) => {
    try {
        const name = req.body.name;
        const project = await ProjectModel.getProjectByName(name);
        if (!project) {
            return res.status(httpsStatus.NO_CONTENT).send({
                message: 'there is no content'
            })
        }
        res.status(httpsStatus.OK).send({
            project
        })
    } catch (error) {
        console.log('error in getting project name ', error)
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
            message: 'error'
        })
    }
}

module.exports = {
    addNewProject,
    updateProject,
    deleteProject,
    getAllProjects,
    getProjectById,
    getProjectIdByProjectName
}