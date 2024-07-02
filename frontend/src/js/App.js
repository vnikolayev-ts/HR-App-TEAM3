import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';
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
      </Routes>
     
    </Router>
  );
}

export default App; 