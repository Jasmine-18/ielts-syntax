import React, { useState } from 'react';
import './App.css';

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('users'))[0]; // 假设只有一个用户
  const [email, setEmail] = useState(storedUser.email);
  const [firstName, setFirstName] = useState(storedUser.firstName);
  const [lastName, setLastName] = useState(storedUser.lastName);
  const [username, setUsername] = useState(storedUser.username);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = existingUsers.findIndex(user => user.email === storedUser.email);

    if (userIndex !== -1) {
      existingUsers[userIndex].email = email;
      existingUsers[userIndex].firstName = firstName;
      existingUsers[userIndex].lastName = lastName;
      existingUsers[userIndex].username = username;
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert('Profile updated successfully');
      setIsEditingDetails(false);
    }
  };

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
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Profile</h1>
        <div className="profile-details">
          <div className="profile-item">
            <strong>Username:</strong> <span>{username}</span>
          </div>
          <div className="profile-item">
            <strong>Email:</strong> <span>{email}</span>
          </div>
          <div className="profile-item">
            <strong>First Name:</strong> <span>{firstName}</span>
          </div>
          <div className="profile-item">
            <strong>Last Name:</strong> <span>{lastName}</span>
          </div>
        </div>
        <button onClick={() => setIsEditingDetails(true)} className="button">Edit Details</button>
        <button onClick={() => setIsChangingPassword(true)} className="button">Change Password</button>

        {isEditingDetails && (
          <form onSubmit={handleUpdateProfile} className="form-container">
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
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button">Update Profile</button>
            <button type="button" onClick={() => setIsEditingDetails(false)} className="button">Cancel</button>
          </form>
        )}

        {isChangingPassword && (
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
            <button type="button" onClick={() => setIsChangingPassword(false)} className="button">Cancel</button>
          </form>
        )}
      </header>
    </div>
  );
}

export default Profile;