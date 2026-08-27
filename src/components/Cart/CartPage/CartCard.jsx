import { CartContext } from "../../../contexts/CartContextProvider";

import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegTrashAlt } from "react-icons/fa";

import cartCardStyles from "../../../assets/CSS/Cart/cart.module.css"

function CartCard ({ product, status }) {
    const randomStatus = useMemo(() => 
        status[Math.floor(Math.random() * status.length)]
    , []);
    const { cart, cartDispatch } = useContext(CartContext);
    const navigate = useNavigate();
    console.log(cartCardStyles)
    return (
        <div className={`cart-card d-flex align-items-center p-4 mb-4 gap-3 w-100 ${cartCardStyles["cart-card"]}`} style={{ backgroundColor: "#141414", border: "1px solid #222222", borderRadius: "15px" }}>
            <div className={`cart-card-image ${cartCardStyles["cart-card-image"]}`}>
                <img onClick={() => {navigate('/product', { state: { id: product.id } })}} src={product.thumbnail} alt="" style={{ width: "100%", height: "100%", backgroundColor: "#FFF", borderRadius: "15px", cursor: "pointer" }} />
            </div>
            <div className={`d-flex flex-column w-100 ${cartCardStyles["cart-card-details"]}`}>
                <div className="d-flex w-100 justify-content-between align-items-center mb-1">
                    <p style={{ borderRadius: "10px", color: "white", width: "fit-content", padding: "2px 5px", fontSize: "0.7rem", fontWeight: 800, marginBottom: 0 }} className={randomStatus == "Limited" ? cartCardStyles["limited-product"] : randomStatus == "Trending" || randomStatus == "New" ? cartCardStyles["blue-status"] : cartCardStyles["cart-orange-status"]}>{randomStatus}</p>
                    <button className={`cart-trash ${cartCardStyles["cart-trash"]}`} style={{ backgroundColor: "transparent", width: "fit-content", height: "fit-content" }} onClick={() => cartDispatch({ type: "Remove_From_Cart", id: product.id })}>
                        <FaRegTrashAlt  style={{ color: "#4F5354" }}/>
                    </button>
                </div>
                <div className={`d-flex flex-column ${cartCardStyles["cart-card-details"]}`}>
                    <p className="text-white fw-bold mb-0" style={{  overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", }}>{product.title}</p>
                    <div className={`d-flex align-items-center gap-1 mb-2 ${cartCardStyles["color-selector"]}`}>
                        <span style={{ borderRadius: "50%", width: "10px", height: "10px", backgroundColor: "#0f0f0f", border: "1px solid #707070" }}></span>
                        <p style={{ color: "#707070", marginBottom: "-1px", fontSize: "12px" }}>Color</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center gap-sm-0 gap-2">
                    <div className={`d-flex align-items-center justify-content-evenly ${cartCardStyles["quantity-selector"]}`} style={{ backgroundColor: "#222222", borderRadius: "15px", width: "100px", height: "35px" }}>
                        <button style={{ backgroundColor: "transparent", color: "#FFF" }} onClick={() => cartDispatch({ type: "Decrease", id: product.id })}>-</button>
                        <p className="text-white mb-0 mx-1">{product.quantity}</p>
                        <button style={{ backgroundColor: "transparent", color: "#FFF" }} onClick={() => cartDispatch({ type: "Increase", id: product.id })}>+</button>
                    </div>
                    <div className={`d-flex align-items-center justify-content-center w-50 ${cartCardStyles["price-container"]}`}  style={{ position: "relative" }}>
                        <p className="text-white fw-bold mb-0">
                            ${(product.quantity * product.price).toFixed(2)}
                        </p>
                        <p 
                            className="fw-bold mb-0 text-center" 
                            style={{ 
                                fontSize: "11px", 
                                color: "#565A56",
                                position: "absolute",
                                top: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                visibility: product.quantity < 2 ? "hidden" : "visible",
                                whiteSpace: "nowrap"
                            }}
                        >
                            ${product.price} each
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CartCard;