import React from 'react';

function Modal({ show, onClose, onConfirm, recipient, amount }) {
  if (!show) return null;

  return (
    <div className="modal" style={{ display: show ? 'flex' : 'none' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Confirmar Transferencia</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p>¿Estás seguro que deseas realizar esta transferencia?</p>
          <div className="mt-4">
            <div className="receipt-row">
              <span className="receipt-label">Destinatario:</span>
              <span className="receipt-value">{recipient}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Monto:</span>
              <span className="receipt-value">${parseFloat(amount).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={onConfirm}>
            <span>Confirmar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;