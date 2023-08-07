import { Router } from "express";

const router = Router();

import projectController from '../controllers/projectController';
import {createProjectValidator,updateProjectValidator,deleteProjectValidator,createTaskValidator,updateTaskValidator,deleteTaskValidator} from "./projectValidator";

// project routes
router.get('/getProjects', projectController.getProjects)
router.post('/createProject', createProjectValidator, projectController.createProject)
router.put('/updateProject', updateProjectValidator, projectController.updateProject)
router.delete('/deleteProject', deleteProjectValidator, projectController.deleteProject)


// task routes
router.post('/createTask', createTaskValidator, projectController.createTask)
router.put('/updateTask', updateTaskValidator, projectController.updateTask)
router.delete('/deleteTask', deleteTaskValidator, projectController.deleteTask)


export default router;