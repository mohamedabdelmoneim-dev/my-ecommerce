import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaCheck } from "react-icons/fa6";

import confirmOrderStyles from "../../assets/CSS/Checkout/confirm-order.module.css";

function ConfirmOrder () {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (countdown === 0) {
            navigate("/account/orders");
            return;
        }

        const timer = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);
    return (
        <>
            <div className={confirmOrderStyles["confirm-order"]}>
                <div className="container text-center d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className={`${confirmOrderStyles["confirm-order-info"]} d-flex flex-column align-items-center gap-3`} style={{ width: "40%" }}>
                        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: "#00C950", borderRadius: "50%", width: "95px", height: "95px" }}>
                            <FaCheck style={{ color: "#FFF", fontSize: "2.5rem" }} />
                        </div>
                        <h2 className="text-white" style={{ fontWeight: 900 }}>Order Confirmed! 🎉</h2>
                        <p className="mb-0" style={{ color: "#929D9D" }}>Thank you for your purchase. Your order has been placed successfully.</p>
                        <p className="mb-0" style={{ color: "#666C6C", fontSize: "14px" }}>Order #LXE-928888 . Confirmation sent to your email</p>
                        <button onClick={() => navigate("/account/orders")} className={`text-white fw-bold ${confirmOrderStyles["track-order"]}`} style={{ backgroundColor: "var(--main-color)", width: "83%", padding: "15px", borderRadius: "12px" }}>Track Your Order</button>
                        <button onClick={() => navigate("/shop")} className={`text-white fw-bold ${confirmOrderStyles["continue-shopping-confirm"]}`} style={{ backgroundColor: "#1D1D1D", width: "83%", padding: "15px", borderRadius: "12px" }}>Continue Shopping</button>
                        <p style={{ fontSize: "14px", color: "#434243" }}>Redirecting to your account in {countdown} seconds...</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ConfirmOrder;