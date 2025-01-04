import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="centered-column">
          <title>IELTS Speaking Test Simulator</title>
          <h4>Below are the questions for this oral test.</h4>
          <p class = "detail"> Please click on the button below to start the test when you are ready.</p>

          <div id="backend-content" class="content-placeholder">
            <p>Title</p>  
          </div>
          <br></br>
          <button class="button">Record (Photo replace)</button>
        </div>
      </header>
    </div>
  );
}

export default App;