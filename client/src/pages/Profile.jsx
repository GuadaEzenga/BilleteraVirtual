import { useEffect, useState } from 'react';
import { getTransfers } from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const data = await getTransfers();
        setTransfers(data);
      } catch (err) {
        console.error('Error fetching transfers:', err);
      }
    };
    fetchTransfers();
  }, []);

  return (
    <div className="profile-container">
      <h1>Historial de Transferencias</h1>
      <table className="transfers-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Destinatario</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer._id}>
              <td>{new Date(transfer.date).toLocaleDateString()}</td>
              <td>{transfer.amount}</td>
              <td>{transfer.recipient}</td>
              <td>
                <Link to={`/receipt/${transfer._id}`} className="action-link">
                  Ver Comprobante
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/transfer" className="transfer-button">Realizar Transferencia</Link>
    </div>
  );
};
export default Profile;