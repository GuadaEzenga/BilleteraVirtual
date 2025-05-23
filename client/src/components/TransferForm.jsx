import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';

function TransferForm({ authToken, setActiveTab }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({ recipient: false, amount: false });
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleRecipientSearch = async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setRecipient(searchTerm);
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios?search=${encodeURIComponent(searchTerm)}`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const data = await response.json();
      setRecipients(data);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error fetching recipients:', error);
    }
  };

  const handleSelectRecipient = (recipient) => {
    setSelectedRecipient(recipient);
    setRecipient(recipient.name);
    setShowDropdown(false);
    setErrors({ ...errors, recipient: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { recipient: false, amount: false };

    if (!selectedRecipient) {
      newErrors.recipient = true;
      isValid = false;
    }
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = true;
      isValid = false;
    }

    setErrors(newErrors);
    if (isValid) setShowModal(true);
  };

  const handleConfirmTransfer = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transferencias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          recipientId: selectedRecipient.id,
          amount: parseFloat(amount),
          note,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setRecipient('');
        setAmount('');
        setNote('');
        setSelectedRecipient(null);
        setShowModal(false);
        setActiveTab('receipt');
      } else {
        alert(data.message || 'Error al realizar la transferencia');
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Realizar Transferencia</h2>
      <form className="transfer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipient" className="form-label">Destinatario</label>
          <div className="dropdown" ref={dropdownRef}>
            <input
              type="text"
              id="recipient"
              className="form-control"
              placeholder="Buscar destinatario..."
              value={recipient}
              onChange={handleRecipientSearch}
            />
            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
              {recipients.length === 0 ? (
                <div className="p-3 text-gray-500 text-center">No se encontraron resultados</div>
              ) : (
                recipients.map(r => (
                  <div
                    key={r.id}
                    className="dropdown-item"
                    onClick={() => handleSelectRecipient(r)}
                  >
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-sm text-gray-500">{r.email}</div>
                  </div>
                ))
              )}
            </div>
          </div>
          {errors.recipient && (
            <div className="form-error">
              <i className="fas fa-exclamation-circle"></i> Por favor selecciona un destinatario
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="form-label">Monto a transferir</label>
          <input
            type="number"
            id="amount"
            className="form-control"
            placeholder="$0.00"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errors.amount && (
            <div className="form-error">
              <i className="fas fa-exclamation-circle"></i> El monto debe ser mayor a cero
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="note" className="form-label">Nota (opcional)</label>
          <textarea
            id="note"
            className="form-control"
            placeholder="Añade un mensaje..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          <i className="fas fa-paper-plane"></i> Enviar Transferencia
        </button>
      </form>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmTransfer}
        recipient={selectedRecipient?.name}
        amount={amount}
      />
    </>
  );
}

export default TransferForm;