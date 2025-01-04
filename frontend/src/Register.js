import './App.css';

function App() {
  return (
    <div className="App">
      <title>IELTS Speaking Test Simulator</title>
      <header className="App-header">
        <div className="centered-column">
          <title>IELTS Speaking Test Simulator</title>
          <h4>Register</h4>
          <form>
            <input type="text" placeholder="Username" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Register</button>
          </form>
          <p>
            Already have an account?{' '}
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