import './App.css';

function App() {
  return (
    <div className="App">
      <title>IELTS Speaking Test Simulator</title>
      <header className="App-header">
        <div className="centered-column">
          <title>IELTS Speaking Test Simulator</title>
          <h4>Forgot Password</h4>
          <form>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Reset Password</button>
          </form>
          <p>
            Remembered your password?{' '}
            <span className="link" onClick={() => setCurrentPage('login')}>
              Login here
            </span>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;