import React from "react"
import styles from "./navbar.module.css"
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className={styles.navContainer}>
      <h1 className={styles.navTitle}>RateMyFood.</h1>
      <NavLink to="/login">
        <button>Login</button>
      </NavLink>
    </nav>
  );
};

export default Navbar
