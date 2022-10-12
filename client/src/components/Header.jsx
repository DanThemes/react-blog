import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header>
      <div>LOGO</div>
      {console.log(user)}
      <nav>
        <NavLink end to="/">Home</NavLink>
        <NavLink to="/articles">Articles</NavLink>
      </nav>

      <nav>
        <div className="header-auth">
          <NavLink to="/login">Log in</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header