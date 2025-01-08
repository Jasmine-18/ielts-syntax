import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function EditProfile() {
  const storedUser = JSON.parse(localStorage.getItem('users'))[0]; // 假设只有一个用户
  const [email, setEmail] = useState(storedUser.email);
  const [firstName, setFirstName] = useState(storedUser.firstName);
  const [lastName, setLastName] = useState(storedUser.lastName);
  const [username, setUsername] = useState(storedUser.username);
  const navigate = useNavigate();

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
      navigate('/profile');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Edit Profile</h1>
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
          <button type="button" onClick={() => navigate('/profile')} className="button">Cancel</button>
        </form>
      </header>
    </div>
  );
}

export default EditProfile;