import React from "react";
import styles from "./commentsSection.module.css";
import LikeDislike from "../LikeDislike/LikeDislike";
import { useSelector } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";

const CommentsSection = ({ user, comments }) => {
  const commentsByReviewIdLoading = useSelector(
    (state) => state.comment.commentsByReviewIdLoading
  );

  return (
    <section className={styles.commentsSectionContainer}>
      <h3>Comments</h3>
      {commentsByReviewIdLoading ? (
        <SyncLoader
          color="#36d7b7"
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : null}
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
                          src={comment?.user_id?.profileImage}
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
          : <span>No comments to show</span>}
      </div>
    </section>
  );
};

export default CommentsSection;
