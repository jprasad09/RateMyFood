import { authConstants } from '../constants'

export const getUserOrRestaurantData = (data) => {
    return {
      type: authConstants.GET_USER_OR_RESTAURANT_DATA,
      payload: data
    }
}
