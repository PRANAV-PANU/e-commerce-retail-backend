//request are logged into this file
const fs = require('fs');
const {promisify} = require('util');
const { compileFunction } = require('vm');

const appendfile = promisify(fs.appendFile);

async function requestLogger(req,res,next){
    try{
        const logMessage = `\n${new Date()} - ${req.method} - ${req.url}`;
        await appendfile('RequestLogger.log',logMessage);
        next();
    }catch(error){
        next(error);
    }
}

module.exports = requestLogger;