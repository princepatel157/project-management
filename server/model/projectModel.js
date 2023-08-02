const { NOT_FOUND } = require("../constants/errorCodes");
const AppError = require("../utils/AppError");

let projectsData = [
  
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

exports.createTask = ({project_id,task_name,status}) =>{
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

exports.updateTask = ({project_id,task_id,task_name,status}) => {
  for(let i=0;i<projectsData.length;i++){
    if(projectsData[i].project_id === project_id){
      for(let j=0;j<projectsData[i].tasks.length;j++){
        if(projectsData[i].tasks[j].task_id === task_id){
          projectsData[i].tasks[j].task_name = task_name;
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