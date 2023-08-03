import axios from "axios";
import { BASE_URL } from "./helper";

const addNewProjectService = async (data) => {
  const res = await axios.post(`${BASE_URL}/createProject`, data,{withCredentials:true});
  return res;
}

const getProjectService = async () => {
  const res = await axios.get(`${BASE_URL}/getProjects`,{withCredentials:true});
  return res;
}

const deleteProjectService = async (data) => {
  const res = await axios.delete(`${BASE_URL}/deleteProject?project_id=${data.project_id}`,{withCredentials:true});
  return res;
}


// task service
const addNewTaskService = async (data) => {
  const res = await axios.post(`${BASE_URL}/createTask`, data,{withCredentials:true});
  return res;
}

const updateTaskService = async (data) => {
  const res = await axios.post(`${BASE_URL}/updateTask`, data,{withCredentials:true});
  return res;
}
const deleteTaskService = async (data) => {
  const res = await axios.delete(`${BASE_URL}/deleteTask?project_id=${data.project_id}&task_id=${data.task_id}`,{withCredentials:true});
  return res;
}

export {
  addNewProjectService,
  getProjectService,
  addNewTaskService,
  updateTaskService,
  deleteTaskService,
  deleteProjectService
}