const employeeService = require('../services/employee.service');

async function createEmployee(req, res) {
    try {
        const email = req.body.email || req.body.employee_email;
        if (!email) {
            return res.status(400).json({ error: 'email is required' });
        }

        const employeeExists = await employeeService.checkIfEmployeeExists(email);
        if (employeeExists) {
            return res.status(400).json({ error: 'the email is already associated with another employee' });
        }

        const employeeData = req.body;
        const employeeCreated = await employeeService.createEmployee(employeeData);
        if (!employeeCreated || !employeeCreated.employee_id) {
            return res.status(400).json({ error: 'failed to add the employee' });
        }

        return res.status(201).json({ message: 'employee added successfully', status: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'something went wrong!' });
    }
}

module.exports = {
    createEmployee,
};