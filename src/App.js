import './App.css';
import logo from './logo.png'
import AtalForm from './AtalForm';
function App() {
  return (
    <div>
      <div className="d-flex flex-column text-center header p-2">
        <a href="https:\\www.atal.pl">
          <img src={logo} alt="logo"></img>
        </a>
        <h3>Zgłoszenie serwisowe</h3>
      </div>
      <AtalForm />
    </div>
  );
}

export default App;
