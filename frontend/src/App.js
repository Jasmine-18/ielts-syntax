import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Profile from './Profile';
import Question from './Question';
import Result from './Result';

function AppContent() {
  const location = useLocation();

  if (location.pathname === '/question' || location.pathname === '/result') {
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
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/main" element={<AppContent />} />
        <Route path="/question" element={<Question />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;