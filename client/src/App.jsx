import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Transfer from './pages/Transfer';
import Receipt from './pages/Receipt';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirige de / a /login */}
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/receipt/:id" element={<Receipt />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;