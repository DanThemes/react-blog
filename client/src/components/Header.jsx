import React from 'react'
import { useContext } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { ACTIONS } from '../context/Actions'
import { AuthContext } from '../context/AuthContext'

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = e => {
    e.preventDefault();

    dispatch({ type: ACTIONS.LOG_OUT });
  }

  return (
    <header>
      <div>LOGO</div>
      {console.log(user)}
      <nav>
        <NavLink end to="/">Home</NavLink>
        <NavLink to="/articles">Articles</NavLink>
      </nav>

      {user ? (
        <div className="header-user">
          <span>Welcome, {user.username}.</span>
          <nav>
            <a href="#" className="highlight" onClick={handleLogout}>Logout</a>
          </nav>
        </div>
      ) : (
        <nav>
          <div className="header-auth">
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header