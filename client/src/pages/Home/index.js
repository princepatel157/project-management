import React, { useEffect, useState } from 'react';

import './index.css'
import BasicCard from '../../components/Card';
import { addNewProjectService, updateProjectService, addNewTaskService, deleteProjectService, getProjectService, updateTaskService, deleteTaskService } from '../../services/projectService';
import Button from '@mui/material/Button';
import { MdAddBox } from "react-icons/md";
import { taskStatus } from '../../constants/taskStatus';
import { MdDelete, MdMode, MdClose } from "react-icons/md";



// change status according to trigger
const changeStatus=(trigger,preStatus)=>{
  if(trigger==="next"){
    if(preStatus === taskStatus.NEW){
      return taskStatus.ASSIGNED;
    }
    else if(preStatus === taskStatus.ASSIGNED){
      return taskStatus.IN_PROGRESS;
    }
    else if(preStatus === taskStatus.IN_PROGRESS){
      return taskStatus.COMPLETED;
    }
  }
  else{
    if(preStatus === taskStatus.ASSIGNED){
      return taskStatus.NEW;
    }
    else if(preStatus === taskStatus.IN_PROGRESS){
      return taskStatus.ASSIGNED;
    }
    else if(preStatus === taskStatus.COMPLETED){
      return taskStatus.IN_PROGRESS;
    }
  }
}



