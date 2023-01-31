import React from "react"
import styles from "./navbar.module.css"
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const user = null

  return (
    <nav className={styles.navContainer}>
      <h1 className={styles.navTitle}><NavLink to="/">RateMyFood.</NavLink></h1>
      {user ? (
        <div>{user}</div>
      ):<NavLink to="/login">
        <button>Login</button>
      </NavLink>}
    </nav>
  );
};

export default Navbar
