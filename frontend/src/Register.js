import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Retrieve existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    // Check if the email is already registered
    const userExists = existingUsers.some(user => user.email === email);

    if (userExists) {
      alert('Email is already registered');
    } else {
      // Add new user to the list of existing users
      const newUser = { email, password };
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert('Registration successful');
      navigate('/');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
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
          <button type="submit" className="button">Register</button>
        </form>
      </header>
    </div>
  );
}

export default Register;