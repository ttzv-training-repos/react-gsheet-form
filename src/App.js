import './App.css';
import logo from './logo.png'
import AtalForm from './AtalForm';

// React Notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
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
      <NotificationContainer />
    </div>
  );
}

export default App;
