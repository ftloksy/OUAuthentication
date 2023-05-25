import logo from './logo.svg';
import './App.css';
import OuLogin from './components/OuLogin';
import Footer from './pages/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cool Teach</h1>
        <OuLogin />
        
      </header>
      <Footer />
    </div>
  );
}

export default App;
