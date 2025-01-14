import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/recover/password`, {
        currentPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(response.data.message);
      navigate('/profile');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Change Password</h1>
        <form onSubmit={handleChangePassword} className="form-container">
          <div className="form-group">
            <label>Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="button">Change Password</button>
          <button type="button" onClick={() => navigate('/profile')} className="button">Cancel</button>
        </form>
      </header>
    </div>
  );
}

export default ChangePassword;