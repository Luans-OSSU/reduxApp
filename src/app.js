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


store.dispatch(postBooks(
    [{
            id: 1,
            title: "book title",
            description: "description of the book",
            price: 20,
        },
        {
            id: 2,
            title: "book2 title",
            description: "description of the book2",
            price: 22,
        }
    ]
));


store.dispatch(deleteBooks({id: 1}));

store.dispatch(updateBooks(
    {
        id: 2,
        title: "Learn React Redux"
    }
));


store.dispatch(addToCart([{id: 1}]));
