import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './Card.css';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { taskStatus } from '../constants/taskStatus';
import { MdDelete, MdMode } from "react-icons/md";



export default function BasicCard(props) {
  const [task,setTask] = React.useState({})


  React.useEffect(()=>{
    setTask(props.tasks && props.tasks)
  },[props.tasks])
  
  return (
    <Card className='main-card'>
      <CardContent className='card-content'>
        <Typography className='task-body task-head' variant="body1">
          {task.task_name}
        </Typography>
        <Typography className='task-body' variant="body2">
          {task.description}
        </Typography>
      </CardContent>
      <div className='action-btn'>
        <Button onClick={()=>props.trigger("prev",task.task_id)} disabled={task.status === taskStatus.NEW}><MdKeyboardDoubleArrowLeft/></Button>
      
        <Button onClick={()=>props.trigger("next",task.task_id)} disabled={task.status === taskStatus.COMPLETED}><MdKeyboardDoubleArrowRight/></Button>
      </div>

      {/* edit delete btns */}
      <div className='edit-col'>
        <button onClick={()=>props.editTrigger(task)}><MdMode className='icon'/></button>
        <button onClick={()=>props.deleteTrigger(task.task_id)}><MdDelete className='icon del-icon'/></button>
      </div>
    </Card>
  );
}