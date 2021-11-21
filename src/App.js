import './App.css'
// React Notification
import 'react-notifications/lib/notifications.css'

import React from 'react'
import { NotificationContainer } from 'react-notifications'

import logo from './logo.png'
import AtalForm from './views/AtalForm'

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
