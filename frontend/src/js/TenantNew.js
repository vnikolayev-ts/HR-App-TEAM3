import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tenantData from "../data/tenants.json";
//import {getTenats} from './ClientApi'; --> UNKLAR, WIE HIER UMZUSETZEN???

import Navbar from './NavBar';

// funktion um die Nächste ID aus der JSON zu finden
function getNextId(tenants) {
  return tenants.length > 0 ? Math.max(...tenants.map(tenants => tenants.tenantId)) + 1 : 1;
}

function TenantNew() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const ids = tenantData.tenants.map(tenantId => tenantId)
    console.log(ids)

    const handleChange = (event) => {
      setName(event.target.value);  
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const newID = getNextId(tenantData.tenants)
      const tenantAdd = {
        tenantId: newID,
        name: name
      }
      tenantData.tenants.push(tenantAdd)
      //alert(`The Companyname was send: ${name}`);
      console.log(tenantData)
      // Die Ergänzung neuer Kunden muss später im Backend mit fs vorgenommen werden, da
      // diese Funktionalität im Frontend nicht abzubilden geht, (Fs geht nicht im Frontend!)
      // Bzw. per API ans Backend gesendet werden.
     
      setName('')  
    };

    const handleBackClick = () => { 
      navigate('/tenant');
    };


  return (
    <div class={layout}>  //Neu eingefügt!
        <Navbar />        //Neu eingefügt!
        <div class="action header">  //Neu eingefügt!
          <form onSubmit={handleSubmit}>
              <label>
                  Companyname:
                  <input type='text' name='name' value={name} onChange={handleChange}/>
              </label>
              <input type='submit' value='Send' />
              <button class= "home" onClick={handleBackClick} >Home</button>
          </form>
        </div>
    </div>    
    );
};

export default TenantNew;