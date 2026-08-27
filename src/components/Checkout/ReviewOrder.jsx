import { CartContext } from "../../contexts/CartContextProvider";

import { useContext, useEffect } from "react";

import { GrLocation } from "react-icons/gr";
import { LuPackage, LuCreditCard } from "react-icons/lu";

import reviewOrderStyles from "../../assets/CSS/Checkout/review-order.module.css";

function ReviewOrder () {
    const { cart, cartDispatch } = useContext(CartContext);
    useEffect(() => {
        const allElements = document.querySelectorAll(".animate-section > *");
        const observer = new IntersectionObserver (entries => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                    entry.target.classList.add("visible");
                }
            });
        }, {threshold: 0.2});
        allElements.forEach(el => observer.observe(el))
        
        return () => observer.disconnect();
    },[])
    return (
        <div className={`${reviewOrderStyles["review-order"]} animate-section`}>
            <div className="d-flex align-items-center gap-2 mb-4">
                <LuPackage style={{ color: "var(--main-color)", fontSize: "1.3rem" }} />
                <h5 className="text-white fw-bold mb-0">Review Your Order</h5>
            </div>
            <div className="d-flex flex-column gap-3 mb-4">
                {
                    cart.map(ele => {
                        return <div className="d-flex p-3 gap-3" style={{ backgroundColor: "#141414", border: "1px solid #212121", borderRadius: "15px" }}>
                            <img src={ele.thumbnail} alt="" style={{ backgroundColor: "#FFF", borderRadius: "15px", width: "50px" }} />
                            <div className="d-flex flex-column w-100">
                                <div className="d-flex justify-content-between w-100">
                                    <p className="text-white mb-0" style={{ fontWeight: 600,  overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{ele.title}</p>
                                    <p className="text-white mb-0">${(Number(ele.price * ele.quantity).toFixed(2))}</p>
                                </div>
                                <p className="mb-0" style={{ color: "#6C6C6C", fontSize: "13px" }}>Qty: {ele.quantity}</p>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className={`d-flex flex-sm-row flex-column justify-content-sm-between ${reviewOrderStyles["review-info"]}`}>
                <div className={`${reviewOrderStyles["review-item"]} p-3`} style={{ border: "1px solid #212121", borderRadius: "15px", width: "48.5%", backgroundColor: "#141414" }}>
                    <div className="d-flex gap-2 align-items-center mb-2">
                        <GrLocation style={{ color: "var(--main-color)" }} />
                        <p className={`${reviewOrderStyles["info-head"]} mb-0 text-white`} style={{ fontSize: "16px", fontWeight: "bold" }}>Shipping Address</p>
                    </div>
                    <p>John Doe</p>
                    <p>123 Main Street</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                </div>
                <div className={`${reviewOrderStyles["review-item"]} p-3`} style={{ border: "1px solid #212121", borderRadius: "15px", width: "48.5%", backgroundColor: "#141414" }}>
                    <div className="d-flex gap-2 align-items-center mb-2">
                        <LuCreditCard style={{ color: "var(--main-color)" }} />
                        <p className={`${reviewOrderStyles["info-head"]} mb-0 text-white`} style={{ fontSize: "16px", fontWeight: "bold" }}>Payment</p>
                    </div>
                    <p>**** **** **** 1234</p>
                    <p>Cardholder Name</p>
                    <p>Exp: 12/28</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewOrder;