import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Profile() {
  const navigate = useNavigate();
  let currentUser = null;

  try {
    const users = JSON.parse(localStorage.getItem('users'));
    const currentUserId = localStorage.getItem('currentUserId');
    if (users && currentUserId) {
      currentUser = users.find(user => user.id === currentUserId);
    }
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
  }

  if (!currentUser) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Profile</h1>
          <p>No user data available.</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Profile</h1>
        <div className="profile-details">
          <div className="profile-item">
            <strong>Username:</strong> <span>{currentUser.username}</span>
          </div>
          <div className="profile-item">
            <strong>Email:</strong> <span>{currentUser.email}</span>
          </div>
          <div className="profile-item">
            <strong>First Name:</strong> <span>{currentUser.firstName}</span>
          </div>
          <div className="profile-item">
            <strong>Last Name:</strong> <span>{currentUser.lastName}</span>
          </div>
        </div>
        <button onClick={() => navigate('/edit-profile')} className="button">Edit Profile</button>
      </header>
    </div>
  );
}

export default Profile;