import React from 'react';
import hamster from '../assets/hamster.png';

function Header({ onLogout }) {
  return (
    <header className="header">
      <div className="logo">
        <img src={hamster} alt="PetwiseWallet Logo" className="logo-img" />
        <span className="logo-text">PetwiseWallet</span>
      </div>
      <button className="btn btn-secondary" onClick={onLogout}>
        <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
      </button>
    </header>
  );
}

export default Header;