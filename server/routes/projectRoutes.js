const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const projectValidator = require("./projectValidator")

// project routes
router.get('/getProjects', projectController.getProjects)
router.post('/createProject', projectValidator.createProjectValidator, projectController.createProject)
router.put('/updateProject', projectValidator.updateProjectValidator, projectController.updateProject)
router.delete('/deleteProject', projectValidator.deleteProjectValidator, projectController.deleteProject)


// task routes
router.post('/createTask', projectValidator.createTaskValidator, projectController.createTask)
router.put('/updateTask', projectValidator.updateTaskValidator, projectController.updateTask)
router.delete('/deleteTask', projectValidator.deleteTaskValidator, projectController.deleteTask)


module.exports = router;