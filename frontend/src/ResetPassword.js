import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        alert('Password reset successfully');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to reset password');
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
        <form onSubmit={handleResetPassword} className="form-container">
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password:</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
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