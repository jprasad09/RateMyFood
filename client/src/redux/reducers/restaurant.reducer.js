import { restaurantConstants } from "../constants"

const initState = {
    restaurantsAfterSearch: {},
    restaurantsAfterSearchLoading: false,
    restaurantsAfterSearchError: null
}
 
export default (state = initState, action) => {
    switch(action.type){
        case restaurantConstants.GET_RESTAURANTS_AFTER_SEARCH_REQUEST:
            state = {
                ...initState,
                loading: true
            }
            break;

        case restaurantConstants.GET_RESTAURANTS_AFTER_SEARCH_SUCCESS:
            state = {
                ...state,
                restaurantsAfterSearch: action.payload,
                loading: false
            }
            break;

        case restaurantConstants.GET_RESTAURANTS_AFTER_SEARCH_FAILURE:
            state = {
                ...initState,
                loading: false,
                restaurantsAfterSearchError: action.payload
            }
            break;
    }

    return state;
}