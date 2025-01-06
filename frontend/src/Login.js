import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Retrieve existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    // Check if the email and password match any registered user
    const user = existingUsers.find(user => user.email === email && user.password === password);

    if (user) {
      navigate('/main');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
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
            <Link to="/register" className="link">Register</Link>
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