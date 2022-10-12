import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const login = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password
      });
      console.log(login.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
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
    </div>
  )
}

export default Login