import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import NavTabs from '../components/NavTabs';
import TransferHistory from '../components/TransferHistory';
import TransferForm from '../components/TransferForm';
import Receipt from '../components/Receipt';

function MainPage({ authToken, setAuthToken }) {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null);
    navigate('/');
  };

  return (
    <div className="container">
      <Header onLogout={handleLogout} />
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        <div className={`tab-content ${activeTab === 'profile' ? 'active' : ''}`} id="profile-tab">
          <TransferHistory authToken={authToken} />
        </div>
        <div className={`tab-content ${activeTab === 'transfer' ? 'active' : ''}`} id="transfer-tab">
          <TransferForm authToken={authToken} setActiveTab={setActiveTab} />
        </div>
        <div className={`tab-content ${activeTab === 'receipt' ? 'active' : ''}`} id="receipt-tab">
          <Receipt authToken={authToken} setActiveTab={setActiveTab} />
        </div>
      </div>
      <footer className="footer">
        <p>© 2025 PetwiseWallet - Billetera Virtual Kawaii</p>
        <div className="footer-links">
          <a href="javascript:void(0)" className="footer-link">
            <i className="fas fa-globe"></i> Demo en Vivo
          </a>
          <a href="https://github.com/GuadaEzenga/BilleteraVirtual" className="footer-link">
            <i className="fab fa-github"></i> GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;