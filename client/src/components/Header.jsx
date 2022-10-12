import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div>LOGO</div>

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