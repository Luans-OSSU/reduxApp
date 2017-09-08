

const reducer = (state={cart: []}, action) => {
    switch(action.type) {
        case "ADD_TO_CART":
            return {cart: [...state, ...action.payload]}
        case "DELETE_CART_ITEM":
            return {cart: [...state, ...action.payload]}
        case "UPDATE_CART":
            const currentCartUpdate = [...state.cart];

            const indexToUpdate = currentCartUpdate.findIndex((cart) => {
                return cart._id === action._id;
            });

            const newCartToUpdate = {
                ...currentCartUpdate[indexToUpdate],
                quantity: currentCartUpdate[indexToUpdate].quantity + action.unit
            }

            let cartUpdate = [...currentCartUpdate.slice(0, indexToUpdate), newCartToUpdate, ...currentCartUpdate.slice(indexToUpdate + 1)];

            return {
                ...state,
                cart: cartUpdate
            }
    }
    return state;
}

export default reducer;