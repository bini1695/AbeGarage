 //import express module
const express = require('express');
//call the router method from express to create the router
const router = express.Router();
//import the install router
const installRouter = require('./install.routes');
//import the employee router
const employeeRouter = require('./employee.routes');
//add the install router to the main router
router.use('/install', installRouter);
//add the employee router to the main router
router.use('/employee', employeeRouter);
//add the login routes to the main router
const loginRouter = require('./login.route');
router.use('/employee', loginRouter);

//export the router for use in the application
module.exports = router;