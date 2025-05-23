import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function LoginPage({ setAuthToken }) {
  const navigate = useNavigate();

const handleSubmit = async (credentials) => {
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (response.ok) {
            setAuthToken(data.token);
            navigate('/main');
        } else {
            alert(data.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        alert('Error de conexión con el servidor');
    }
};

  return (
    <div className="login-container">
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default LoginPage;