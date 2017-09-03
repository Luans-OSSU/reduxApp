import {combineReducers} from "redux";

import bookReducers from "./booksReducers";
import cartReducers from "./cartReducers";



export default combineReducers({
    books: bookReducers,
    cart: cartReducers,
})