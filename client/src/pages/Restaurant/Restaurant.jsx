import React, { useState, useEffect} from 'react'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Home/Navbar/Navbar'
import Cookies from 'universal-cookie'

const Restaurant = () => {

  const [ user, setUser ] = useState({})

  const cookies = new Cookies()
  const token = cookies.get('token')

  const navigate = useNavigate()

  const callRestaurantPage = async() => {
    try{
      const response = await axios.get('/auth/restaurant', 
        {
          headers: { 
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          }
        })

      setUser(response.data)

      if(response.status !== 200){
        const error = new Error(response.error)
        throw error 
      }
    }catch(error){
      navigate('/signin')
    }
  }

  useEffect(() => {
    callRestaurantPage()
  }, [])

  return (
    <>
      <Navbar user={user}/>
      <div>Restaurant</div>
    </>
  )
}

export default Restaurant