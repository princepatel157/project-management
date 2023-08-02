const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')


const projectRoutes = require("./routes/projectRoutes.js")
const errorHandler = require('./middlewares/errorHandler.js');



app.use(cors({credentials:true,origin:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api",projectRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log(`listening to port ${PORT}`);
})

