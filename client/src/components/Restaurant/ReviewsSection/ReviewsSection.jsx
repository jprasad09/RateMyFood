import React from "react";
import styles from "./reviewsSection.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSingleReviewById } from "../../../redux/actions/review.action";
import { baseURL } from "../../../App";
import LikeDislike from "../../Review/LikeDislike/LikeDislike";

const ReviewsSection = ({ user, reviews }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getReview = (review_id) => {
    dispatch(getSingleReviewById(review_id));
    navigate(`/review/${review_id}`);
  };

  return (
    <section className={styles.reviewSectionContainer}>
      <h3>Reviews</h3>
      <div className={styles.reviewsContainer}>
        {reviews && reviews.length
          ? reviews.map((review, id) => {
              return (
                <div className={styles.singleReviewContainer} key={review?._id}>
                  <div
                    onClick={() => getReview(review._id)}
                    className={styles.reviewCreatorDetailsContainer}
                  >
                    {review?.user_id?.profileImage ? (
                      <span className={styles.reviewCreatorImgContainer}>
                        <img
                          src={`${baseURL}${review?.user_id?.profileImage}`}
                          alt="ProfileImage"
                        />
                      </span>
                    ) : (
                      <span className={styles.reviewCreatorNotImgContainer}>
                        {review?.user_id?.name?.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    <span className={styles.reviewCreatorName}>
                      {review?.user_id?.username}
                    </span>
                  </div>
                  <div className={styles.reviewSectionReviewAndRatingContainer}>
                    <p>{review?.review}</p>
                    <span>Rating - {review?.rating}</span>
                  </div>
                  <div>
                    <LikeDislike
                      review
                      review_id={review?._id}
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

export default ReviewsSection;
