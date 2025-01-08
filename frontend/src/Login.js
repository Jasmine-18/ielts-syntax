import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 从本地存储中获取用户数据
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(user => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/main');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="form-container">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">Login</button>
        </form>
        <div>
          <p>
            Don't have an account? <Link to="/register" className="link">Register here</Link>
          </p>
          <p>
            <Link to="/forgot-password" className="link">Forgot Password?</Link>
          </p>
        </div>
      </header>
    </div>
  );
}

export default Login;