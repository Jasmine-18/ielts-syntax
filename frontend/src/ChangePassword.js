import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function ChangePassword() {
  const storedUser = JSON.parse(localStorage.getItem('users'))[0]; // 假设只有一个用户
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = existingUsers.findIndex(user => user.email === storedUser.email);

    if (userIndex !== -1) {
      if (existingUsers[userIndex].password !== currentPassword) {
        alert('Current password is incorrect');
        return;
      }
      if (newPassword !== confirmNewPassword) {
        alert('New passwords do not match');
        return;
      }
      existingUsers[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert('Password changed successfully');
      navigate('/profile');
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