import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Profile from './Profile';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import Question from './Question';
import Result from './Result';
import ResetPassword from './ResetPassword';
import profileIcon from './assets/Profile.png'; 
import Main from './Main';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 清除用户登录状态（例如，清除本地存储中的登录标志）
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  if (location.pathname === '/question' || location.pathname === '/result') {
    return null;
  }

  return (
    <div className="App">
      <title>IELTS Speaking Test Simulator</title>
      <header className="App-header">
        <div className="header-buttons">
          <button onClick={handleProfileClick} className="profile-button">
            <img src={profileIcon} alt="Profile" className="profile-icon" />
          </button>
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
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
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/main" element={<AppContent />} />
        <Route path="/question" element={<Question />} />
        <Route path="/result" element={<Result />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;