import React from "react";
import styles from "./reviewsSection.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSingleReviewById } from "../../../redux/actions/review.action";
import LikeDislike from "../../Review/LikeDislike/LikeDislike";
import SyncLoader from "react-spinners/SyncLoader";

const ReviewsSection = ({ user, reviews }) => {

  const reviewsByRestaurantIdLoading = useSelector(
    (state) => state.review.reviewsByRestaurantIdLoading
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getReview = (review_id) => {
    dispatch(getSingleReviewById(review_id));
    navigate(`/review/${review_id}`);
  };

  return (
    <section className={styles.reviewSectionContainer}>
      <h3>Reviews</h3>
      {reviewsByRestaurantIdLoading ? (
        <SyncLoader
          color="#36d7b7"
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : null}
      <div className={styles.reviewsContainer}>
        {reviews && reviews.length ? (
          reviews.map((review, id) => {
            return (
              <div className={styles.singleReviewContainer} key={review?._id}>
                <div
                  onClick={() => getReview(review._id)}
                  className={styles.reviewCreatorDetailsContainer}
                >
                  {review?.user_id?.profileImage ? (
                    <span className={styles.reviewCreatorImgContainer}>
                      <img
                        src={review?.user_id?.profileImage}
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
        ) : (
          <span>No reviews to show</span>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