const Home = () => {
  // new project state
  const [newProjectName,setNewProjectName] = useState("");
  const [addNewProject,setAddNewProject] = useState(0);

  const [editProject,setEditProject] = useState(0);

  const [allProjects, setAllProjects] = useState([]);

  // active state
  const [activeProject,setActiveProject] = useState(1);
  const [activeTasks,setActiveTasks] = useState(allProjects.length && (allProjects[0].tasks || []));

  // add new task
  const [addNewTask,setAddNewTask] = useState(0);
  const [newTaskName,setNewTaskName] = useState("")
  const [newTaskDesctiption,setNewTaskDescription] = useState("");
  const [editTask,setEditTask] = useState(0);

  const [reload, setReload] = useState(false);
  const reloadEffect = () => {
    setReload(!reload);
  };

  console.log('edit task---',allProjects);


  // get all project api call
  const fetchProjects= async() =>{
    try{
      const res = await getProjectService();
      setAllProjects(res.data.projects);
    }catch(err){
      console.log('fetchProjects err---',err);
    }
  }

  // add new project api call
  const addProject= async() =>{
    try{
      let res;
      if(editProject){
        res = await updateProjectService({"project_id":activeProject,"project_name": newProjectName});
        setEditProject(0)
      }
      else{
        res = await addNewProjectService({"project_name": newProjectName});
        setAddNewProject(0)
      }
      setAllProjects(res.data.projects);
      setActiveProject(res.data.projects[res.data.projects.length-1].project_id)
    }catch(err){
      console.log('addProject err---',err);
      if(err.response.data){
        window.alert(err.response.data.message)
      }
    }
  }

  // add new task api call
  const addTask= async() =>{
    try{
      let res;
      if(editTask){
        res = await updateTaskService({"project_id": parseInt(activeProject), "task_id":editTask.task_id, "task_name": newTaskName, "description": newTaskDesctiption, status: editTask.status});
        setEditTask(0);
      }
      else{
        res = await addNewTaskService({"project_id": parseInt(activeProject),"task_name": newTaskName, "description": newTaskDesctiption, status: "new"});
      }
      setNewTaskDescription("")
      setNewTaskName("")
      setAllProjects(res.data.projects);
      setActiveProject(activeProject)
    }catch(err){
      console.log('addTask err---',err);
      if(err.response.data){
        window.alert(err.response.data.message)
      }
    }
  }

  // update task status api call
  const updateTask= async(trigger,task_id) =>{
    let newTaskName;
    let newStatus;
    let newDescription;
    for(let i=0;i<activeTasks.length;i++){
      if(activeTasks[i].task_id == task_id){
        newTaskName = activeTasks[i].task_name;
        newDescription = activeTasks[i].description;
        newStatus= changeStatus(trigger,activeTasks[i].status)
      }
    }
    try{
      const res = await updateTaskService({project_id: parseInt(activeProject), task_id: task_id, task_name: newTaskName, description: newDescription, status: newStatus});
      setAllProjects(res.data.projects);
    }catch(err){
      console.log('updateTask err---',err);
      if(err.response.data){
        window.alert(err.response.data.message)
      }
    }
  }

  // delete task api call
  const deleteTask= async(task_id) =>{
    if(window.confirm(`Confirm to Delete Task`)){
      try{
        const res = await deleteTaskService({project_id: parseInt(activeProject), task_id: task_id});
        setAllProjects(res.data.projects);
      }catch(err){
        console.log('deleteTask err---',err);
        if(err.response.data){
          window.alert(err.response.data.message)
        }
      }
    }
  }

  // edit task
  const editUpdateTask=async(task)=>{
    setEditTask(task);
    setNewTaskName(task.task_name);
    setNewTaskDescription(task.description)
  }

  // delete project api call
  const deleteProject= async(project_id) =>{
    if(window.confirm(`Confirm to Delete Project`)){
      try{
        const res = await deleteProjectService({project_id: parseInt(project_id)});
        setAllProjects(res.data.projects);
        if(res.data.projects.length>0){
          setActiveProject(allProjects[allProjects.length-1].project_id)
        }
        else{
          setActiveProject(1);
          setActiveTasks([])
        }
      }catch(err){
        console.log('deleteProject err---',err);
        if(err.response.data){
          window.alert(err.response.data.message)
        }
      }
    }
  }

  const handleEditProject=(e)=>{
    e.preventDefault();
    setEditProject(1)
    for(let i=0;i<allProjects.length;i++){
      if(allProjects[i].project_id === activeProject){
        setNewProjectName(allProjects[i].project_name)
      }
    }

  }
  
  // change active project effect
  useEffect(()=>{
    const changeActiveTasks=()=>{
      setAddNewTask(0)
      for(let i=0;i<allProjects.length;i++){
        if(allProjects[i].project_id == activeProject){
          setActiveTasks(allProjects[i].tasks)
        }
      }
    }
  
    changeActiveTasks();
  },[allProjects,activeProject, reload,editTask]);
  
  // fetch all project effect
  useEffect(()=>{
    fetchProjects();
  },[]);





  return (
    <>
      <div className='home-page'>
        <div className='home-head'>
          <h1>Project Management</h1>
        </div>

        {/* project selection */}
        <div className='project-sec'>
          <div className='project-selection'>
            <select value={activeProject} name='active_project' onChange={(e)=>setActiveProject(e.target.value)}>
            {
              allProjects.map((data,index)=>{
                return <option value={data.project_id}>{data.project_name}</option>
              })
            }
            </select>

            <button onClick={(e)=>setAddNewProject(1)}>Add New</button>
            <span className='delete-project-btn'><MdDelete className='delete-icon' onClick={()=>deleteProject(activeProject)}/></span>
            <span className='delete-project-btn'><MdMode className='delete-icon' onClick={handleEditProject}/></span>
          </div>
          {
            addNewProject?
            <div className='add-project'>
              <input value={newProjectName} onChange={(e)=>setNewProjectName(e.target.value)} type='text' placeholder='Enter Project Name'/>
              <button onClick={addProject}>Add</button>
            </div>
            : 
            ""
          }
          {
            editProject?
            <div className='add-project'>
              <input value={newProjectName} onChange={(e)=>setNewProjectName(e.target.value)} type='text' placeholder='Enter Project Name'/>
              <button onClick={addProject}>Update</button>
            </div>
            : 
            ""
          }
        </div>


        {/* all tasks */}
        <div className='task-sec'>
          <div className='task-data'>
            {/* new task */}
            <div className='cards-col'>
              <div className='col-head'>
                <h2>New Tasks</h2>
              </div>
              <div className='all-cards'>
                { activeTasks &&
                  activeTasks.map((data,index)=>{
                    if(data.status === taskStatus.NEW){
                      return (

                        <div key={index}>
                          <BasicCard tasks={data} trigger={updateTask} deleteTrigger={deleteTask} editTrigger={editUpdateTask}/>
                        </div>
                      )
                    }
                    else{
                      return
                    }
                  })
                }
                
                {/* new add task */}
                { addNewTask ?
                <div className='new-task'>
                  <input type='text' value={newTaskName} onChange={(e)=>setNewTaskName(e.target.value)} placeholder='enter task name'/>
                  <input type='text' value={newTaskDesctiption} onChange={(e)=>setNewTaskDescription(e.target.value)} placeholder='enter task description'/>
                  <Button onClick={addTask} variant="contained">Save Task</Button>
                </div>
                : ""
                }
                {/* edit task */}
                <div className='add-task-btn'>
                  <MdAddBox className={'add-task-icon'} onClick={(e)=>setAddNewTask(1)}/>
                </div>
              </div>
            </div>

            {/* assigned task */}
            <div className='cards-col'>
              <div className='col-head'>
                <h2>Assigned Tasks</h2>
              </div>
              <div className='all-cards'>
                { activeTasks &&
                  activeTasks.map((data,index)=>{
                    if(data.status === taskStatus.ASSIGNED){
                      return (
                        <div key={index}>
                          <BasicCard tasks={data} trigger={updateTask} deleteTrigger={deleteTask} editTrigger={editUpdateTask}/>
                        </div>
                      )
                    }
                    else{
                      return 
                    }
                  })
                }
              </div>
            </div>

            {/* inprogress task */}
            <div className='cards-col'>
              <div className='col-head'>
                <h2>In Progress Tasks</h2>
              </div>
              <div className='all-cards'>
                { activeTasks &&
                  activeTasks.map((data,index)=>{
                    if(data.status === taskStatus.IN_PROGRESS){
                      return (
                        <div key={index}>
                          <BasicCard tasks={data} trigger={updateTask} deleteTrigger={deleteTask} editTrigger={editUpdateTask}/>
                        </div>
                      )
                    }
                    else{
                      return 
                    }
                  })
                }
              </div>
            </div>

            {/* completed */}
            <div className='cards-col'>
              <div className='col-head'>
                <h2>Completed Tasks</h2>
              </div>
              <div className='all-cards'>
                { activeTasks &&
                  activeTasks.map((data,index)=>{
                    if(data.status === taskStatus.COMPLETED){
                      return (
                        <div key={index}>
                          <BasicCard tasks={data} trigger={updateTask} deleteTrigger={deleteTask} editTrigger={editUpdateTask}/>
                        </div>
                      )
                    }
                    else{
                      return 
                    }
                  })
                }
              </div>
            </div>
            {/* update popup */}
            {
              editTask ?
            <div className='update-task-sec'>
              <div className='update-fields'>
                <input type='text' value={newTaskName} onChange={(e)=>setNewTaskName(e.target.value)} placeholder='enter task name'/>
                <input type='text' value={newTaskDesctiption} onChange={(e)=>setNewTaskDescription(e.target.value)} placeholder='enter task description'/>
                <Button onClick={addTask} variant="contained">Update Task</Button>
              </div>
              <div className='close-btn-sec'><MdClose onClick={()=>setEditTask(0)} className='close-icon'/></div>
            </div> : ""
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home