import { reviewConstants } from '../constants'

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