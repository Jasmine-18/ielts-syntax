import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="centered-column">
          <title>IELTS Speaking Test Simulator</title>
          <h4>Below are the result of the test.</h4>

          <div id="backend-content" class="content-placeholder">
            <p>Result</p>
          </div>
          <br></br>
          <br></br>
          <div className="button-container">
            <button class="button ">Share</button>
            <button class="button ">Listen</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;