import React from 'react'
import styles from './restaurantCard.module.css'
import RestaurantImg from '../../../images/restaurant.jpg'
import { getSingleRestaurantById } from '../../../redux/actions/restaurant.action'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RestaurantCard = ({ restaurant }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getRestaurant = () => {
    dispatch(getSingleRestaurantById(restaurant._id))
    navigate(`/restaurant/${restaurant._id}`)
  }

  return (
    <div onClick={getRestaurant} className={styles.restaurantCardContainer}>

      <div className={styles.restaurantCardImgSection}>
          <img src={RestaurantImg} alt="RestaurantImg" className={styles.restaurantCardImg}/>
      </div>

      <div className={styles.restaurantCardContentSection}>
        <div className={styles.nameAndAddSection}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.address}</p>
        </div>
        <div className={styles.cuisineAndRatingSection}>
            <span className={styles.cuisine}>Indian</span>
            <span className={styles.rating}>4.3</span>
        </div>
      </div>

  </div>
  )
}

export default RestaurantCard