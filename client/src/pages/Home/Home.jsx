import React, { useState, useEffect } from 'react'
import styles from "./home.module.css"
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import Navbar from '../../components/Home/Navbar/Navbar'
import Cookies from 'universal-cookie'
import SearchBar from '../../components/Home/SearchBar/SearchBar'
import { useSelector } from 'react-redux'
import RestaurantCard from '../../components/Restaurant/RestaurantCard/RestaurantCard'

const Home = () => {
  
  const [ access, setAccess ] = useState(false)
  const [ user, setUser ] = useState({})

  const restaurantsAfterSearch = useSelector(state => state.restaurant.restaurantsAfterSearch)

  const cookies = new Cookies()
  const token = cookies.get('token')

  const callHomePage = async() => {
    try{
      const response = await axios.get('/auth/', 
        {
          headers: { 
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          }
        })

      setAccess(true)
      setUser(response.data)

      if(response.status !== 200){
        const error = new Error(response.error)
        throw error 
      }
    }catch(error){
      setAccess(false)
    }
  }

  useEffect(() => {
    callHomePage()
  }, [])

  return (
    <>
      <Navbar user={user}/>
      <section className={styles.secContainer}>
        {access? 
        <>
          <SearchBar />
          {restaurantsAfterSearch && restaurantsAfterSearch.length ? 
            <div className={styles.restaurantsAfterSearchContainer}>
              {
                restaurantsAfterSearch.map((restaurant, k) => {
                    return (
                      <RestaurantCard key={restaurant._id} restaurant={restaurant}/>
                    )
                })
              }
            </div> : <p>No Such Restaurants</p>
          }
        </>:      
        <>
          <h1>Foodies Welcome Here.</h1>
          <div className={styles.buttonContainer}>
            <Link to="/register/user">     
              <button>Register as User</button>
            </Link>
            <Link to="/register/restaurant">
              <button>Register as Restaurant</button>
            </Link>
          </div>
        </>
        }
      </section>
    </>
  )
}

export default Home