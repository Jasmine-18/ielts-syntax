import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function Result() {
  const location = useLocation();
  const feedback = location.state?.feedback || "No feedback available.";

  return (
    <div className="App">
      <header className="App-header">
        <h1>Recording Result</h1>
        <p>Your recording has been saved successfully.</p>
        <p>{feedback}</p>
      </header>
    </div>
  );
}

export default Result;