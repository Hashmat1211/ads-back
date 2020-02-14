/* IMPORTING MODULES */
const express = require("express");
const projectsController = require("../controllers/projects.controllers");
/* Validations */
const projectsValidator = require('../validators/projects.validators');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post("/add", projectsValidator.addProjectValidator, projectsController.addNewProject);
router.patch("/update/:projectId", projectsValidator.updateProjectValidator, projectsController.updateProject);
router.delete("/delete/:projectId", projectsValidator.deleteProjectValidator, projectsController.deleteProject);
router.get("/getAllProjects", projectsController.getAllProject);
router.get("/getSingleProject/:projectId", projectsValidator.getProjectByIdValidator, projectsController.getProjectById);

module.exports = router;