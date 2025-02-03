import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './App.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/recover`, {
        email
      });
      Swal.fire({
        icon: 'success',
        title: 'Email Sent',
        text: response.data.message,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.error,
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Forgot Password</h1>
        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="button">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default ForgotPassword;