import React, { useEffect, useState } from 'react';

import './index.css'
import BasicCard from '../../components/Card';
import { addNewProjectService, addNewTaskService, deleteProjectService, getProjectService, updateTaskService, deleteTaskService } from '../../services/projectService';
import Button from '@mui/material/Button';
import { MdAddBox } from "react-icons/md";
import { taskStatus } from '../../constants/taskStatus';
import { MdDelete } from "react-icons/md";



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
  const [allProjects, setAllProjects] = useState([]);

  // active state
  const [activeProject,setActiveProject] = useState(1);
  const [activeTasks,setActiveTasks] = useState(allProjects.length && (allProjects[0].tasks || []));

  // add new task
  const [addNewTask,setAddNewTask] = useState(0);
  const [newTaskName,setNewTaskName] = useState("")


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
      const res = await addNewProjectService({"project_name": newProjectName});
      setAllProjects(res.data.projects);
      setActiveProject(res.data.projects[res.data.projects.length-1].project_id)
      setAddNewProject(0)
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
      const res = await addNewTaskService({project_id: parseInt(activeProject),"task_name": newTaskName, status: "new"});
      setAllProjects(res.data.projects);
      setNewTaskName("")
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
    for(let i=0;i<activeTasks.length;i++){
      if(activeTasks[i].task_id == task_id){
        newTaskName = activeTasks[i].task_name;
        newStatus= changeStatus(trigger,activeTasks[i].status)
      }
    }
    try{
      const res = await updateTaskService({project_id: parseInt(activeProject), task_id: task_id, task_name: newTaskName, status: newStatus});
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

  // delete project api call
  const deleteProject= async(project_id) =>{
    if(window.confirm(`Confirm to Delete Project`)){
      try{
        const res = await deleteProjectService({project_id: parseInt(project_id)});
        setAllProjects(res.data.projects);
        setActiveProject(allProjects[allProjects.length-1].project_id)
      }catch(err){
        console.log('deleteProject err---',err);
        if(err.response.data){
          window.alert(err.response.data.message)
        }
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
  
    allProjects.length && changeActiveTasks();
  },[allProjects,activeProject]);
  
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

                        <button key={index}>
                          <BasicCard tasks={data} trigger={updateTask}/>
                        </button>
                      )
                    }
                    else{
                      return
                    }
                  })
                }
                
                {/* new edit task */}
                { addNewTask ?
                <div className='new-task'>
                  <input type='text' value={newTaskName} onChange={(e)=>setNewTaskName(e.target.value)} placeholder='enter task name'/>
                  <Button onClick={addTask} variant="contained">Save Task</Button>
                </div>
                : ""
                }
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
                        <button key={index}>
                          <BasicCard tasks={data} trigger={updateTask}/>
                        </button>
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
                        <button key={index}>
                          <BasicCard tasks={data} trigger={updateTask}/>
                        </button>
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
                        <button key={index}>
                          <BasicCard tasks={data} trigger={updateTask} deleteTrigger={deleteTask}/>
                        </button>
                      )
                    }
                    else{
                      return 
                    }
                  })
                }
              </div>
            </div>
          </div>'
        </div>
      </div>
    </>
  )
}

export default Home