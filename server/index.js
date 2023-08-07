"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// const projectRoutes = require("./routes/projectRoutes.js")
// const errorHandler = require('./middlewares/errorHandler.js');
// app.use(cors({credentials:true,origin:true}));
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
// app.use("/api",projectRoutes)
// app.use(errorHandler);
app.get('/', (req, res) => {
    res.send('hello world');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
