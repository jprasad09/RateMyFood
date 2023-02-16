import { commentConstants } from '../constants'

const initState = {
    commentsByReviewId: {},
    commentsByReviewIdLoading: false,
    commentsByReviewIdError: null
}

export default (state = initState, action) => {
    switch(action.type) {
      case commentConstants.GET_COMMENTS_BY_REVIEW_ID_REQUEST:
        state = {
            ...initState,
            commentsByReviewIdLoading: true
        }
        break;

      case commentConstants.GET_COMMENTS_BY_REVIEW_ID_SUCCESS:
          state = {
              ...state,
              commentsByReviewId: action.payload,
              commentsByReviewIdLoading: false
          }
          break;

      case commentConstants.GET_COMMENTS_BY_REVIEW_ID_FAILURE:
          state = {
              ...initState,
              commentsByReviewIdLoading: false,
              commentsByReviewIdError: action.payload
          }
          break;

      default:
        break
    }
    return state
}