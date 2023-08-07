const apiReferenceModule = "project_controller";

import catchAsyncErrors from "../utils/catchAsyncErrors";
import AppError from '../utils/AppError';
import {createNewProject,updateProject,deleteProject,createTask,updateTask,getProjects,deleteTask} from "../model/projectModel";
import logging from '../logging/logging';
// import SERVER_ERR0R from "../constants/errorCodes";
import {Errors} from "../constants/errorCodes";


class ProjectAllRoutes{
  // create new project
  createProject = catchAsyncErrors( async(req: any,res: any)=>{
    const apiReference = {
    module: apiReferenceModule,
    api: "createProject"
  }
  logging(apiReference,{EVENT : "REQUEST RECEIVED", REQUEST_BODY: req.body});

  let project_name  = req.body.project_name;

  let createRes = createNewProject(project_name);
  if(createRes){
    return res.status(200).json({message:"success",projects:createRes})
  }
  else{
    throw new AppError('Something Went Wrong',Errors.SERVER_ERR0R);
  }
});

//  update project
updateProject = catchAsyncErrors( async(req: any, res: any)=>{
  const apiReference = {
    module: apiReferenceModule,
    api: "updateProject"
  }
  logging(apiReference,{EVENT : "REQUEST RECEIVED", REQUEST_BODY: req.body});
  
  let { project_id, project_name } = req.body;

  let createRes = updateProject(parseInt(project_id), project_name);
  if(createRes){
    return res.status(200).json({message:"success",projects:createRes})
  }
  else{
    throw new AppError('Something Went Wrong',Errors.SERVER_ERR0R);
  }
})


// delete project
deleteProject = catchAsyncErrors(async(req: any, res: any)=>{
  const apiReference = {
    module: apiReferenceModule,
    api: "deleteTask"
  }
  logging(apiReference,{EVENT : "REQUEST RECEIVED", REQUEST_BODY: req.query});
  
  
  let project_id = parseInt(req.query.project_id);
  let deleteRes = deleteProject(project_id)
  if(deleteRes){
    return res.status(200).json({message:"success",projects:deleteRes})
  }
  else{
    throw new AppError('Something Went Wrong',Errors.SERVER_ERR0R);
  }
})


// get project
getProjects = catchAsyncErrors( async(req: any, res: any)=>{
  let data = await getProjects();
  return res.status(200).json({message:"success",projects:data})
})


// create new task
createTask = catchAsyncErrors(async(req: any, res: any)=>{
  const apiReference = {
    module: apiReferenceModule,
    api: "createTask"
  }
  logging(apiReference,{EVENT : "REQUEST RECEIVED", REQUEST_BODY: req.body});
  
  
  let { project_id, task_name, description, status } = req.body;
  let createRes = createTask(project_id,task_name,description,status);
  if(createRes){
    return res.status(200).json({message:"success",projects:createRes})
  }
  else{
    throw new AppError('Something Went Wrong',Errors.SERVER_ERR0R);
  }
})

// update status
updateTask = catchAsyncErrors(async(req: any, res: any)=>{
  const apiReference = {
    module: apiReferenceModule,
    api: "updateTask"
  }
  logging(apiReference,{EVENT : "REQUEST RECEIVED", REQUEST_BODY: req.body});
  
  let {project_id,task_id,task_name,description,status} = req.body;
  let updateRes = updateTask(project_id,task_id,task_name,description,status)
  if(updateRes){
    return res.status(200).json({message:"success",projects:updateRes})
  }
  else{
    throw new AppError('Something Went Wrong',Errors.SERVER_ERR0R);
  }
})


// delete status
deleteTask = catchAsyncErrors(async(req: any, res: any)=>{
  const apiReference = {
    module: apiReferenceModule,
    api: "deleteTask"
  }
  logging(apiReference,{EVENT : "REQUEST RECEIVED", REQUEST_BODY: req.query});

  
  let project_id = parseInt(req.query.project_id);
  let task_id = parseInt(req.query.task_id);
  let deleteRes = deleteTask(project_id,task_id)
  if(deleteRes){
    return res.status(200).json({message:"success",projects:deleteRes})
  }
  else{
    throw new AppError('Something Went Wrong',Errors.SERVER_ERR0R);
  }
})

}

export default new ProjectAllRoutes();