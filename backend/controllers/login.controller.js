// import the login service
const loginService = require('../services/login.service');
// import the jsonwebtoken module
const jwt = require('jsonwebtoken');
// import the secret key from the environment variables
const secretKey = process.env.JWT_SECRET || 'abe-garage-secret';

async function login(req, res) {
  try {
    const employeeData = req.body;
    if (!employeeData || !employeeData.employee_email || !employeeData.employee_password) {
      return res.status(400).json({
        status: 'fail',
        message: 'employee_email and employee_password are required',
      });
    }

    const employee = await loginService.login(employeeData);

    if (!employee || employee.status !== 'success') {
      return res.status(403).json({
        status: 'fail',
        message: employee ? employee.message : 'Login failed',
      });
    }

    const payload = {
      employee_id: employee.data.employee_id,
      employee_email: employee.data.employee_email,
      employee_role: employee.data.company_role_id,
      employee_first_name: employee.data.employee_first_name,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

    return res.status(200).json({
      status: 'success',
      message: 'login successful',
      data: {
        employee_token: token,
      },
    });
  } catch (error) {
    console.error('Login controller error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

// export the function
module.exports = {
  login,
};

     