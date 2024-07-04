import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Login from './components/Login/Login';

import PrivateRoute from './Route/PrivateRoute';
import Layout from './components/Layout/Layout';

import Navbar from './components/Layout/NavBar';

import Dashboard  from './components/Dashboard/Dashboard';

import EmployeeList from './components/Employee/EmployeeList';
import EmployeeDetail from './components/Employee/EmployeeDetail';
import EmployeeEdit from './components/Employee/EmployeeEdit';


import TenantList from './components/Tenant/TenantList';
import TenantDetail from './components/Tenant/TenantDetail';
import TenantEdit from './components/Tenant/TenantEdit';

import UserList from './components/User/UserList';
import UserDetail from './components/User/UserDetail';

import CreateUser from "./components/User/CreateUser";
import EditUser from './components/User/EditUser';


const App = () => {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard"  element={ <PrivateRoute><Dashboard /></PrivateRoute> }  />

        <Route path="/employee"  element={ <PrivateRoute><EmployeeList /></PrivateRoute> }  />
        <Route path="/employee/:id"  element={ <PrivateRoute><EmployeeDetail /></PrivateRoute> }  />


        <Route path="/tenant"  element={ <PrivateRoute><TenantList /></PrivateRoute> }  />
        <Route path="/tenant/:id"  element={ <PrivateRoute><TenantDetail /></PrivateRoute> }  />
 
        <Route path="/user"  element={ <PrivateRoute><UserList /></PrivateRoute> }  />
        <Route path="/user/:id"  element={ <PrivateRoute><UserDetail /></PrivateRoute> }  />
      
        <Route path="/user-edit/:id"  element={ <PrivateRoute><EditUser isView={false} /></PrivateRoute> }  />
        <Route path="/user-create"  element={ <PrivateRoute><CreateUser /></PrivateRoute> }  />

        
        /*TODO*/
        <Route path="/user-profile"  element={ <PrivateRoute><UserList /></PrivateRoute> }  />

        <Route path="/tenant-edit/:id"  element={ <PrivateRoute><TenantEdit /></PrivateRoute> }  />
        <Route path="/tenant-create"  element={ <PrivateRoute><TenantEdit /></PrivateRoute> }  />

        <Route path="/employee-edit/:id"  element={ <PrivateRoute><EmployeeEdit /></PrivateRoute> }  />
        <Route path="/employee-create"  element={ <PrivateRoute><EmployeeEdit /></PrivateRoute> }  />

      </Routes>
     
    </Router>
  );
}

export default App; 