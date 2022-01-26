import { combineReducers } from "redux";
import products from "./productReducer";
import users from "./userReducer";
import cart from "./cartReducer";

const rootReducer = combineReducers({
    products,
    users,
    cart
});

export default rootReducer;