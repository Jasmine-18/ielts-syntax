import React, { useState } from 'react';
import './App.css';

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [email, setEmail] = useState(storedUser?.email || '');
  const [password, setPassword] = useState('');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Retrieve existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    // Find the user by email
    const userIndex = existingUsers.findIndex(user => user.email === storedUser.email);

    if (userIndex !== -1) {
      // Update the user's email
      existingUsers[userIndex].email = email;
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert('Profile updated successfully');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Retrieve existing users from local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    // Find the user by email
    const userIndex = existingUsers.findIndex(user => user.email === storedUser.email);

    if (userIndex !== -1) {
      // Update the user's password
      existingUsers[userIndex].password = password;
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert('Password changed successfully');
    }
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