import CartCard from "../components/Cart/CartPage/CartCard";
import { totalPrice } from "../components/Cart/CartReducer";
import { CartContext } from "../contexts/CartContextProvider";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";


import { FiTag } from "react-icons/fi";
import { IoShieldOutline } from "react-icons/io5";
import { LuPackage, LuRefreshCw, LuShoppingBag } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import cartStyles from "../assets/CSS/Cart/cart.module.css";

function Cart () {
    const { cart, cartDispatch } = useContext(CartContext);
    const status = ["Best Seller", "New", "Popular", "Limited", "Trending", "Sale", "Luxury"];
    let total = 0;
    let tax = Number((totalPrice(cart) * 0.08).toFixed(2));
    cart.length > 1 ? total = Number(((totalPrice(cart) - ((cart.map(prod => prod.discountPercentage).reduce((acc, curr) => acc + curr, 0)) / 100) * totalPrice(cart))+ tax).toFixed(2) ) : total = Number((totalPrice(cart) + tax).toFixed(2));
    const navigate = useNavigate();
    return (
        <>
                <div style={{ paddingTop: "64px" }}>
                    <div className="mt-5" style={{ backgroundColor: "#141414", padding: "20px", borderBottom: "1px solid #242424" }}>
                        <div className="container">
                            <div className="container-fluid px-0" style={{ width: "100%" }}>
                                <ul className="nav mb-3" style={{ fontSize: "13px" }}>
                                    <li className="nav-item" style={{ color: "#4D5556" }}>
                                        <Link to="/home" className={cartStyles["home-page"]} style={{ color: "#4D5556", transition: "0.3s" }}>Home </Link>
                                        <span className="mx-1">/</span>
                                    </li>
                                    <li className="nav-item" style={{ color: "#B1AEB1" }}>
                                        Shop
                                    </li>
                                </ul>
                                <div className="d-flex align-items-center gap-3">
                                    <h2 className="text-white" style={{ fontWeight: 800 }}>Shopping Cart</h2>
                                    {cart.length > 0 ? <p className="text-white fw-bold py-1 px-2 text-center mb-0" style={{ borderRadius: "15px", backgroundColor: "var(--main-color)", fontSize: "13px" }}>{cart.length} items</p> : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    cart.length > 0
                    ? <div className="mt-4 mb-5">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="cart-cards col-lg-9 col-md-12">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <p style={{ color: "#817E81" }}>{cart.length} items in your cart</p>
                                    <button onClick={() => cartDispatch({ type: "Clear_Cart" })} className={`${cartStyles["clear-cart"]} d-flex align-items-center gap-2`} style={{ color: "#4F5354", width: "fit-content", padding: 0, backgroundColor: "transparent", fontSize: "14px" }}><FaRegTrashAlt /> Clear Cart</button>
                                </div>
                                <div className="d-flex flex-column w-100">
                                    {
                                        cart.length > 0 
                                        ? cart.map(prod => <CartCard product={prod} status={status} />)
                                        : ""
                                    }
                                    <Link to="/shop" className={`${cartStyles["continue-shopping"]} d-flex align-items-center gap-2 mb-4`} style={{ color: "#C4C4C4", fontSize: "14px", width: "fit-content" }}><FaArrowLeftLong /> Continue Shopping</Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-11 mx-auto p-4" style={{ borderRadius: "15px", border: "1px solid #222222", backgroundColor: "#141414", height: "fit-content" }}>
                                <div className="d-flex flex-column">
                                    <p className="text-white fw-bold mb-4">Order Summary</p>
                                    <form style={{ backgroundColor: "#202020", borderRadius: "15px", border: "1px solid #252525" }} className={`${cartStyles["cart-promo-form"]} d-flex align-items-center justify-content-between py-2 px-3 mb-3`}>
                                        <div className="d-flex align-items-center gap-2 w-100">
                                            <FiTag style={{ color: "#5F5F5F" }} />
                                            <input className={cartStyles["cart-promo-input"]} type="text"style={{ backgroundColor: "transparent", border: "0", width: "100%" }} placeholder="Enter promo code" />
                                        </div>
                                        <button className={cartStyles["cart-promo-apply-btn"]} style={{ color: "var(--main-color)", border: "none", backgroundColor: "transparent", fontSize: "14px" }}>
                                            Apply
                                        </button>
                                    </form>
                                    <div className={`d-flex flex-column ${cartStyles["order-summ"]}`}>
                                        <div className="d-flex flex-column mb-2" style={{ borderBottom: "1px solid #222222" }}>
                                            <div className="d-flex justify-content-between mb-2">
                                                <p style={{ color: "#83898A", fontSize: "14px" }}>Subtotal ({cart.length} items)</p>
                                                <p className="text-white">${Number(totalPrice(cart).toFixed(2))}</p>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <p style={{ color: "#83898A", fontSize: "14px" }}>Shipping</p>
                                                <p style={{ color: "#05DF66" }}>Free</p>
                                            </div>
                                            {cart.length > 1 || (cart[0] && cart[0].quantity > 1) ? 
                                                <div className="d-flex justify-content-between mb-2">
                                                    <p style={{ color: "#83898A", fontSize: "14px" }}>Loyalty Discount ({Number((cart.map(prod => prod.discountPercentage).reduce((acc, curr) => acc + curr, 0)).toFixed(2))}%)</p>
                                                    <p style={{ color: "#05DF66" }}>-${Number((((cart.map(prod => prod.discountPercentage).reduce((acc, curr) => acc + curr, 0)) / 100) * totalPrice(cart)).toFixed(2))}</p>
                                                </div>
                                            : ""}
                                            <div className="d-flex justify-content-between mb-2 ">
                                                <p style={{ color: "#83898A", fontSize: "14px" }}>Tax (8%)</p>
                                                <p className="text-white">${tax}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: "1px solid #222222" }}>
                                            <p className="text-white fw-bold">Total</p>
                                            <p className="text-white fw-bold" style={{ fontSize: "1.5rem" }}>${total}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center mb-4">
                                            <button onClick={() => navigate("/checkout")} className="scale-hover-btn px-sm-5 px-4 py-3 text-white fw-bold" style={{ backgroundColor: "var(--main-color)", borderRadius: "15px" }}>Proceed to Checkout <FaArrowRightLong /></button>
                                        </div>
                                        <div className={`d-flex justify-content-evenly align-items-center pb-3 ${cartStyles["order-adv"]}`} style={{ borderBottom: "1px solid #222222" }}>
                                            <div className="d-flex flex-column align-items-center">
                                                <IoShieldOutline />
                                                <p>Secure</p>
                                            </div>
                                            <div className="d-flex flex-column align-items-center">
                                                <LuPackage />
                                                <p>Fast Ship</p>
                                            </div>
                                            <div className="d-flex flex-column align-items-center">
                                                <LuRefreshCw />
                                                <p>30-day Return</p>
                                            </div>
                                        </div>
                                        <div className={`d-flex justify-content-center align-items-center gap-3 pt-3 ${cartStyles["payment-methods"]}`}>
                                            <p>VISA</p>
                                            <p>MC</p>
                                            <p>AMEX</p>
                                            <p>PayPal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className="d-flex w-100 justify-content-center align-items-center text-center" style={{ marginTop: "8rem" }}>
                    <div className="d-flex flex-column align-items-center gap-4 w-25 mb-5">
                        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: "#141414", border: "1px solid #262626", width: "95px", height: "95px", borderRadius: "20px" }}><LuShoppingBag style={{ color: "#434343", fontSize: "3rem" }} /></div>
                        <h5 className="text-white fw-bold mb-0">Your cart is empty</h5>
                        <p style={{ color: "#6C6C6C" }}>Looks like you haven't added anything yet. Discover our premium collection.</p>
                        <Link to="/shop" className={`${cartStyles["start-shopping"]} text-white d-flex align-items-center justify-content-center gap-2 fw-bold py-3 px-5`} style={{ backgroundColor: "var(--main-color)", borderRadius: "15px" }}><LuShoppingBag /> Start Shopping</Link>
                    </div>
                </div>
                }
        </>
    )
}
export default Cart;