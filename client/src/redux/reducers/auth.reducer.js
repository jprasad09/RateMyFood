import { authConstants } from '../constants'

const initState = {
    account: {},
    token: null,
    singleUserById: {},
    singleUserByIdLoading: false,
    singleUserByIdError: null,
}

export default (state = initState, action) => {
    switch(action.type) {
      case authConstants.GET_USER_OR_RESTAURANT_DATA:
        state = {...state,  account: action.payload.account, token: action.payload.token }
        break

      case authConstants.GET_SINGLE_USER_BY_ID_REQUEST:
        state = {
            ...initState,
            singleUserByIdLoading: true
        }
        break;

      case authConstants.GET_SINGLE_USER_BY_ID_SUCCESS:
          state = {
              ...state,
              singleUserById: action.payload,
              singleUserByIdLoading: false
          }
          break;

      case authConstants.GET_SINGLE_USER_BY_ID_FAILURE:
          state = {
              ...initState,
              singleUserByIdLoading: false,
              singleUserByIdError: action.payload
          }
          break;

      default:
        break
    }
    return state
}