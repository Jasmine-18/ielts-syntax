import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Retrieve user credentials from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email) {
      // Update password in local storage
      localStorage.setItem('user', JSON.stringify({ email, password: newPassword }));
      alert('Password reset successful');
      navigate('/');
    } else {
      alert('Email not found');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Forgot Password</h1>
        <form onSubmit={handleForgotPassword}>
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
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">Reset Password</button>
        </form>
      </header>
    </div>
  );
}

export default ForgotPassword;