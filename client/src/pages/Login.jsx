import React, { useContext, useState } from 'react'
import axios from 'axios';
import { ACTIONS } from '../context/Actions';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  
  // Logged in users don't have access to this page
  if (user) return <Navigate to="/" replace />

  const handleSubmit = async e => {
    e.preventDefault();
    setError(false);

    if (!username) return setError('Enter a username.');
    if (!password) return setError('Enter a password.');

    try {
      const login = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password
      });

      dispatch({ type: ACTIONS.LOG_IN, payload: login.data });
      navigate('/');
    } catch (err) {
      setError(err.response.data)
    }
  }

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          name="username"
          value={username} 
          onChange={e => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          name="password"
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <button>Log in</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  )
}

export default Login