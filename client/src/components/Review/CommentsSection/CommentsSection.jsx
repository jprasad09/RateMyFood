import React from 'react'
import styles from './commentsSection.module.css'

const CommentsSection = ({ comments }) => {
  return (
    <section className={styles.commentsSectionContainer}>
      <h3>Comments</h3>
      <div className={styles.commentsContainer}>
        {comments && comments.length ? 
          comments.map((comment, id) => {
            return(
              <div className={styles.singleCommentContainer} key={comment?._id}>
                <span className={styles.commentCreator}>{comment?.user_id?.username}</span>
                <div className={styles.commentData}>
                  <p>{comment?.comment}</p>
                </div>
              </div>
            )
          }) : null
        }
      </div>
    </section>
  )
}

export default CommentsSection