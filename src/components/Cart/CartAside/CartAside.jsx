import CartAsideProduct from "./CartAsideProduct";
import { totalPrice } from "../CartReducer";
import { CartContext } from "../../../contexts/CartContextProvider";

import { createPortal } from "react-dom";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FiTag } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";



import cartAsideStyles from "../../../assets/CSS/Cart/aside-cart.module.css";

function CartAside ({ onClose }) {
    const { cart } = useContext(CartContext);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => onClose(), 300);
    }
    const navigate = useNavigate();
    
    return createPortal (
        <>
        <div className={cartAsideStyles["overlay"]} onClick={handleClose}></div>
        <aside className="position-fixed p-4" style={{  backgroundColor: "#0F0F0F", top: 0, right: 0, height: "100vh", zIndex: "999" ,animation: isClosing ? `${cartAsideStyles["slideOut"]} 0.3s ease forwards` : `${cartAsideStyles["slide"]} 0.3s ease` }}>
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex align-items-center justify-content-between w-100 pb-4 mb-3" style={{ borderBottom: "1px solid #222222" }}>
                    <div className="d-flex justify-content-start align-items-center gap-2">
                        <LuShoppingBag style={{ color: "var(--main-color)" }} />
                        <p className="text-white fw-bold mb-0">Your Cart</p>
                        <p className="text-white text-center mb-0" style={{ borderRadius: "50%", backgroundColor: "var(--main-color)", width: "20px", fontWeight: "bold" }}>
                            {
                                cart.length > 0
                                ? cart.reduce((sum, item) => sum + item.quantity, 0)
                                : ""
                            }
                        </p>
                    </div>
                    <div className={`${cartAsideStyles["aside-close"]} p-2 text-white d-flex justify-content-center align-items-center`} onClick={handleClose} style={{ backgroundColor: "#2A2A2A", borderRadius: "10px" }}>
                        <IoMdClose style={{ color: "#818081" }} onClick={handleClose} />
                    </div>
                </div>
                { cart.length > 0
                ? <>
                <div style={{ borderBottom: "1px solid #222222", height: "47vh", overflowY: "auto", overflowX: "hidden", scrollBehavior: "smooth", width: "100%", marginBottom: "10px", paddingBottom: "15px" }}>
                    {
                        cart.map(prod => {
                            return <CartAsideProduct product={prod} />
                        })
                    }
                </div>
                <div className={`d-flex flex-column w-100 mb-1 ${cartAsideStyles["bot-aside"]}`}>
                    <form style={{ backgroundColor: "#1B1B1B", borderRadius: "15px", border: "1px solid #252525" }} className={`${cartAsideStyles["promo"]} d-flex align-items-center justify-content-between py-2 px-3 mb-3`}>
                        <div className="d-flex align-items-center gap-2 w-100">
                            <FiTag style={{ color: "#5F5F5F" }} />
                            <input type="text"style={{ backgroundColor: "transparent", border: "0", width: "100%" }} placeholder="Promo code" />
                        </div>
                        <button style={{ color: "var(--main-color)", border: "none", backgroundColor: "transparent", fontSize: "14px" }}>
                            Apply
                        </button>
                    </form>
                    <div className="d-flex justify-content-between mb-2">
                        <p style={{ color: "#818081" }}>Subtotal</p>
                        <p style={{ color: "#818081" }}>${Number(totalPrice(cart).toFixed(2))}</p>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <p style={{ color: "#818081" }}>Shipping</p>
                        <p style={{ color: "#06D06B" }}>Free</p>
                    </div>
                    {cart.length > 1 || cart[0].quantity > 1 ? 
                    <div className="d-flex justify-content-between mb-2 pb-2" style={{ borderBottom: "1px solid #222222" }}>
                        <p style={{ color: "#06D06B" }}>Discount ({Number((cart.map(prod => prod.discountPercentage).reduce((acc, curr) => acc + curr, 0)).toFixed(2))}%)</p>
                        <p style={{ color: "#06D06B" }}>-${Number((((cart.map(prod => prod.discountPercentage).reduce((acc, curr) => acc + curr, 0)) / 100) * totalPrice(cart)).toFixed(2))}</p>
                    </div>
                    : ""}
                    <div className="d-flex justify-content-between mb-1">
                        <p className="text-white fw-bold">Total</p>
                        <p className="text-white fw-bold">
                            {
                                cart.length > 1 ? `${Number((totalPrice(cart) - ((cart.map(prod => prod.discountPercentage).reduce((acc, curr) => acc + curr, 0)) / 100) * totalPrice(cart)).toFixed(2))}` : `${totalPrice(cart)}`
                            }
                        </p>
                    </div>
                </div>
                <div className={`d-flex flex-column w-100 gap-2 ${cartAsideStyles["check-cart-btns"]}`}>
                    <button onClick={() => {navigate('/checkout'); handleClose()}} className="text-white text-center fw-bold w-100 py-3" style={{ width: "80%", backgroundColor :"var(--main-color)", borderRadius: "12px" }}>Checkout <FaArrowRight /></button>
                    <Link to="/cart" className="text-center fw-bold w-100 py-2" onClick={handleClose} style={{ width: "80%", color: "#ADACAD", borderRadius: "12px", backgroundColor: "#232222" }}>View Full Cart</Link>
                </div>
                </>
                : <div className="d-flex flex-column align-items-center">
                    <div className="d-flex align-items-center justify-content-center mb-3" style={{ backgroundColor: "#1B1B1B", borderRadius: "50%", width: "5rem", height: "5rem" }}><LuShoppingBag style={{ fontSize: "2.2rem", color: "#494949" }} /></div>
                    <p className="mb-0" style={{ color: "#878687" }}>Your cart is empty</p>
                    <p className="mb-4" style={{ color: "#4E4D4E", fontSize: "14px" }}>Add some amazing products</p>
                    <button onClick={handleClose} className={`${cartAsideStyles["scale-hover-btn"]} text-white ${cartAsideStyles["aside-continue-shopping"]}`} style={{ backgroundColor: "var(--main-color)", borderRadius: "15px", fontSize: "14px", padding: "10px 20px" }}>Continue Shopping</button>
                </div>
                }
            </div>
        </aside>
        </>, document.body
    )
}
export default CartAside;