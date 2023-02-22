import { restaurantConstants } from "../constants"

const initState = {
    restaurantsAfterSearch: {},
    restaurantsAfterSearchLoading: false,
    restaurantsAfterSearchError: null,
    singleRestaurantById: {},
    singleRestaurantByIdLoading: false,
    singleRestaurantByIdError: null,
    allRestaurants: {},
    allRestaurantsLoading: false,
    allRestaurantsError: null,
}
 
export default (state = initState, action) => {
    switch(action.type){
        case restaurantConstants.GET_RESTAURANTS_AFTER_SEARCH_REQUEST:
            state = {
                ...initState,
                restaurantsAfterSearchLoading: true
            }
            break;

        case restaurantConstants.GET_RESTAURANTS_AFTER_SEARCH_SUCCESS:
            state = {
                ...state,
                restaurantsAfterSearch: action.payload,
                restaurantsAfterSearchLoading: false
            }
            break;

        case restaurantConstants.GET_RESTAURANTS_AFTER_SEARCH_FAILURE:
            state = {
                ...initState,
                restaurantsAfterSearchLoading: false,
                restaurantsAfterSearchError: action.payload
            }
            break;

        case restaurantConstants.GET_SINGLE_RESTAURANT_BY_ID_REQUEST:
            state = {
                ...initState,
                singleRestaurantByIdLoading: true
            }
            break;

        case restaurantConstants.GET_SINGLE_RESTAURANT_BY_ID_SUCCESS:
            state = {
                ...state,
                singleRestaurantById: action.payload,
                singleRestaurantByIdLoading: false
            }
            break;

        case restaurantConstants.GET_SINGLE_RESTAURANT_BY_ID_FAILURE:
            state = {
                ...initState,
                singleRestaurantByIdLoading: false,
                singleRestaurantByIdError: action.payload
            }
            break;

        case restaurantConstants.GET_ALL_RESTAURANTS_REQUEST:
            state = {
                ...initState,
                allRestaurantsLoading: true
            }
            break;

        case restaurantConstants.GET_ALL_RESTAURANTS_SUCCESS:
            state = {
                ...state,
                allRestaurants: action.payload,
                allRestaurantsLoading: false
            }
            break;

        case restaurantConstants.GET_ALL_RESTAURANTS_FAILURE:
            state = {
                ...initState,
                allRestaurantsLoading: false,
                allRestaurantsError: action.payload
            }
            break;
            
        default:
            break
        
    }

    return state;
}