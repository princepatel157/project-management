"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/api", projectRoutes_1.default);
app.use(errorHandler_1.errorHandler);
app.get('/', (req, res) => {
    res.send('hello world');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
