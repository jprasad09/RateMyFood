import { combineReducers } from "redux"
import authReducer from "./auth.reducer"
import restaurantReducer from "./restaurant.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer
});

export default rootReducer