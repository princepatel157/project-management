const moment = require('moment');

const logs_enabled = process.env.LOG_ENABLED || false;

const log = (apiReference: any,log: any)=>{
  if(logs_enabled){
    try{
      log= JSON.stringify(log);
    }
    catch(exception){
      console.log('logging error')
    }
    console.log("---->" + moment(new Date()).format('YYYY-MM-DD hh:mm:ss') + " :----: " + 
    apiReference.module + " :=: " + apiReference.api + " :=: " + log);
  }
}

export default log;