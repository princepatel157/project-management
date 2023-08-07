"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskValidator = exports.updateTaskValidator = exports.createTaskValidator = exports.deleteProjectValidator = exports.updateProjectValidator = exports.createProjectValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const createProjectValidator = (req, res, next) => {
    const schema = joi_1.default.object({
        project_name: joi_1.default.string().required().messages({
            'string.empty': 'Project Name Required'
        }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(422).send({ message: error.details[0].message });
    }
    else {
        next();
    }
};
exports.createProjectValidator = createProjectValidator;
const updateProjectValidator = (req, res, next) => {
    const schema = joi_1.default.object({
        project_id: joi_1.default.required(),
        project_name: joi_1.default.string().required().messages({
            'string.empty': 'Project Name Required'
        }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(422).send({ message: error.details[0].message });
    }
    else {
        next();
    }
};
exports.updateProjectValidator = updateProjectValidator;
const deleteProjectValidator = (req, res, next) => {
    const schema = joi_1.default.object({
        project_id: joi_1.default.string().required()
    });
    const { error } = schema.validate(req.query);
    if (error) {
        res.status(422).send({ message: error.details[0].message });
    }
    else {
        next();
    }
};
exports.deleteProjectValidator = deleteProjectValidator;
const createTaskValidator = (req, res, next) => {
    const schema = joi_1.default.object({
        project_id: joi_1.default.required(),
        task_name: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        status: joi_1.default.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(422).send({ message: error.details[0].message });
    }
    else {
        next();
    }
};
exports.createTaskValidator = createTaskValidator;
const updateTaskValidator = (req, res, next) => {
    const schema = joi_1.default.object({
        project_id: joi_1.default.required(),
        task_id: joi_1.default.required(),
        task_name: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        status: joi_1.default.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(422).send({ message: error.details[0].message });
    }
    else {
        next();
    }
};
exports.updateTaskValidator = updateTaskValidator;
const deleteTaskValidator = (req, res, next) => {
    const schema = joi_1.default.object({
        project_id: joi_1.default.required(),
        task_id: joi_1.default.required()
    });
    const { error } = schema.validate(req.query);
    if (error) {
        res.status(422).send({ message: error.details[0].message });
    }
    else {
        next();
    }
};
exports.deleteTaskValidator = deleteTaskValidator;
