import React, { useState, useEffect } from 'react';
import cat from '../assets/cat.png'; // Asegúrate de que esta imagen exista

function Receipt({ authToken }) {
  const [transfer, setTransfer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastTransfer = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/historial/last', {
          headers: { 'Authorization': `Bearer ${authToken}` },
        });
        if (!response.ok) {
          throw new Error('Error al obtener la última transferencia');
        }
        const data = await response.json();
        setTransfer(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchLastTransfer();
    } else {
      setLoading(false);
    }
  }, [authToken]);

  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return 'Fecha no disponible';
    }
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
        <p className="text-gray-500">Cargando recibo...</p>
        <div className="mt-4">
          <img src={cat} alt="Gato esperando" className="w-20 h-20 mx-auto animate-bounce" />
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

  if (!transfer || Object.keys(transfer).length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No hay transferencias recientes.</p>
        <div className="mt-4">
          <img src={cat} alt="Gato triste" className="w-20 h-20 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="receipt">
      <h2 className="text-2xl font-bold mb-4">Recibo de Transferencia</h2>
      <div className="receipt-item">
        <div className="receipt-icon">
          <i className="fas fa-cat"></i>
        </div>
        <div className="receipt-details">
          <div className="flex justify-between mb-1">
            <span className="receipt-recipient">Enviado a: {transfer.recipient.name}</span>
            <span className="receipt-amount">${parseFloat(transfer.amount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="receipt-date">Fecha: {formatDate(transfer.date)}</span>
            <span className="receipt-note">Nota: {transfer.note || 'Sin nota'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;