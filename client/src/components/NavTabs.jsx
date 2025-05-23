import React from 'react';

function NavTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'profile', icon: 'fas fa-user', label: 'Perfil' },
    { id: 'transfer', icon: 'fas fa-exchange-alt', label: 'Transferir' },
    { id: 'receipt', icon: 'fas fa-receipt', label: 'Comprobante' },
  ];

  return (
    <div className="nav-tabs">
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <i className={tab.icon}></i> {tab.label}
        </div>
      ))}
    </div>
  );
}

export default NavTabs;