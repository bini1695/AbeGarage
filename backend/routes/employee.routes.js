// Import the express module  
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the employee controller
const employeeController = require('../controllers/employee.controller');
// Import middleware 
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the add employee request on post
router.post("/", [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.createEmployee);
router.post("/add", [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.createEmployee);
router.post("/add/employee", [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.createEmployee);
// Export the router
module.exports = router;