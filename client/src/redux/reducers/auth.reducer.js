import { authConstants } from '../constants'

const initState = {
    account: {},
    token: null
}

export default (state = initState, action) => {
    switch(action.type) {
      case authConstants.GET_USER_OR_RESTAURANT_DATA:
        state = {...state,  account: action.payload.account, token: action.payload.token }
        break

      default:
        break
    }
    return state
}