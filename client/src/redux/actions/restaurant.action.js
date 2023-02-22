import { restaurantConstants } from "../constants"
import axios from "../../api/axios";

export const getRestaurantsAfterSearch = (reqData) => {
    return async dispatch => {
  
      dispatch({ type: restaurantConstants.GET_RESTAURANTS_AFTER_SEARCH_REQUEST });
  
      try {
  
        const response = await axios.post('/restaurants/search',
          JSON.stringify(reqData), 
          {
              headers: { 'Content-Type': 'application/json'},
          })

        dispatch({
            type: restaurantConstants.GET_RESTAURANTS_AFTER_SEARCH_SUCCESS,
            payload: response.data 
        })
  
      } catch (error) {
  
          dispatch({
              type: restaurantConstants.GET_RESTAURANTS_AFTER_SEARCH_FAILURE,
              payload: error 
          });
      }
  
    }
}

export const getSingleRestaurantById = (reqData) => {
  return async dispatch => {

    dispatch({ type: restaurantConstants.GET_SINGLE_RESTAURANT_BY_ID_REQUEST });

    try {

      const response = await axios.get(`/restaurants/${reqData}`, 
          {
              headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json' },
          })
      
      dispatch({
          type: restaurantConstants.GET_SINGLE_RESTAURANT_BY_ID_SUCCESS,
          payload: response.data 
      })

    } catch (error) {

        dispatch({
            type: restaurantConstants.GET_SINGLE_RESTAURANT_BY_ID_FAILURE,
            payload: error 
        });
    }

  }
}

export const getAllRestaurants = (reqData) => {
  return async dispatch => {

    dispatch({ type: restaurantConstants.GET_ALL_RESTAURANTS_REQUEST });

    try {

      const response = await axios.get('/restaurants',
        {
            headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json' },
        })

      dispatch({
          type: restaurantConstants.GET_ALL_RESTAURANTS_SUCCESS,
          payload: response.data 
      })

    } catch (error) {

        dispatch({
            type: restaurantConstants.GET_ALL_RESTAURANTS_FAILURE,
            payload: error 
        });
    }

  }
}

