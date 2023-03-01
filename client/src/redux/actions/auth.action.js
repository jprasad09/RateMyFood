import { authConstants } from '../constants'
import axios from '../../api/axios'

export const getUserOrRestaurantData = (data) => {
    return {
      type: authConstants.GET_USER_OR_RESTAURANT_DATA,
      payload: data
    }
}

export const getSingleUserById = (reqData) => {
  return async dispatch => {

    dispatch({ type: authConstants.GET_SINGLE_USER_BY_ID_REQUEST });

    try {

      const response = await axios.get(`/users/${reqData}`, 
          {
              headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json' },
          })
      
      dispatch({
          type: authConstants.GET_SINGLE_USER_BY_ID_SUCCESS,
          payload: response.data 
      })

    } catch (error) {

        dispatch({
            type: authConstants.GET_SINGLE_USER_BY_ID_FAILURE,
            payload: error 
        });
    }

  }
}
