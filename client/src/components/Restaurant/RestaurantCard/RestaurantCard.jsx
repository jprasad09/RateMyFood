import React from 'react'
import styles from './restaurantCard.module.css'
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
          <img src={restaurant?.images[0]} alt="RestaurantImg" className={styles.restaurantCardImg}/>
      </div>

      <div className={styles.restaurantCardContentSection}>
        <div className={styles.nameAndAddSection}>
          <h3>{restaurant?.name}</h3>
          <p>{restaurant?.address}</p>
        </div>
        <div className={styles.cuisineAndRatingSection}>
          <div className={styles.cuisine}>
            {
              restaurant?.cuisine.map((item, index) => {return(
                <span key={index}>{item}</span>
              )})
            }
          </div>
            <span className={styles.rating}>{restaurant?.average_rating.toFixed(1)}</span>
        </div>
      </div>

  </div>
  )
}

export default RestaurantCard