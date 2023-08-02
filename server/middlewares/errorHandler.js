const AppError = require('../utils/AppError');

const errorHandler = (error,req,res,next)=>{

  if(error instanceof AppError){
    return res.status(error.statusCode).json({
      message: error.message
    })
  }
  console.log('server-error---',error)
  res.status(500).json({message:"Server Error"});
}


module.exports = errorHandler;