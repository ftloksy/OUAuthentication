import logo from './logo.svg';
import './App.css';
import CreateEmployee from './components/CreateEmployee';
import LocalStorageButton from './labcomponents/LocalStorageButton'
import OuLogin from './components/OuLogin'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <OuLogin />

        <CreateEmployee />

        <LocalStorageButton />
        
      </header>
    </div>
  );
}

export default App;
