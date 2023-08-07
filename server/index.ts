import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


import projectRoutes from './routes/projectRoutes';
import { errorHandler } from './middlewares/errorHandler';



app.use(cors({credentials:true,origin:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api",projectRoutes)
app.use(errorHandler);

app.get('/',(req : Request,res : Response)=>{
  res.send('hello world')
})


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log(`listening to port ${PORT}`);
})

