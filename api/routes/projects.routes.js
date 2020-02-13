/* IMPORTING MODULES */
const express = require("express");
const projectsController = require("../controllers/projects.controllers");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post("/add", projectsController.addNewProject);
router.patch("/update/:projectId", projectsController.updateProject);
router.delete("/delete/:projectId", projectsController.deleteProject);
router.get("/getAllProjects", projectsController.getAllProject);
router.get("/getSingleProject/:projectId", projectsController.getProjectById);

module.exports = router;