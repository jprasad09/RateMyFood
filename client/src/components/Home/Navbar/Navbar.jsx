import React, { useState, useEffect } from "react"
import styles from "./navbar.module.css"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from '../../../api/axios'
import Cookies from 'universal-cookie'

const Navbar = ({ user }) => {

  const [ access, setAccess ] = useState(false)

  const cookies = new Cookies()

  useEffect(() => {
    const isCookieExist = cookies.get('token')
    if(isCookieExist) setAccess(true)
  }, [])

  const navigate = useNavigate()

  const logout = async() => {
    try{
      const response = await axios.get('/auth/signout', 
        {
          headers: { 
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          },
          withCredentials: true
        })
      
      navigate('/signin')

      if(response.status !== 200){
        const error = new Error(response.error)
        throw error 
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <nav className={styles.navContainer}>
      <h1 className={styles.navTitle}><NavLink to="/">RateMyFood.</NavLink></h1>
      {access ? <>
        <div>
          <span>{user?.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </>:<>
        <NavLink to="/signin">
          <button>Login</button>
        </NavLink>
      </>}
    </nav>
  );
};



export default Navbar
