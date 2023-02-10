import { reviewConstants } from '../constants'

const initState = {
    showReviewFormModal: false
}

export default (state = initState, action) => {
    switch(action.type) {
      case reviewConstants.OPEN_REVIEW_FORM_MODAL:
        state = {...state, showReviewFormModal: true }
        break
       
      case reviewConstants.CLOSE_REVIEW_FORM_MODAL:
        state = {...state, showReviewFormModal: false }
        break

      default:
        break
    }
    return state
}