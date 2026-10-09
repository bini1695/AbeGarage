//import the express module
const express = require('express');
//call the router method from express to create the router
const router = express.Router();
//import the login controller
const loginController = require('../controllers/login.controller');
//create a route to handle the login request on post
router.post("/login", loginController.login);
//export the router
module.exports = router;
