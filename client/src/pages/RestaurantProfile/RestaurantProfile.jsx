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
      <h1>Want to delete your restaurant profile?</h1>
      <button onClick={handleDeleteRestaurant}>DELETE</button>
    </section>
  );
};

export default RestaurantProfile;
