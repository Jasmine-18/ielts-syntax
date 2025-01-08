import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Implement forgot password logic here
    alert('Password reset link sent to your email');
    navigate('/');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Forgot Password</h1>
        <form onSubmit={handleForgotPassword} className="form-container">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">Send Reset Link</button>
        </form>
        <div>
          <p>
            Got an account? <Link to="/" className="link">Login here</Link>
          </p>
        </div>
      </header>
    </div>
  );
}

export default ForgotPassword;