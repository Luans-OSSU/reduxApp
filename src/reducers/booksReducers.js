const initialBooks = [
        {
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

const reducer = (state = {books: [...initialBooks]}, action) => {
    switch (action.type) {
        case "GET_BOOK":
            return {...state, books: [...state.books]}
        case "POST_BOOK":
            return {books: [...state.books, ...action.payload]}
        case "DELETE_BOOK":
            const currentBookToDelete = [...state.books];

            const indexToDelete = currentBookToDelete.findIndex((book) => {
                return book.id === action.payload.id;
            });

            return {books: [...currentBookToDelete.slice(0 ,indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]}
        case "UPDATE_BOOK":
            const currentBookToUpdate = [...state.books];

            const indexToUpdate = currentBookToUpdate.findIndex((book) => {
                return book.id === action.payload.id;
            });

            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            }

            return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]}

    }
    return state;
}

export default reducer;