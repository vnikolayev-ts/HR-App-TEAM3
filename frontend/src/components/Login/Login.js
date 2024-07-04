import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './auth';


const imgUrl='../images/logo/android-chrome-512x512.png';





const LoginForm = () => {
    const validUsername = 'user@user.de';
    const validPassword = '123456';
    const isAdmin = true; 

  const [username, setUsername] = useState(validUsername);
  const [password, setPassword] = useState(validPassword);
  const [showWarning, setShowWarning] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

 
  

 
    if (username === validUsername && password === validPassword) {
        console.log('Acces granted');

        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('loggedInUserIsAdmin', isAdmin);
       

        setAccessGranted(true); 
        login();
        navigate('/dashboard');

        /*setTimeout(() => {
          setAccessGranted(false);
        }, 5000);*/

      } else  {
        console.log('Wrong credentials')
        setShowWarning(true);
        setTimeout(() => {
          setShowWarning(false);
        }, 5000);

    }
    
    console.log('Email:', username);
    console.log('Password:', password);

  };

 

  const closeWarning = () => {
      setShowWarning(false);
    
  };

  const closeAccessGranted = () => {
    setAccessGranted(false);
  };


  return (
    <div className="loginContainer">
      
        <div className={`warningPopup ${showWarning ? 'visible' : ''}`}>
          <div className="warningContent">
            <span className="closeBtn" onClick={closeWarning}>&times;</span>
            <p>Wrong credentials!</p>
            <p>Try again.</p>
          </div>
        </div>
      
        
        <div className={`accessPopup ${accessGranted ? 'visible' : ''}`}>
          <div className="accessContent">
            <span className="closeBtn" onClick={closeAccessGranted}>&times;</span>
            <p>Access granted</p>
          </div>
        </div>
        
      <img src={imgUrl} alt="Logo" className="logo" />
      <div className="loginItem">
        <h2 className="pageTitle">Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="email"></label>
              <input
                placeholder="Bitte Email eingeben"
                type="email"
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <br />
            <div>
              <label htmlFor="password"></label>
              <input
                placeholder="Bitte Passwort eingeben"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;