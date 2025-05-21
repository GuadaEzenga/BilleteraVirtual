import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTransferById } from '../services/api';
import '../styles/Receipt.css';

const Receipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transfer, setTransfer] = useState(null);

  useEffect(() => {
    const fetchTransfer = async () => {
      try {
        const data = await getTransferById(id);
        setTransfer(data);
      } catch (err) {
        console.error('Error fetching transfer:', err);
      }
    };
    fetchTransfer();
  }, [id]);

  if (!transfer) return <div className="receipt-container">Cargando...</div>;

  return (
    <div className="receipt-container">
      <h1>Comprobante de Transferencia</h1>
      <div className="receipt-details">
        <p><strong>ID:</strong> {transfer._id}</p>
        <p><strong>Fecha:</strong> {new Date(transfer.date).toLocaleDateString()}</p>
        <p><strong>Monto:</strong> {transfer.amount}</p>
        <p><strong>Destinatario:</strong> {transfer.recipient}</p>
      </div>
      <div className="receipt-buttons">
        <button
          onClick={() => navigate('/transfer')}
          className="nav-button"
        >
          Volver a Transferencias
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="nav-button"
        >
          Volver al Perfil
        </button>
      </div>
    </div>
  );
};
export default Receipt;