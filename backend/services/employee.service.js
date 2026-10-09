// Import the query function from the db.config.js file 
const { query: dbQuery, pool } = require("../config/db.config");
// Import the bcrypt module 
const bcrypt = require('bcrypt');
// A function to check if employee exists in the database 
async function checkIfEmployeeExists(email) {
  const sql = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await dbQuery(sql, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new employee 
async function createEmployee(employee) {
  const email = employee.employee_email || employee.email;
  const password = employee.employee_password;
  const activeEmployee = employee.active_employee !== undefined ? employee.active_employee : 1;
  const firstName = employee.employee_first_name || employee.first_name;
  const lastName = employee.employee_last_name || employee.last_name;
  const phone = employee.employee_phone;
  const companyRoleId = employee.company_role_id || employee.companyRoleId || 1;

  if (!email || !password || !firstName || !lastName || !phone) {
    throw new Error('Missing required employee fields');
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [employeeResult] = await connection.execute(
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)",
      [email, activeEmployee]
    );

    const employeeId = employeeResult.insertId;

    await connection.execute(
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)",
      [employeeId, firstName, lastName, phone]
    );

    await connection.execute(
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)",
      [employeeId, hashedPassword]
    );

    await connection.execute(
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)",
      [employeeId, companyRoleId]
    );

    await connection.commit();

    return { employee_id: employeeId };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const sql = "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await dbQuery(sql, [employee_email]);
  return rows;
}

// Export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail
};