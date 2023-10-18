import '../styles/App.css';
import REPL from './REPL';

/**
 * This is the highest level component!
 */
function App() {
  return (
    <div className="App">
      <p className="App-header">
        <h1>Real Estate Appraisal Tool</h1>
        <h2>Using mocked data</h2>
      </p>
      <REPL />      
    </div>
  );
}

export default App;
