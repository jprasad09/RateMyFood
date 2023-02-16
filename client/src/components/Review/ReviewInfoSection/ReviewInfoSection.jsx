import React, { useState } from 'react'
import styles from './reviewInfoSection.module.css'
import axios from '../../../api/axios'

const CommentsSection = ({ user, review_id, review }) => {

    const [ value, setValue ] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
            const response = await axios.post('/comments', 
              JSON.stringify({
                user_id: user._id,
                review_id,
                comment: value
              }),
              {
                headers: { 'Content-Type': 'application/json'},
              })
            setValue('')
      
            window.alert("Comment Added Successfully")
      
          }catch(error){
            window.alert("Error")
          }
      
    }

  return (
    <section className={styles.reviewInfoSectionContainer}>
        <div className={styles.reviewInfoSectionReview}>
          <span className={styles.reviewInfoSectionReviewCreator}>{review?.user_id?.username}</span>
          <div className={styles.reviewInfoSectionReviewAndRatingContainer}>
            <p>{review?.review}</p>
            <span>Rating - {review?.rating}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.addCommentForm}>
            <input 
                type="text" 
                placeholder='Add a Comment'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button>Submit</button>
        </form>
    </section>
  )
}

export default CommentsSection