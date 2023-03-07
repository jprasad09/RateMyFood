import React, { useState, useEffect, useCallback } from "react";
import styles from "./restaurantInfoSection.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openReviewFormModal } from "../../../redux/actions/review.action";
import axios from "../../../api/axios";
import PacmanLoader from "react-spinners/PacmanLoader";

const RestaurantInfoSection = ({ user, restaurant }) => {

  const singleRestaurantByIdLoading = useSelector(
    (state) => state.restaurant.singleRestaurantByIdLoading
  );

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  let variables;
  if (user && restaurant) {
    variables = {
      user_id: user?._id,
      restaurant_id: restaurant?._id,
    };
  }
  const dispatch = useDispatch();

  const onClickFavorite = () => {
    if (Favorited) {
      //when we are already subscribed
      axios.post("favorite/removeFromFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert("Failed to Remove From Favorite");
        }
      });
    } else {
      // when we are not subscribed yet
      axios.post("favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Failed to Add To Favorite");
        }
      });
    }
  };

  const fetchFavoriteNumber = useCallback(() => {
    const variable = {
      user_id: user?._id,
      restaurant_id: restaurant?._id,
    };

    axios.post("favorite/favoriteNumber", variable).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.subscribeNumber);
      } else {
        alert("Failed to get favoriteNumber");
      }
      setLoading(false);
    });
  }, [user, restaurant]);

  const fetchFavorited = useCallback(() => {
    const variable = {
      user_id: user?._id,
      restaurant_id: restaurant?._id,
    };

    axios.post("favorite/favorited", variable).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.subcribed);
      } else {
        alert("Failed to get Favorite Info");
      }
      setLoading(false);
    });
  }, [user, restaurant]);

  useEffect(() => {
    if (!user?._id || !restaurant?._id) {
      // If user or restaurant is not defined, don't make API calls
      return;
    }

    setLoading(true);
    fetchFavoriteNumber();
    fetchFavorited();
  }, [user, restaurant, fetchFavoriteNumber, fetchFavorited]);

  return (
    <section className={styles.restaurantInfoSectionContainer}>
      {singleRestaurantByIdLoading ? (
        <div style={{ display: "flex", alignSelf: "center", marginTop: "20px" }}>
          <PacmanLoader
            color="#36d7b7"
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : null}
      <div className={styles.restaurantImgContainer}>
        {restaurant.images && (
          <img
            src={restaurant?.images[0]}
            alt="RestaurantImg"
            className={styles.restaurantImg}
          />
        )}
      </div>
      <div className={styles.restaurantInfoContainer}>
        <div className={styles.restaurantInfo}>
          <h1>{restaurant?.name}</h1>
          <p>{restaurant?.address}</p>
          <div className={styles.cuisine}>
            {restaurant.cuisine &&
              restaurant?.cuisine.map((item, index) => {
                return <span key={index}>{item}</span>;
              })}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={onClickFavorite} className={styles.AddToFavBtn}>
            {Favorited ? " remove from Favorite " : " Add to Favorite "}
            {FavoriteNumber}
          </button>
          <button
            onClick={() => dispatch(openReviewFormModal())}
            className={styles.AddReviewBtn}
          >
            Add Review
          </button>
        </div>
      </div>
    </section>
  );
};

export default RestaurantInfoSection;
