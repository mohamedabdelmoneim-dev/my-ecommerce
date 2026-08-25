import { createContext, useEffect, useReducer } from "react";
import CartReducer from "../components/Cart/CartReducer";

export const CartContext = createContext();

function ContextProvider ({ children }) {
    const [cart, cartDispatch] = useReducer(CartReducer, localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
    useEffect(() => {
        if (Array.isArray(cart)) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart])
    return (
        <CartContext.Provider value={{ cart, cartDispatch }}>
            {children}
        </CartContext.Provider>
    )
}
export default ContextProvider;