import React from 'react'
import "./nav.css"
import logo from "../assets/logo.png"
import { NavLink } from "react-router" // useNavigate ki zaroorat nahi hai yahan
import { useLocation } from "react-router"

const Nav = () => { // Capital 'N'
  const location = useLocation()
  const isLoginPage = location.pathname === '/Login'

  return (
    // Direct nav par class lagaiye, extra div ki zaroorat nahi
    <nav className={isLoginPage ? "nav nav--login" : "nav"}>
      <div className="nav-brand">
        <img src={logo} alt="logo" />
        <h2>Dynamic Mail Transmission System</h2>
      </div>
      <div className="nav-links">
        <NavLink to='/Login' className="nav-link">Login</NavLink>
        <NavLink to='/Register' className="nav-link">Register</NavLink>
      </div>
    </nav>
  )
}

export default Nav