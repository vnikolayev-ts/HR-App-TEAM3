import React, { useState, useEffect } from 'react';
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
  const [errorMessage, setErrorMessage] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 4000); 

      const timer2 = setTimeout(() => {
        setErrorMessage('');
        setFadeOut(false);
      }, 5000); 

      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [errorMessage]);

  const handleLoginError = (error) => {
    console.error('Login error:', error);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let loginUser = await apiLogin(username, password);

      if (loginUser) {
        console.log('Access granted');
        delete loginUser.password;
        login(loginUser);  // Funktion 'login' muss definiert sein, um den Benutzer in der Session zu speichern
        navigate('/dashboard');
      } else {
        console.log('Wrong credentials');
        setErrorMessage('Wrong credentials! Try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      handleLoginError(error);
    }
  };

  return (
    <div className="loginContainer">
      {errorMessage && (
        <div className={`popup errorPopup ${fadeOut ? 'fadeOut' : 'visible'}`}>
          <div className="popupContent">
            <span className="closeBtn" onClick={() => setErrorMessage('')}>
              &times;
            </span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      <img src={imgUrl} alt="Logo" className="logo" />
      <div className="loginItem">
        <h2 className="pageTitleL">Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username"></label>
          <input
            placeholder="Username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password"></label>
          <input
            placeholder="Please enter password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="loginButton" type="submit">Login</button>
        </form>
      </div>
      <img src={imgUrl} alt="Logo" className="logo-background" />
    </div>
  );
};

export default LoginForm;
