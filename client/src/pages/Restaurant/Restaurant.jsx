import React, { useState, useEffect} from 'react'
import styles from './restaurant.module.css'
import axios from '../../api/axios'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Home/Navbar/Navbar'
import Cookies from 'universal-cookie'
import { getSingleRestaurantById } from '../../redux/actions/restaurant.action'
import { useDispatch, useSelector } from 'react-redux'
import RestaurantInfoSection from '../../components/Restaurant/RestaurantInfoSection/RestaurantInfoSection'
import ReviewsSection from '../../components/Restaurant/ReviewsSection/ReviewsSection'
import ReviewFormModal from '../../components/Review/ReviewFormModal/ReviewFormModal'
import { getReviewsByRestaurantId } from '../../redux/actions/review.action'

const Restaurant = () => {

  const [ user, setUser ] = useState({})
  const restaurant = useSelector(state => state.restaurant.singleRestaurantById)
  const showModal = useSelector(state => state.review.showReviewFormModal)
  const reviews = useSelector(state => state.review.reviewsByRestaurantId)

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
    dispatch(getReviewsByRestaurantId(id))
  }, [])

  return (
    <>{showModal ? <ReviewFormModal user={user} restaurant={restaurant}/> :
      <>
        <Navbar user={user}/>
        <main className={styles.restaurantPageContainer}>
          <RestaurantInfoSection user={user} restaurant={restaurant}/>
          <ReviewsSection reviews={reviews} user={user}/>
        </main>
      </>
      }
    </>
  )
}

export default Restaurant