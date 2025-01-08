import React, { useState } from 'react';
import './App.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // 模拟发送 email 的过程
    setMessage(`An email has been sent to ${email} to reset your password.`);
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
          <button type="submit" className="button">Send Reset Email</button>
        </form>
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default ForgotPassword;