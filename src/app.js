import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import BooksList from "./components/pages/BooksList";
import Cart from "./components/pages/cart";
import BooksForm from "./components/pages/BooksForm";
import Main from "./main";

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


const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={BooksList} />
                <Route path="/admin" component={BooksForm} />
                <Route path="/cart" component={Cart} />
            </Route>
        </Router>
    </Provider>
)


render(
    Routes,
    document.getElementById("app")
);
