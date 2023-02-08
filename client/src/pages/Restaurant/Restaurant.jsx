import React, { useState, useEffect} from 'react'
import axios from '../../api/axios'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Home/Navbar/Navbar'
import Cookies from 'universal-cookie'
import { getSingleRestaurantById } from '../../redux/actions/restaurant.action'
import { useDispatch, useSelector } from 'react-redux'

const Restaurant = () => {

  const [ user, setUser ] = useState({})
  const restaurant = useSelector(state => state.restaurant.singleRestaurantById)

  const cookies = new Cookies()
  const token = cookies.get('token')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

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
    dispatch(getSingleRestaurantById(id))
  }, [])

  return (
    <>
      <Navbar user={user}/>
      <div>{restaurant?.name}</div>
    </>
  )
}

export default Restaurant