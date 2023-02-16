import { commentConstants } from '../constants'
import axios from '../../api/axios'

export const getCommentsByReviewId = (reqData) => {
    return async dispatch => {
  
      dispatch({ type: commentConstants.GET_COMMENTS_BY_REVIEW_ID_REQUEST });
  
      try {
  
        const response = await axios.get(`/comments/review/${reqData}`, 
            {
                headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json' },
            })
            
        dispatch({
            type: commentConstants.GET_COMMENTS_BY_REVIEW_ID_SUCCESS,
            payload: response.data 
        })
  
      } catch (error) {
  
          dispatch({
              type: commentConstants.GET_COMMENTS_BY_REVIEW_ID_FAILURE,
              payload: error 
          });
      }
  
    }
  }
  