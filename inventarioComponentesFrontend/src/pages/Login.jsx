import { useState } from 'react';
import { login } from '../data/apiUsuarios';
import { useNavigate } from "react-router-dom"
import '../css/login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usuario, setUsuario] = useState(null);
  const navigator = useNavigate();

  const handleLogin = async () => {
    const credentials = { username, password };
    const result = await login(credentials);

    if (result.success) {
      alert('Inicio de sesión exitoso');
      setUsuario(result.data);
      // Redirigimos dependiendo el rol de usuario
      navigator('/perfil', { state: { usuario: result.data } });
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="bg">
      <div className="container">
        <h1>Bienvenido a SGI Components</h1>
        <h2>Iniciar sesión</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Ingresar</button>
      </div>
    </div>
  );
}

