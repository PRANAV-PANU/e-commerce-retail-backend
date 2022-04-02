//the app starts from here 
const express = require('express');
const bodyparser = require('body-parser');
const myRequestLogger = require('./utilities/requestlogger.js');
//const cors = require('cors');
const myErrorLogger = require('./utilities/errorlogger.js');
const routes = require('./routes/routing.js');


const app = express();
const port =  3000;

app.use(bodyparser.json());
app.use(myRequestLogger);
//app.use(cors);
app.use(myErrorLogger);

app.use('/',routes);

app.listen(port,()=>{
  console.log("Server is running successfully");
})