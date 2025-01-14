import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        username,
        email,
        firstName,
        lastName,
        password
      });
      if (response && response.data && response.data.token) {
        const { token } = response.data;
        localStorage.setItem('jwt', token);
        alert('Registration successful');
        navigate('/main');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      alert(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="button">Register</button>
        </form>
        <div>
          <p>
            Already have an account? <Link to="/login" className="link">Click here to login</Link>
          </p>
        </div>
      </header>
    </div>
  );
}

export default Register;