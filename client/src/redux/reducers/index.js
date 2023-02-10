import { combineReducers } from "redux"
import authReducer from "./auth.reducer"
import restaurantReducer from "./restaurant.reducer"
import reviewReducer from "./review.reducer"

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    review: reviewReducer,
});

export default rootReducer