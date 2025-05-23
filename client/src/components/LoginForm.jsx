import React, { useState } from 'react';

function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: false, password: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { username: false, password: false };

    if (!username.trim()) {
      newErrors.username = true;
      isValid = false;
    }
    if (!password.trim()) {
      newErrors.password = true;
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid && onSubmit) {
      onSubmit({ username, password });
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-title">Bienvenido a PetwiseWallet</h2>
      <div className="form-group">
        <label htmlFor="username" className="form-label">Usuario</label>
        <input
          type="text"
          id="username"
          className="form-control"
          placeholder="Ingresa tu usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && (
          <div className="form-error">
            <i className="fas fa-exclamation-circle"></i> Por favor ingresa un usuario
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <div className="form-error">
            <i className="fas fa-exclamation-circle"></i> Por favor ingresa una contraseña
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
      </button>
    </form>
  );
}

export default LoginForm;