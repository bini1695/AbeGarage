// src/markup/components/Admin/EmployeesList/EmployeesList.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeesList.css";

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("employee_token");

        const response = await fetch(
          "http://localhost:5000/api/v1/employees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        console.error("Failed to load employees:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p>Loading employees…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (employees.length === 0) return <p>No employees found.</p>;

  return (
    <div className="employees-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employees</h2>
        <Link to="/admin/add-employee" className="btn btn-primary">
          + Add Employee
        </Link>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp.employee_id}>
              <td>{index + 1}</td>
              <td>{emp.employee_first_name}</td>
              <td>{emp.employee_last_name}</td>
              <td>{emp.employee_email}</td>
              <td>{emp.employee_phone}</td>
              <td>
                {emp.employee_role === 3
                  ? "Admin"
                  : emp.employee_role === 2
                  ? "Manager"
                  : "Employee"}
              </td>
              <td>{emp.active_employee ? "Yes" : "No"}</td>
              <td>
                <Link
                  to={`/admin/edit-employee/${emp.employee_id}`}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesList;