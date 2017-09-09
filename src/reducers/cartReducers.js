

const reducer = (state={cart: []}, action) => {
    switch(action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            }
        case "DELETE_CART_ITEM":
            return {
                ...state,
                cart:action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            }
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
                cart: cartUpdate,
                totalAmount: totals(cartUpdate).amount,
                totalQty: totals(cartUpdate).qty
            }
    }
    return state;
}

export function totals(payloadArr) {
    const totalAmount = payloadArr.map(cart => {
        return cart.price * cart.quantity;
    }).reduce((a, b) => {
        return a + b;
    }, 0)

    const totalQty = payloadArr.map(qty => {
        return qty.quantity;
    }).reduce((a, b) => {
        return a + b;
    }, 0)

    return {
        amount: totalAmount.toFixed(2),
        qty: totalQty
    }
}

export default reducer;