import { reviewConstants } from '../constants'

const initState = {
    showReviewFormModal: false,
    reviewsByRestaurantId: {},
    reviewsByRestaurantIdLoading: false,
    reviewsByRestaurantIdError: null,
    singleReviewById: {},
    singleReviewByIdLoading: false,
    singleReviewByIdError: null
}

export default (state = initState, action) => {
    switch(action.type) {
      case reviewConstants.OPEN_REVIEW_FORM_MODAL:
        state = {...state, showReviewFormModal: true }
        break
       
      case reviewConstants.CLOSE_REVIEW_FORM_MODAL:
        state = {...state, showReviewFormModal: false }
        break

      case reviewConstants.GET_REVIEWS_BY_RESTAURANT_ID_REQUEST:
        state = {
            ...initState,
            reviewsByRestaurantIdLoading: true
        }
        break;

      case reviewConstants.GET_REVIEWS_BY_RESTAURANT_ID_SUCCESS:
          state = {
              ...state,
              reviewsByRestaurantId: action.payload,
              reviewsByRestaurantIdLoading: false
          }
          break;

      case reviewConstants.GET_REVIEWS_BY_RESTAURANT_ID_FAILURE:
          state = {
              ...initState,
              reviewsByRestaurantIdLoading: false,
              reviewsByRestaurantIdError: action.payload
          }
          break;

      case reviewConstants.GET_SINGLE_REVIEW_BY_ID_REQUEST:
        state = {
            ...initState,
            singleReviewByIdLoading: true
        }
        break;

      case reviewConstants.GET_SINGLE_REVIEW_BY_ID_SUCCESS:
          state = {
              ...state,
              singleReviewById: action.payload,
              singleReviewByIdLoading: false
          }
          break;

      case reviewConstants.GET_SINGLE_REVIEW_BY_ID_FAILURE:
          state = {
              ...initState,
              singleReviewByIdLoading: false,
              singleReviewByIdError: action.payload
          }
          break;


      default:
        break
    }
    return state
}