import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';

import TenantNew from './TenantNew';
import TenantList from './TenantList';

import UserEdit from './EditUser';
import UserList from './UserList'; 

import Dashboard  from './Dashboard';
import Login from './Login';

import PrivateRoute from './PrivateRoute';



/*
* test 
*/
const App = () => {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard"  element={ <PrivateRoute><Dashboard /></PrivateRoute> }  />
        <Route path="/employee"  element={ <PrivateRoute><EmployeeList /></PrivateRoute> }  />
        <Route path="/employee/:id"  element={ <PrivateRoute><EmployeeDetails /></PrivateRoute> }  />
        <Route path="/tenant"  element={ <PrivateRoute><TenantList /></PrivateRoute> }  />
        <Route path="/tenant/new"  element={ <PrivateRoute><TenantNew /></PrivateRoute> }  />
        <Route path="/user"  element={ <PrivateRoute><UserList /></PrivateRoute> }  />
        <Route path="/user/:id"  element={ <PrivateRoute><UserEdit /></PrivateRoute> }  />
        <Route path="/user-edit/:id"  element={ <PrivateRoute><UserEdit /></PrivateRoute> }  />
      </Routes>
     
    </Router>
  );
}

export default App; 