export const totalItems = (cart) => {
    return cart.reduce((sum, product) => sum + product.quantity, 0);
}
export const totalPrice = (cart) => {
    return cart.reduce((total, product) => total + product.quantity * product.price, 0);
}

const CartReducer = (state, action) => {
    switch (action.type) {
        case "Add_To_Cart":
            const existing = state.find(item => item.id === action.product.id);
            if (existing) {
                return state.map(item => 
                    item.id === action.product.id 
                    ? { ...item, quantity: item.quantity + (action.product.quantity || 1) } 
                    : item
                );
            }
            return [...state, { ...action.product, quantity: action.product.quantity || 1 }]
        
        case "Remove_From_Cart":
            return state.filter(item => item.id !== action.id);
        
        case "Increase":
            return state.map(item => 
                item.id === action.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            );

        case "Decrease":
            return state.map(item => 
                item.id === action.id 
                ? { ...item, quantity: item.quantity - 1 } 
                : item
            ).filter(item => item.quantity > 0);
        case "Clear_Cart":
            return [];
        default:
            return state;
    }
}
export default CartReducer;