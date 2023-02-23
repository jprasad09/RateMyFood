import React, { useState } from 'react'
import styles from './reviewInfoSection.module.css'
import axios from '../../../api/axios'
import { useDispatch } from 'react-redux'
import { getCommentsByReviewId } from '../../../redux/actions/comment.action'
import { baseURL } from '../../../App'

const CommentsSection = ({ user, review_id, review }) => {

    const [ value, setValue ] = useState('')

    const dispatch = useDispatch()

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

            dispatch(getCommentsByReviewId(review_id))
      
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
            <div className={styles.reviewImgContainer}>
                {review.images && review?.images.map((img, id) => { return(
                  <img key={id} src={`${baseURL}${review?.images[id]}`} alt="ReviewImg" className={styles.reviewImg}/>
                )})
                }
            </div>
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