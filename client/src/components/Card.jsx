import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './Card.css';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdDelete } from "react-icons/md";
import { taskStatus } from '../constants/taskStatus';


export default function BasicCard(props) {
  const [task,setTask] = React.useState(props.tasks && props.tasks || {})
  
  return (
    <Card className='main-card'>
      <CardContent>
        <Typography className='task-body' variant="body2">
          {task.task_name}
        </Typography>
      </CardContent>
      <div className='action-btn'>
        <Button onClick={()=>props.trigger("prev",task.task_id)} disabled={task.status === taskStatus.NEW}><MdKeyboardDoubleArrowLeft/></Button>
      {
        task && task.status === taskStatus.COMPLETED?
        <Button onClick={()=>props.deleteTrigger(task.task_id)}><MdDelete className='del-icon'/></Button>
        : 
        <Button onClick={()=>props.trigger("next",task.task_id)} disabled={task.status === taskStatus.COMPLETED}><MdKeyboardDoubleArrowRight/></Button>
      }
      </div>
    </Card>
  );
}