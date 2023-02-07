import { restaurantConstants } from "../constants"
import axios from "../../api/axios";

export const getRestaurantsAfterSearch = (reqData) => {
    return async dispatch => {
  
      dispatch({ type: restaurantConstants.GET_RESTAURANTS_AFTER_SEARCH_REQUEST });
  
      try {
  
        const response = await axios.get('/restaurants', 
            JSON.stringify(),
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
  