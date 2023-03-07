import React, { useState, useEffect } from "react";
import styles from "./restaurantProfile.module.css";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const RestaurantProfile = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const [ restaurant, setRestaurant ] = useState({})

  const navigate = useNavigate();

  const callRestaurantProfilePage = async () => {
    try {
      const response = await axios.get("/auth/restaurantprofile", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        const error = new Error(response.error);
        throw error;
      }

      setRestaurant(response.data)
    } catch (error) {
      navigate("/signin");
    }
  };

  useEffect(() => {
    callRestaurantProfilePage();
  }, []);

  const handleDeleteRestaurant = async() => {
    try {
        const response = await axios.delete(`/restaurants/${restaurant?._id}`);
  
        if (response.status === 200) {
          alert("Restaurant Deleted Successfully")
          cookies.remove('token')
          navigate("/register/restaurant")
        }
      } catch (error) {
        alert("Error")
    }
  
  }

  return (
    <section className={styles.restaurantProfileContainer}>
      <div className={styles.restaurantInfoContainer}>
        <h3>Restaurant Basic Info:</h3>
        <p>Name - {restaurant?.name}</p>
        <p>Email - {restaurant?.email}</p>
        <p>Phone - {restaurant?.phone_no}</p>
        <p>Address - {restaurant?.address}</p>
        <p>
          Cuisine - 
          {restaurant.cuisine &&
            restaurant?.cuisine.map((item, index) => {
              return <span key={index}> {item}</span>;
            })}
        </p>
      </div>
      <div className={styles.restaurantDeleteContainer}>
        <h1>Want to delete your restaurant profile?</h1>
        <button onClick={handleDeleteRestaurant}>DELETE</button>
      </div>
    </section>
  );
};

export default RestaurantProfile;
