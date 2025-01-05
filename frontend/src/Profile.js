import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [email, setEmail] = useState(storedUser?.email || '');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Update user email in local storage
    localStorage.setItem('user', JSON.stringify({ email, password: storedUser.password }));
    alert('Profile updated successfully');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Update user password in local storage
    localStorage.setItem('user', JSON.stringify({ email: storedUser.email, password }));
    alert('Password changed successfully');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Profile</h1>
        <form onSubmit={handleUpdateProfile}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">Update Profile</button>
        </form>
        <form onSubmit={handleChangePassword}>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">Change Password</button>
        </form>
      </header>
    </div>
  );
}

export default Profile;