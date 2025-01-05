import './App.css';

function App() {
  return (
    <div className="App">
      <title>IELTS Speaking Test Simulator</title>
      <header className="App-header">
        <div className="centered-column">
          <title>IELTS Speaking Test Simulator</title>
          <h4>Login</h4>
          <form>
            <input type="email" placeholder="Email" required />
          </form>
          <form>
            <input type="password" placeholder="Password" required />
          </form>
          <form>
            <button type="submit">Login</button>
          </form>
          <p>
            Don’t have an account?{' '}
            <span className="link" /*onClick={() => }*/>
              Register here
            </span>
          </p>
          <p>
            <span className="link" /*onClick={() => }*/>
              Forgot Password?
            </span>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;