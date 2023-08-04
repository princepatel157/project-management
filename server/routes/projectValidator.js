const Joi = require("joi");

exports.createProjectValidator=(req,res,next)=>{
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

exports.updateProjectValidator=(req,res,next)=>{
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

exports.deleteProjectValidator=(req,res,next)=>{
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

exports.createTaskValidator=(req,res,next)=>{
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

exports.updateTaskValidator=(req,res,next)=>{
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

exports.deleteTaskValidator=(req,res,next)=>{
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