import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('API URL:', process.env.REACT_APP_API_URL); 
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username,
        password
      });
      const { token } = response.data;
      localStorage.setItem('jwt', token);
      alert('Login successful');
      navigate('/main');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="button">Login</button>
        </form>
        <div>
          <p>
            <Link to="/forgot-password" className="link">Forgot password?</Link>
          </p>
          <p>
            Don't have an account? <Link to="/register" className="link">Click here to register</Link>
          </p>
        </div>
      </header>
    </div>
  );
}

export default Login;