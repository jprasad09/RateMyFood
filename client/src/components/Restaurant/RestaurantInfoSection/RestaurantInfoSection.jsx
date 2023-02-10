import React from 'react'
import styles from './restaurantInfoSection.module.css'
import RestaurantImg from '../../../images/restaurant1.jpg'
import { useDispatch } from 'react-redux'
import { openReviewFormModal } from '../../../redux/actions/review.action'

const RestaurantInfoSection = ({ restaurant }) => {

    const dispatch = useDispatch()

    return (
        <section className={styles.restaurantInfoSectionContainer}>
            <div className={styles.restaurantImgContainer}>
                <img src={RestaurantImg} alt="RestaurantImg" className={styles.restaurantImg}/>
            </div>
            <div className={styles.restaurantInfoContainer}>
                <div className={styles.restaurantInfo}>
                    <h1>{restaurant.name}</h1>
                    <p>{restaurant.address}</p>
                </div>
                <button onClick={() => dispatch(openReviewFormModal())} className={styles.AddReviewBtn}>Add Review</button>
            </div>
        </section>
    )
}

export default RestaurantInfoSection