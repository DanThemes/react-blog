import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  // Logged in users don't have access to this page
  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const register = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        email,
        password
      });
      console.log(register.data)

      navigate('/login');
    } catch (err) {
      console.log(err.response.data)
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
          type="email" 
          placeholder="Email" 
          name="email"
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          name="password"
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register