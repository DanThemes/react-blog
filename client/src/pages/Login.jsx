import React, { useContext, useState } from 'react'
import axios from 'axios';
import { ACTIONS } from '../context/Actions';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const login = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password
      });

      dispatch({ type: ACTIONS.LOG_IN, payload: login.data });
      localStorage.setItem('user', JSON.stringify(login.data));
      navigate('/');
    } catch (err) {
      setError(err.response.data)
    }

    setIsLoading(false);
  }

  
  return (
    <div>
      {isLoading && <p>Loading ...</p>}

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
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