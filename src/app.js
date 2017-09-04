import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import BooksList from "./components/pages/BooksList";

import {
    createStore,
    applyMiddleware
} from "redux";


import logger from "redux-logger";

import reducers from "./reducers";
import {addToCart} from "./actions/cartActions";
import {postBooks, updateBooks, deleteBooks} from "./actions/booksActions";


const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);


render(
    <Provider store={store}>
        <BooksList />
    </Provider>,
    document.getElementById("app")
);
