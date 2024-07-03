import tenantData from "../data/tenants.json";
import React from "react";
import { Link } from 'react-router-dom';

import Navbar from './NavBar';

const TenantList = () => {
    return (
      <>
        <div>
        <Navbar/>
          {tenantData.tenants.map((tenant) => (
          <div key={(tenant.tenantId)}>
              <div>{tenant.name}</div>
              <div>{tenant.tenantId}</div>
          </div>        
          ))}
        </div>
        <div class="tenant-action-list-item">
        <Link to={'/tenant/new'} > <button class="viewButton"  >New</button> </Link>
        </div>
      </>
  );   
};

  

export default TenantList; 