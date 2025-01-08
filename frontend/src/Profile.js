import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('users'))[0]; // 假设只有一个用户
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Profile</h1>
        <div className="profile-details">
          <div className="profile-item">
            <strong>Username:</strong> <span>{storedUser.username}</span>
          </div>
          <div className="profile-item">
            <strong>Email:</strong> <span>{storedUser.email}</span>
          </div>
          <div className="profile-item">
            <strong>First Name:</strong> <span>{storedUser.firstName}</span>
          </div>
          <div className="profile-item">
            <strong>Last Name:</strong> <span>{storedUser.lastName}</span>
          </div>
        </div>
        <button onClick={() => navigate('/edit-profile')} className="button">Edit Profile</button>
        <button onClick={() => navigate('/change-password')} className="button">Change Password</button>
        <button onClick={() => navigate('/main')} className="button">Back</button>
      </header>
    </div>
  );
}

export default Profile;