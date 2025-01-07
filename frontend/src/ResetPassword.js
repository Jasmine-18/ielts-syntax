import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('Password reset successfully');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error resetting password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Reset Password</h1>
        <form onSubmit={handleResetPassword}>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">Reset Password</button>
        </form>
      </header>
    </div>
  );
}

export default ResetPassword;