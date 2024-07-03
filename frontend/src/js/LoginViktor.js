import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './auth';

const Login = () => {
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('pass');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validUsername = 'user';
    const validPassword = 'pass';
    const isAdmin = false; 

    if (username === validUsername && password === validPassword) {
      login();
      localStorage.setItem('loggedInUser', username);
      localStorage.setItem('loggedInUserIsAdmin', isAdmin);
      navigate('/dashboard');
    } else {
      setError('Ungültiger Benutzername oder Passwort');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Benutzername:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Passwort:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
