"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiReferenceModule = "project_controller";
const catchAsyncErrors_1 = __importDefault(require("../utils/catchAsyncErrors"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const projectModel_1 = require("../model/projectModel");
const logging_1 = __importDefault(require("../logging/logging"));
// import SERVER_ERR0R from "../constants/errorCodes";
const errorCodes_1 = require("../constants/errorCodes");
class ProjectAllRoutes {
    constructor() {
        // create new project
        this.createProject = (0, catchAsyncErrors_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const apiReference = {
                module: apiReferenceModule,
                api: "createProject"
            };
            (0, logging_1.default)(apiReference, { EVENT: "REQUEST RECEIVED", REQUEST_BODY: req.body });
            let project_name = req.body.project_name;
            let createRes = (0, projectModel_1.createNewProject)(project_name);
            if (createRes) {
                return res.status(200).json({ message: "success", projects: createRes });
            }
            else {
                throw new AppError_1.default('Something Went Wrong', errorCodes_1.Errors.SERVER_ERR0R);
            }
        }));
        //  update project
        this.updateProject = (0, catchAsyncErrors_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const apiReference = {
                module: apiReferenceModule,
                api: "updateProject"
            };
            (0, logging_1.default)(apiReference, { EVENT: "REQUEST RECEIVED", REQUEST_BODY: req.body });
            let { project_id, project_name } = req.body;
            let createRes = (0, projectModel_1.updateProject)(parseInt(project_id), project_name);
            if (createRes) {
                return res.status(200).json({ message: "success", projects: createRes });
            }
            else {
                throw new AppError_1.default('Something Went Wrong', errorCodes_1.Errors.SERVER_ERR0R);
            }
        }));
        // delete project
        this.deleteProject = (0, catchAsyncErrors_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const apiReference = {
                module: apiReferenceModule,
                api: "deleteTask"
            };
            (0, logging_1.default)(apiReference, { EVENT: "REQUEST RECEIVED", REQUEST_BODY: req.query });
            let project_id = parseInt(req.query.project_id);
            let deleteRes = (0, projectModel_1.deleteProject)(project_id);
            if (deleteRes) {
                return res.status(200).json({ message: "success", projects: deleteRes });
            }
            else {
                throw new AppError_1.default('Something Went Wrong', errorCodes_1.Errors.SERVER_ERR0R);
            }
        }));
        // get project
        this.getProjects = (0, catchAsyncErrors_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            let data = yield (0, projectModel_1.getProjects)();
            return res.status(200).json({ message: "success", projects: data });
        }));
        // create new task
        this.createTask = (0, catchAsyncErrors_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const apiReference = {
                module: apiReferenceModule,
                api: "createTask"
            };
            (0, logging_1.default)(apiReference, { EVENT: "REQUEST RECEIVED", REQUEST_BODY: req.body });
            let { project_id, task_name, description, status } = req.body;
            let createRes = (0, projectModel_1.createTask)(project_id, task_name, description, status);
            if (createRes) {
                return res.status(200).json({ message: "success", projects: createRes });
            }
            else {
                throw new AppError_1.default('Something Went Wrong', errorCodes_1.Errors.SERVER_ERR0R);
            }
        }));
        // update status
        this.updateTask = (0, catchAsyncErrors_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const apiReference = {
                module: apiReferenceModule,
                api: "updateTask"
            };
            (0, logging_1.default)(apiReference, { EVENT: "REQUEST RECEIVED", REQUEST_BODY: req.body });
            let { project_id, task_id, task_name, description, status } = req.body;
            let updateRes = (0, projectModel_1.updateTask)(project_id, task_id, task_name, description, status);
            if (updateRes) {
                return res.status(200).json({ message: "success", projects: updateRes });
            }
            else {
                throw new AppError_1.default('Something Went Wrong', errorCodes_1.Errors.SERVER_ERR0R);
            }
        }));
        // delete status
        this.deleteTask = (0, catchAsyncErrors_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const apiReference = {
                module: apiReferenceModule,
                api: "deleteTask"
            };
            (0, logging_1.default)(apiReference, { EVENT: "REQUEST RECEIVED", REQUEST_BODY: req.query });
            let project_id = parseInt(req.query.project_id);
            let task_id = parseInt(req.query.task_id);
            let deleteRes = (0, projectModel_1.deleteTask)(project_id, task_id);
            if (deleteRes) {
                return res.status(200).json({ message: "success", projects: deleteRes });
            }
            else {
                throw new AppError_1.default('Something Went Wrong', errorCodes_1.Errors.SERVER_ERR0R);
            }
        }));
    }
}
exports.default = new ProjectAllRoutes();
