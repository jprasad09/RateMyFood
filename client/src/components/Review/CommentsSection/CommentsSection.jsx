import React from "react";
import styles from "./commentsSection.module.css";
import { baseURL } from "../../../App";
import LikeDislike from "../LikeDislike/LikeDislike";

const CommentsSection = ({ user, comments }) => {
  return (
    <section className={styles.commentsSectionContainer}>
      <h3>Comments</h3>
      <div className={styles.commentsContainer}>
        {comments && comments.length
          ? comments.map((comment, id) => {
              return (
                <div
                  className={styles.singleCommentContainer}
                  key={comment?._id}
                >
                  <div className={styles.commentCreatorDetailsContainer}>
                    {comment?.user_id?.profileImage ? (
                      <span className={styles.commentCreatorImgContainer}>
                        <img
                          src={`${baseURL}${comment?.user_id?.profileImage}`}
                          alt="ProfileImage"
                        />
                      </span>
                    ) : (
                      <span className={styles.commentCreatorNotImgContainer}>
                        {comment?.user_id?.name?.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    <span className={styles.commentCreatorName}>
                      {comment?.user_id?.username}
                    </span>
                  </div>
                  <div className={styles.commentData}>
                    <p>{comment?.comment}</p>
                  </div>
                  <div>
                    <LikeDislike
                      comment
                      comment_id={comment?._id}
                      user_id={user?._id}
                    />
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
};

export default CommentsSection;
