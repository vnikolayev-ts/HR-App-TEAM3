import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLogin } from '../../api/ClientApi';
import { login } from './auth';

const imgUrl = '../images/logo/neues_logo.png';

const LoginForm = () => {
  const testUsername = 'superadmin';
  const testPassword = '##########';

  localStorage.setItem('theme', 'light');

  const [username, setUsername] = useState(testUsername);
  const [password, setPassword] = useState(testPassword);
  const [showWarning, setShowWarning] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginError = (error) => {
    
  
    
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let loginUser = await apiLogin(username, password);

      if (loginUser) {
        console.log('Access granted');
        setAccessGranted(true);
        delete loginUser.password;
        login(loginUser);  // Funktion 'login' muss definiert sein, um den Benutzer in der Session zu speichern
        navigate('/dashboard');
      } else {
        console.log('Wrong credentials');
        setShowWarning(true);
        setTimeout(closeWarning, 5000); // Schließt die Warnmeldung nach 5 Sekunden
      }
    } catch (error) {
      console.error('Error during login:', error);
      //handleLoginError(error); // Methode zur Fehlerbehandlung aufrufen
      setErrorMessage(error.message);
    }
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
          <span className="closeBtn" onClick={closeWarning}>
            &times;
          </span>
          <p>Wrong credentials!</p>
          <p>Try again.</p>
        </div>
      </div>

      <div className={`accessPopup ${accessGranted ? 'visible' : ''}`}>
        <div className="accessContent">
          <span className="closeBtn" onClick={closeAccessGranted}>
            &times;
          </span>
          <p>Access granted</p>
        </div>
      </div>

      {errorMessage && (
        <div className="errorPopup visible">
          <div className="errorContent">
            <span className="closeBtn" onClick={() => setErrorMessage('')}>
              &times;
            </span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      <img src={imgUrl} alt="Logo" className="logo" />
      <div className="loginItem">
        <h2 className="pageTitle">Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="username"></label>
              <input
                placeholder="Username"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <br />
            <div>
              <label htmlFor="password"></label>
              <input
                placeholder="Please enter password"
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
      <img src={imgUrl} alt="Logo" className="logo-background" />
    </div>
  );
};

export default LoginForm;
