// Import the express module 
const express = require('express');
// Import the dotenv module and call the config method to load the environment variables
require('dotenv').config();
// Import the sanitizer module 
const sanitize = require('sanitize');
// Import the CORS module 
const cors = require('cors');
// Set up the CORS options to allow requests from our front-end 
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
};
// Create a variable to hold our port number 
const port = process.env.PORT || 5000; 
// Import the routers 
const router = require('./routes');
const employeeController = require('./controllers/employee.controller');
const loginController = require('./controllers/login.controller');
const authMiddleware = require('./middlewares/auth.middleware');
// Create the webserver 
const app = express();
// Add the CORS middleware
app.use(cors(corsOptions));
// Add the express.json middleware to the application
app.use(express.json());
// Add the sanitizer to the express middleware if available
if (sanitize && typeof sanitize.middleware === 'function') {
  app.use(sanitize.middleware);
}
// Log each incoming request for debugging
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.originalUrl);
  next();
});
// Add the direct employee add endpoint for compatibility
app.post('/api/employee/add', authMiddleware.verifyToken, authMiddleware.isAdmin, employeeController.createEmployee);
// Add the direct login endpoint for compatibility
app.post('/api/employee/login', loginController.login);
app.use('/api', router);
// Start the webserver
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
// Export the webse
// rver for use in the application 
module.exports = app;    
