import AppError from '../utils/AppError';

export const errorHandler = (error: any,req: any,res: any,next: any)=>{

  if(error instanceof AppError){
    return res.status(error.statusCode).json({
      message: error.message
    })
  }
  console.log('server-error---',error)
  res.status(500).json({message:"Server Error"});
}