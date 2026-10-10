// src/markup/pages/admin/Employee.js

import React from "react";

// ✅ AuthContext: 3 levels up to src/, then into context/
import { useAuth } from "../../../context/AuthContext";

// ✅ Components: 2 levels up to markup/, then into components/
import LoginForm from "../../components/LoginForm/LoginForm";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EmployeesList from "../../components/Admin/EmployeesList/EmployeesList";

function Employee() {
  const { isLogged, isAdmin } = useAuth();

  if (!isLogged) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div>
        <h1>You are not authorized to access this page</h1>
      </div>
    );
  }

  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <EmployeesList />
        </div>
      </div>
    </div>
  );
}

export default Employee;