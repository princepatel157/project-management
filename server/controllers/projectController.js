const apiReferenceModule = "project_controller";

const { catchAsyncErrors } = require("../utils/catchAsyncErrors");
const AppError = require('../utils/AppError');
const projectModel = require("../model/projectModel");
const logging = require('../logging/logging');
const { SERVER_ERR0R } = require("../constants/errorCodes");


// create new project
exports.createProject = catchAsyncErrors( async(req,res)=>{
  const apiReference = {
    module: apiReferenceModule,
    api: "createProject"
  }
  logging.log(apiReference,{EVENT : "REQUEST RECEIVED", REQUEST_BODY: req.body});

  let { project_name } = req.body;

  let createRes = projectModel.createNewProject(project_name);
  if(createRes){
    return res.status(200).json({message:"success",projects:createRes})
  }
  else{
    throw new AppError('Something Went Wrong',SERVER_ERR0R);
  }
})


// delete project
exports.deleteProject = catchAsyncErrors(async(req,res)=>{
  const apiReference = {
    module: apiReferenceModule,
    api: "deleteTask"
  }
  logging.log(apiReference,{EVENT : "REQUEST RECEIVED", REQUEST_BODY: req.query});

  
  let project_id = parseInt(req.query.project_id);
  let deleteRes = projectModel.deleteProject({project_id})
  if(deleteRes){
    return res.status(200).json({message:"success",projects:deleteRes})
  }
  else{
    throw new AppError('Something Went Wrong',SERVER_ERR0R);
  }
})


// get project
exports.getProjects = catchAsyncErrors( async(req,res)=>{
  let data = await projectModel.getProjects();
  return res.status(200).json({message:"success",projects:data})
})


// create new task
exports.createTask = catchAsyncErrors(async(req,res)=>{
  const apiReference = {
    module: apiReferenceModule,
    api: "createTask"
  }
  logging.log(apiReference,{EVENT : "REQUEST RECEIVED", REQUEST_BODY: req.body});


  let { project_id, task_name, status } = req.body;
  let createRes = projectModel.createTask({project_id,task_name,status});
  if(createRes){
    return res.status(200).json({message:"success",projects:createRes})
  }
  else{
    throw new AppError('Something Went Wrong',SERVER_ERR0R);
  }
})

// update status
exports.updateTask = catchAsyncErrors(async(req,res)=>{
  const apiReference = {
    module: apiReferenceModule,
    api: "updateTask"
  }
  logging.log(apiReference,{EVENT : "REQUEST RECEIVED", REQUEST_BODY: req.body});

  let {project_id,task_id,task_name,status} = req.body;
  let updateRes = projectModel.updateTask({project_id,task_id,task_name,status})
  if(updateRes){
    return res.status(200).json({message:"success",projects:updateRes})
  }
  else{
    throw new AppError('Something Went Wrong',SERVER_ERR0R);
  }
})


// delete status
exports.deleteTask = catchAsyncErrors(async(req,res)=>{
  const apiReference = {
    module: apiReferenceModule,
    api: "deleteTask"
  }
  logging.log(apiReference,{EVENT : "REQUEST RECEIVED", REQUEST_BODY: req.query});

  
  let project_id = parseInt(req.query.project_id);
  let task_id = parseInt(req.query.task_id);
  console.log('body----',project_id)
  let deleteRes = projectModel.deleteTask({project_id,task_id})
  if(deleteRes){
    return res.status(200).json({message:"success",projects:deleteRes})
  }
  else{
    throw new AppError('Something Went Wrong',SERVER_ERR0R);
  }
})
