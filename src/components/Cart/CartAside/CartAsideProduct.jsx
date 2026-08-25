import { useContext } from "react";

import { CartContext } from "../../../contexts/CartContextProvider";

import { FaRegTrashAlt } from "react-icons/fa";

function CartAsideProduct({ product }) {
    const { cart, cartDispatch } = useContext(CartContext);
    return (
        <div className="cart-aside-prod p-3 d-flex gap-2 mb-3" style={{ width: "100%", backgroundColor: "#181818", border: "1px solid #252525", borderRadius: "15px" }}>
            <img src={product.thumbnail} alt="" style={{ width: "80px", height: "80px", backgroundColor: "#FFF", borderRadius: "15px" }} />
            <div className="d-flex flex-column w-100">
                <div className="d-flex justify-content-between gap-2 w-100">
                    <p className="text-white" style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", marginBottom: 0 }}>{product.title}</p>
                    <button onClick={() => cartDispatch({ type: "Remove_From_Cart", id: product.id })} className="clear-cart-aside d-flex align-items-center gap-2" style={{ color: "#4F5354", width: "fit-content", padding: 0, backgroundColor: "transparent", fontSize: "14px" }}><FaRegTrashAlt /></button>
                </div>
                <div className="d-flex align-items-center gap-1 mb-2">
                    <span style={{ borderRadius: "50%", width: "10px", height: "10px", backgroundColor: "#0f0f0f", border: "1px solid #707070" }}></span>
                    <p style={{ color: "#707070", marginBottom: "-1px", fontSize: "12px" }}>Color</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p style={{ color: "var(--main-color)", marginBottom: 0 }}>${Number((product.price * product.quantity).toFixed(2))}</p>
                    <div className="d-flex">
                        <button className=" text-white d-flex justify-content-center align-items-center"
                            style={{ backgroundColor: "#2A2A2A", borderRadius: "10px", color: "#AAAAAA", height: "25px", width: "25px" }}
                            onClick={(e) => { cartDispatch({type: "Decrease", id: product.id}) }}>-</button>
                            <p className="mb-0 mx-3 text-white">{product.quantity}</p>
                        <button className=" text-white d-flex justify-content-center align-items-center"
                            style={{ backgroundColor: "#2A2A2A", borderRadius: "10px", color: "#AAAAAA", height: "25px", width: "25px" }}
                            onClick={(e) => { cartDispatch({type: "Increase", id: product.id})}}>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CartAsideProduct;