import './App.css';
import { Routes, Route } from 'react-router-dom';

// Import pages
import Home from './markup/pages/Home.js';
import Login from './markup/pages/Login.js';
import AddEmployee from './markup/pages/admin/AddEmployee.js';

// Import the missing route guard (update path if your folder structure differs)
import PrivateAuthRoute from './markup/components/Authorization/PrivateRoute.js';

// Import CSS files
import './assets/templet-ass/css/bootstrap.css';
import './assets/templet-ass/css/style.css';
import './assets/templet-ass/css/responsive.css';
import './assets/templet-ass/css/color.css';
import './assets/styles/custom.css';

// Import layout components
import Header from './markup/components/Header/header.js';
import Footer from './markup/components/Footer/Footer.js';
import Unauthorized from './markup/pages/Unauthoized.js';
import Customers from "./markup/pages/admin/Customer.js"
import Orders from "./markup/pages/admin/Order.js"
import Employees from "./markup/pages/admin/Employee.js"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

         <Route path="/admin/orders"
                 element={
                   <PrivateAuthRoute roles={[1, 2, 3]}>
                     <Orders />
                   </PrivateAuthRoute>
                 } />
               {/* // Add the Customers Route  */}
               <Route path="/admin/customers"
                 element={
                   <PrivateAuthRoute roles={[2, 3]}>
                     <Customers />
                   </PrivateAuthRoute>
                 } />
               {/* // Add the Employees Route  */}
               <Route path="/admin/employees" element={<Employees />} />
             <Route path="/admin/add-employee" 
                 element={
                   <PrivateAuthRoute roles={[3]}>
                   <AddEmployee />
                   </PrivateAuthRoute>
          } 
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;