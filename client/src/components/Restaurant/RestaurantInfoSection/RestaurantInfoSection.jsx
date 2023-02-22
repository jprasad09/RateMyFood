import React from 'react'
import styles from './restaurantInfoSection.module.css'
import { useDispatch } from 'react-redux'
import { openReviewFormModal } from '../../../redux/actions/review.action'
import { baseURL } from '../../../App'

const RestaurantInfoSection = ({ restaurant }) => {

    const dispatch = useDispatch()

    return (
        <section className={styles.restaurantInfoSectionContainer}>
            <div className={styles.restaurantImgContainer}>
                {restaurant.images && 
                    <img src={`${baseURL}${restaurant?.images[0]}`} alt="RestaurantImg" className={styles.restaurantImg}/>
                }
            </div>
            <div className={styles.restaurantInfoContainer}>
                <div className={styles.restaurantInfo}>
                    <h1>{restaurant?.name}</h1>
                    <p>{restaurant?.address}</p>
                    <div className={styles.cuisine}>
                        {   restaurant.cuisine && 
                            restaurant?.cuisine.map((item, index) => {return(
                                <span key={index}>{item}</span>
                            )})
                        }
                    </div>
                </div>
                <button onClick={() => dispatch(openReviewFormModal())} className={styles.AddReviewBtn}>Add Review</button>
            </div>
        </section>
    )
}

export default RestaurantInfoSection