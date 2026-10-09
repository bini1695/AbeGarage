// import the query function from the db.config.js file
const { query: dbQuery } = require('../config/db.config');
const bcrypt = require('bcrypt');

async function getEmployeeByEmail(employee_email) {
  const sql = `SELECT e.employee_id, e.employee_email, e.active_employee, e.added_date, i.employee_first_name, i.employee_last_name, i.employee_phone, p.employee_password_hashed, r.company_role_id
    FROM employee e
    JOIN employee_info i ON e.employee_id = i.employee_id
    JOIN employee_pass p ON e.employee_id = p.employee_id
    JOIN employee_role r ON e.employee_id = r.employee_id
    WHERE e.employee_email = ?`;
  const rows = await dbQuery(sql, [employee_email]);
  return rows;
}

async function login(employeeData) {
  try {
    const { employee_email, employee_password } = employeeData;
    if (!employee_email || !employee_password) {
      return {
        status: 'fail',
        message: 'employee_email and employee_password are required',
      };
    }

    const employeeRows = await getEmployeeByEmail(employee_email);
    if (!employeeRows || employeeRows.length === 0) {
      return {
        status: 'fail',
        message: 'employee not found',
      };
    }

    const employee = employeeRows[0];
    const passwordMatch = await bcrypt.compare(employee_password, employee.employee_password_hashed);
    if (!passwordMatch) {
      return {
        status: 'fail',
        message: 'incorrect password',
      };
    }

    return {
      status: 'success',
      data: {
        employee_id: employee.employee_id,
        employee_email: employee.employee_email,
        company_role_id: employee.company_role_id,
        employee_first_name: employee.employee_first_name,
        employee_last_name: employee.employee_last_name,
        employee_phone: employee.employee_phone,
        active_employee: employee.active_employee,
      },
    };
  } catch (error) {
    console.error('Login service error:', error);
    return {
      status: 'error',
      message: 'login service error',
    };
  }
}

module.exports = {
  login,
};
