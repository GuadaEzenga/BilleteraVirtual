import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import './App.css';

function App() {
  const [authToken, setAuthToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setAuthToken={setAuthToken} />} />
        <Route path="/main" element={<MainPage authToken={authToken} setAuthToken={setAuthToken} />} />
      </Routes>
    </Router>
  );
}

export default App;