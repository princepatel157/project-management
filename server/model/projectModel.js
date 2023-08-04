const { NOT_FOUND } = require("../constants/errorCodes");
const AppError = require("../utils/AppError");

let projectsData = [
  {
    "project_id": 1,
    "project_name": "Test Project 1",
    "tasks": [
      {
        task_id : 1,
        task_name: 'task 1',
        description: "this is desc 1",
        status:'new'
      },
      {
        task_id : 2,
        task_name: 'task 2',
        description: "this is des 2 for task 1",
        status:'assigned'
      }
    ]
  },
]




exports.createNewProject = (project_name)=>{
    let newId = 1;
    if(!projectsData){
      throw new Error(
      )
    }
    if(projectsData.length){
      newId = projectsData[projectsData.length -1].project_id + 1;
    }
    
    let newProject = {
      project_id:newId,
      project_name:project_name,
      tasks : []
    }
    projectsData.push(newProject);
    return projectsData;
}

// update project
exports.updateProject = (project_id, project_name)=>{
    let newId = 1;
    if(!projectsData){
      throw new Error(
      )
    }
    
    for(let i=0;i<projectsData.length;i++){
      if(projectsData[i].project_id === project_id){
        projectsData[i].project_name = project_name;
      }
    }

    return projectsData;
}

// delete project
exports.deleteProject = ({project_id})=>{
  for(let i=0;i<projectsData.length;i++){
    if(projectsData[i].project_id === project_id){
      projectsData = projectsData.filter((item => item.project_id !== project_id))
      return projectsData;
    }
    else{
      if(projectsData[i].project_id === projectsData[projectsData.length-1].project_id){
        throw new AppError('Project not found', NOT_FOUND)
      }
    }
  }
}



exports.getProjects = ()=>{
    if(projectsData){
      return projectsData;
    }
    else{
      return "No Projects Found";
    }
}

// exports.getProjectByName = ()=>{
//   if(projectsData.length){
//     for(let i=0;i<projectsData.length;i++){
//       if()
//     }
//   }
// }

exports.createTask = ({project_id,task_name,description,status}) =>{
  let taskId = 1;
  for(let i=0;i<projectsData.length;i++){
    if(projectsData[i].project_id === project_id){
      let tasks = projectsData[i].tasks;
      if(tasks.length){
        taskId = tasks[tasks.length -1].task_id + 1;
      }

      let newTask = {
        task_id:taskId,
        task_name:task_name,
        description: description,
        status: status
      }
      projectsData[i].tasks.push(newTask);
      return projectsData;
    }
    else{
      if(projectsData[i].project_id === projectsData[projectsData.length-1].project_id){
        throw new Error('project id not found')
      }
    }
  }
}

exports.updateTask = ({project_id,task_id,task_name,description,status}) => {
  for(let i=0;i<projectsData.length;i++){
    if(projectsData[i].project_id === project_id){
      for(let j=0;j<projectsData[i].tasks.length;j++){
        if(projectsData[i].tasks[j].task_id === task_id){
          projectsData[i].tasks[j].task_name = task_name;
          projectsData[i].tasks[j].description = description;
          projectsData[i].tasks[j].status = status;

          return projectsData;
        }
        else{
          if(projectsData[i].tasks[j].task_id === projectsData[i].tasks[projectsData[i].tasks.length-1].task_id){
            throw new AppError("Task not Found", NOT_FOUND)
          }
        }
      }
    }
    else{
      if(projectsData[i].project_id === projectsData[projectsData.length-1].project_id){
        throw new AppError('Project not found', NOT_FOUND)
      }
    }
  }
}

exports.deleteTask = ({project_id,task_id})=>{
  for(let i=0;i<projectsData.length;i++){
    if(projectsData[i].project_id === project_id){
      for(let j=0;j<projectsData[i].tasks.length;j++){
        if(projectsData[i].tasks[j].task_id === task_id){
          projectsData[i].tasks = projectsData[i].tasks.filter((item => item.task_id !== task_id))
          return projectsData;
        }
        else{
          if(projectsData[i].tasks[j].task_id === projectsData[i].tasks[projectsData[i].tasks.length-1].task_id){
            throw new AppError('Task not found', NOT_FOUND)
          }
        }
      }
    }
    else{
      if(projectsData[i].project_id === projectsData[projectsData.length-1].project_id){
        throw new AppError('Project not found', NOT_FOUND)
      }
    }
  }
}