import React, { useState, useEffect } from 'react';
import panda from '../assets/panda.png';

function TransferHistory({ authToken }) {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransfers = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/historial', {
          headers: { 'Authorization': `Bearer ${authToken}` },
        });
        if (!response.ok) {
          throw new Error('Error al obtener las transferencias');
        }
        const data = await response.json();
        // Asegúrate de que data sea un array
        setTransfers(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.message);
        setTransfers([]);
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchTransfers();
    } else {
      setLoading(false);
    }
  }, [authToken]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Cargando tu historial de transferencias...</p>
        <div className="mt-4">
          <img src={panda} alt="Panda esperando" className="w-20 h-20 mx-auto animate-bounce" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (transfers.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No tienes transferencias realizadas aún.</p>
        <div className="mt-4">
          <img src="/dog.png" alt="Perrito triste" className="w-20 h-20 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="transfer-history">
      <h2 className="text-2xl font-bold mb-4">Historial de Transferencias</h2>
      {[...transfers]  // Crea una copia del array para evitar mutar el estado original
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(transfer => (
          <div key={transfer.id} className="transfer-item">
            <div className="transfer-icon">
              <i className="fas fa-paw"></i>
            </div>
            <div className="transfer-details">
              <div className="flex justify-between mb-1">
                <span className="transfer-recipient">{transfer.recipient.name}</span>
                <span className="transfer-amount">${parseFloat(transfer.amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="transfer-date">{formatDate(transfer.date)}</span>
                <div>
                  <span className="badge badge-primary">Enviado</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TransferHistory;