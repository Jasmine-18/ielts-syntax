import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Question from './Question';

function AppContent() {
  const location = useLocation();

  if (location.pathname === '/question') {
    return null;
  }

  return (
    <div className="App">
      <title>IELTS Speaking Test Simulator</title>
      <header className="App-header">
        <h1>IELTS Speaking Simulator</h1>
        <p>Answer the following questions as if you are in the IELTS speaking test.</p>
        <Link to="/question" className="button">Start</Link>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Routes>
        <Route path="/question" element={<Question />} />
      </Routes>
    </Router>
  );
}

export default App;
