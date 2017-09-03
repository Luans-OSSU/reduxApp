const reducer = (state = {books: []}, action) => {
    switch (action.type) {
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