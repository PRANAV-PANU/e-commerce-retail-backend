//all the errors are logged in this file
const fs = require('fs');

const errorLogger = (err,req,res,next) =>{
    fs.appendFile('ErrorLogger.txt',`${err.stack}\n`,(error)=>{
        if(error){
            console.log('Error Logging Failed');
        }
    });

    if(err.status){
        res.status(err.status);
    }else{
        res.status(500);
    }

    res.json({message:err.message});
};

module.exports = errorLogger;