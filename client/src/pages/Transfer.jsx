import { useState } from 'react';
import { createTransfer, searchUsers } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Transfer.css';

const Transfer = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setError('El monto debe ser mayor a 0');
      return;
    }
    try {
      const transfer = await createTransfer({ amount: parseFloat(amount), recipient });
      setSuccess('Transferencia realizada con éxito');
      setTimeout(() => navigate(`/receipt/${transfer._id}`), 1000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al realizar la transferencia');
    }
  };

  const handleSearch = async (query) => {
    try {
      const users = await searchUsers(query);
      // Aquí podrías mostrar sugerencias (puedes usar react-select para autocompletado)
      console.log('Usuarios encontrados:', users);
    } catch (err) {
      console.error('Error buscando usuarios:', err);
    }
  };

  return (
    <div className="transfer-container">
      <h1>Realizar Transferencia</h1>
      <form onSubmit={handleSubmit} className="transfer-form">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monto"
          className="input-field"
        />
        <input
          type="text"
          value={recipient}
          onChange={(e) => {
            setRecipient(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Destinatario"
          className="input-field"
        />
        <button type="submit" className="submit-button">Transferir</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};
export default Transfer;