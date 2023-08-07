"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const errorHandler = (error, req, res, next) => {
    if (error instanceof AppError_1.default) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }
    console.log('server-error---', error);
    res.status(500).json({ message: "Server Error" });
};
exports.errorHandler = errorHandler;
