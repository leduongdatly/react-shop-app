import { combineReducers } from "redux";
import products from "./productReducer";
import users from "./userReducer";
import cart from "./cartReducer";
import cat from "./typeReducer";

const rootReducer = combineReducers({
    products,
    users,
    cart,
    cat
});

export default rootReducer;