import Joi from "joi";

const createProjectValidator=(req:any,res:any,next:any)=>{
  const schema = Joi.object({
    project_name: Joi.string().required().messages({
      'string.empty':'Project Name Required'
    }),
  });
  
  const {error} = schema.validate(req.body);
  if(error){
    res.status(422).send({message:error.details[0].message});
  }
  else{
    next();
  }
}

const updateProjectValidator=(req:any,res:any,next:any)=>{
  const schema = Joi.object({
    project_id: Joi.required(),
    project_name: Joi.string().required().messages({
      'string.empty':'Project Name Required'
    }),
  });
  
  const {error} = schema.validate(req.body);
  if(error){
    res.status(422).send({message:error.details[0].message});
  }
  else{
    next();
  }
}

const deleteProjectValidator=(req:any,res:any,next:any)=>{
  const schema = Joi.object({
    project_id: Joi.string().required()
  });
  
  const {error} = schema.validate(req.query);
  if(error){
    res.status(422).send({message:error.details[0].message});
  }
  else{
    next();
  }
}

const createTaskValidator=(req:any,res:any,next:any)=>{
  const schema = Joi.object({
    project_id: Joi.required(),
    task_name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required()
  });
  
  const {error} = schema.validate(req.body);
  if(error){
    res.status(422).send({message:error.details[0].message});
  }
  else{
    next();
  }
}

const updateTaskValidator=(req:any,res:any,next:any)=>{
  const schema = Joi.object({
    project_id: Joi.required(),
    task_id: Joi.required(),
    task_name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required()
  });
  
  const {error} = schema.validate(req.body);
  if(error){
    res.status(422).send({message:error.details[0].message});
  }
  else{
    next();
  }
}

const deleteTaskValidator=(req:any,res:any,next:any)=>{
  const schema = Joi.object({
    project_id: Joi.required(),
    task_id: Joi.required()
  });
  
  const {error} = schema.validate(req.query);
  if(error){
    res.status(422).send({message:error.details[0].message});
  }
  else{
    next();
  }
}


export {createProjectValidator,updateProjectValidator,deleteProjectValidator,createTaskValidator,updateTaskValidator,deleteTaskValidator}