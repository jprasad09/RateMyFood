import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import Navbar from "../../components/Home/Navbar/Navbar";
import Cookies from "universal-cookie";
import SearchBar from "../../components/Home/SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import RestaurantCard from "../../components/Restaurant/RestaurantCard/RestaurantCard";
import { getAllRestaurants } from "../../redux/actions/restaurant.action";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const [access, setAccess] = useState(false);
  let [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const restaurantsAfterSearch = useSelector(
    (state) => state.restaurant.restaurantsAfterSearch
  );
  const restaurantsAfterSearchLoading = useSelector(
    (state) => state.restaurant.restaurantsAfterSearchLoading
  );
  const allRestaurants = useSelector(
    (state) => state.restaurant.allRestaurants
  );
  const allRestaurantsLoading = useSelector(
    (state) => state.restaurant.allRestaurantsLoading
  );


  const cookies = new Cookies();
  const token = cookies.get("token");

  const dispatch = useDispatch();

  const callHomePage = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/auth/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);

      setAccess(true);
      setUser(response.data);

      if (response.status !== 200) {
        const error = new Error(response.error);
        throw error;
      }
    } catch (error) {
      setLoading(false);
      setAccess(false);
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  return (
    <>
      <Navbar user={user} />
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <ClipLoader
            color="#36d7b7"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <section className={styles.secContainer}>
          {access ? (
            <>
              <SearchBar />
              {restaurantsAfterSearchLoading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <ClipLoader
                    color="#36d7b7"
                    // loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : null}
              {restaurantsAfterSearch && restaurantsAfterSearch.length ? (
                <div className={styles.restaurantsAfterSearchContainer}>
                  {restaurantsAfterSearch.map((restaurant, k) => {
                    return (
                      <RestaurantCard
                        key={restaurant._id}
                        restaurant={restaurant}
                      />
                    );
                  })}
                </div>
              ) : // <p>No Such Restaurants</p>
              null}
              or
              <button
                onClick={() => dispatch(getAllRestaurants())}
                className={styles.allResButton}
              >
                Get All Restaurants
              </button>
              {allRestaurantsLoading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <ClipLoader
                    color="#36d7b7"
                    // loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : null}
              {allRestaurants && allRestaurants.length ? (
                <div className={styles.restaurantsAfterSearchContainer}>
                  {allRestaurants.map((restaurant, k) => {
                    return (
                      <RestaurantCard
                        key={restaurant._id}
                        restaurant={restaurant}
                      />
                    );
                  })}
                </div>
              ) : null}
            </>
          ) : (
            <>
              <h1>Foodies Welcome Here.</h1>
              <div className={styles.buttonContainer}>
                <Link to="/register/user">
                  <button>Register as User</button>
                </Link>
                <Link to="/register/restaurant">
                  <button>Register as Restaurant</button>
                </Link>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default Home;
