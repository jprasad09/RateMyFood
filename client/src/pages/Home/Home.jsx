import React from 'react'
import styles from "./home.module.css"
import { Link } from 'react-router-dom'
import Navbar from '../../components/Home/Navbar/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <section className={styles.secContainer}>
        <h1>Foodies Welcome Here.</h1>
        <div className={styles.buttonContainer}>
          <Link to="/register/user">     
            <button>Register as User</button>
          </Link>
          <Link to="/register/restaurant">
            <button>Register as Restaurant</button>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home