import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Main() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Main Page</h1>
        <button onClick={() => navigate('/profile')} className="button">Go to Profile</button>
      </header>
    </div>
  );
}

export default Main;