import React from 'react'
import styles from './reviewsSection.module.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getSingleReviewById } from '../../../redux/actions/review.action'

const ReviewsSection = ({ user, reviews }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getReview = (review_id) => {
    dispatch(getSingleReviewById(review_id))
    navigate(`/review/${review_id}`)
  }

  return (
    <section className={styles.reviewSectionContainer}>
      <h3>Reviews</h3>
      <div className={styles.reviewsContainer}>
        {reviews && reviews.length ? 
          reviews.map((review, id) => {
            return(
              <div onClick={() => getReview(review._id)} className={styles.singleReviewContainer} key={review?._id}>
                <span className={styles.reviewCreator}>{review?.user_id?.username}</span>
                <div className={styles.reviewSectionReviewAndRatingContainer}>
                  <p>{review?.review}</p>
                  <span>Rating - {review?.rating}</span>
                </div>
              </div>
            )
          }) : null
        }
      </div>
    </section>
  )
}

export default ReviewsSection
