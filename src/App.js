import './App.css'
import logo from './logo.png'
import AtalForm from './AtalForm'
import React from 'react'

// React Notification
import 'react-notifications/lib/notifications.css'
import { NotificationContainer } from 'react-notifications'

const App = function () {
  return (
    <div>
      <div className="d-flex flex-column text-center header p-2">
        <a href="https:\\www.atal.pl">
          <img src={logo} alt="logo" />
        </a>
        <h3>Zgłoszenie serwisowe</h3>
      </div>
      <AtalForm />
      <NotificationContainer />
    </div>
  )
}

export default App
