import { reviewConstants } from '../constants'
import axios from '../../api/axios'

export const openReviewFormModal = () => {
    return {
      type: reviewConstants.OPEN_REVIEW_FORM_MODAL,
    }
}

export const closeReviewFormModal = () => {
    return {
      type: reviewConstants.CLOSE_REVIEW_FORM_MODAL,
    }
}

export const getReviewsByRestaurantId = (reqData) => {
  return async dispatch => {

    dispatch({ type: reviewConstants.GET_REVIEWS_BY_RESTAURANT_ID_REQUEST });

    try {

      const response = await axios.get(`/reviews/restaurant/${reqData}`, 
          {
              headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json' },
          })
          
      dispatch({
          type: reviewConstants.GET_REVIEWS_BY_RESTAURANT_ID_SUCCESS,
          payload: response.data 
      })

    } catch (error) {

        dispatch({
            type: reviewConstants.GET_REVIEWS_BY_RESTAURANT_ID_FAILURE,
            payload: error 
        });
    }

  }
}

export const getSingleReviewById = (reqData) => {
  return async dispatch => {

    dispatch({ type: reviewConstants.GET_SINGLE_REVIEW_BY_ID_REQUEST });

    try {

      const response = await axios.get(`/reviews/${reqData}`, 
          {
              headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json' },
          })
      
      dispatch({
          type: reviewConstants.GET_SINGLE_REVIEW_BY_ID_SUCCESS,
          payload: response.data 
      })

    } catch (error) {

        dispatch({
            type: reviewConstants.GET_SINGLE_REVIEW_BY_ID_FAILURE,
            payload: error 
        });
    }

  }
}
