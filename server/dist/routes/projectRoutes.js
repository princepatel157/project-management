"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const projectController_1 = __importDefault(require("../controllers/projectController"));
const projectValidator_1 = require("./projectValidator");
// project routes
router.get('/getProjects', projectController_1.default.getProjects);
router.post('/createProject', projectValidator_1.createProjectValidator, projectController_1.default.createProject);
router.put('/updateProject', projectValidator_1.updateProjectValidator, projectController_1.default.updateProject);
router.delete('/deleteProject', projectValidator_1.deleteProjectValidator, projectController_1.default.deleteProject);
// task routes
router.post('/createTask', projectValidator_1.createTaskValidator, projectController_1.default.createTask);
router.put('/updateTask', projectValidator_1.updateTaskValidator, projectController_1.default.updateTask);
router.delete('/deleteTask', projectValidator_1.deleteTaskValidator, projectController_1.default.deleteTask);
exports.default = router;
