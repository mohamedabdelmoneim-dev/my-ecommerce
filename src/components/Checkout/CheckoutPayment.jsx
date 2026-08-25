import { useState, useEffect } from "react";

import { CgLock } from "react-icons/cg";
import { LuCreditCard } from "react-icons/lu";

import checkoutPaymentStyles from "../../assets/CSS/Checkout/checkout-payment.module.css";

function CheckoutPayment () {
    const [paymentMethod, setPaymentMethod] = useState("Credit Card");
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
        <div className={`${checkoutPaymentStyles["checkout-payment"]} animate-section`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <LuCreditCard style={{ color: "var(--main-color)", fontSize: "1.3rem" }} />
                    <h5 className="text-white fw-bold mb-0">Payment Details</h5>
                </div>
                <p className="d-flex align-items-center gap-1" style={{ color: "#05DF72", fontSize: "12px", marginBottom: 0, }}><CgLock /> SSL Secured</p>
            </div>
            <div className={checkoutPaymentStyles["radio-inputs"]}>
                <label className={checkoutPaymentStyles["radio"]} onClick={() => setPaymentMethod("Credit Card")}>
                    <input type="radio" name="radio" defaultChecked />
                    <span className={checkoutPaymentStyles["name"]}>Credit Card</span>
                </label>
                <label className={checkoutPaymentStyles["radio"]} onClick={() => setPaymentMethod("PayPal")}>
                    <input type="radio" name="radio" />
                    <span className={checkoutPaymentStyles["name"]}>PayPal</span>
                </label>
                <label className={checkoutPaymentStyles["radio"]} onClick={() => setPaymentMethod("Apple Pay")}>
                    <input type="radio" name="radio" />
                    <span className={checkoutPaymentStyles["name"]}>Apple Pay</span>
                </label>
            </div>
            <div className={`${checkoutPaymentStyles["payment-details"]} mt-4`}>
                {
                    paymentMethod === "Credit Card"
                    ? <div className={`${checkoutPaymentStyles["credit-card-option"]} d-flex flex-column gap-3`}>
                        <div className="d-flex flex-column gap-2">
                            <label htmlFor="card-number">Card Number</label>
                            <div className={`${checkoutPaymentStyles["card-number"]} d-flex align-items-center p-2`} style={{ border: "1px solid #2F2F2F", backgroundColor: "#161616", borderRadius: "12px" }}>
                                <input id="card-number" type="text" placeholder="1234 5678 9102 3456" className="w-100" style={{ backgroundColor: "transparent", border: 0 }} />
                                <LuCreditCard style={{ color: "#5C5B5C" }} />
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <label htmlFor="card-number">Cardholder Name</label>
                            <div className={`${checkoutPaymentStyles["card-number"]} d-flex align-items-center p-2`} style={{ border: "1px solid #2F2F2F", backgroundColor: "#161616", borderRadius: "12px" }}>
                                <input id="card-number" type="text" placeholder="John Doe" className="w-100" style={{ backgroundColor: "transparent", border: 0 }} />
                                <LuCreditCard style={{ color: "#5C5B5C" }} />
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-6 d-flex flex-column gap-2 ">
                                <label htmlFor="card-number">Expiry Date</label>
                                <div className={`${checkoutPaymentStyles["card-number"]} d-flex align-items-center p-2`} style={{ border: "1px solid #2F2F2F", backgroundColor: "#161616", borderRadius: "12px" }}>
                                    <input id="card-number" type="text" placeholder="MM / YY" className="w-100" style={{ backgroundColor: "transparent", border: 0 }} />
                                </div>
                            </div>
                            <div className="col-6 d-flex flex-column gap-2 ">
                                <label htmlFor="card-number">CVV</label>
                                <div className={`${checkoutPaymentStyles["card-number"]} d-flex align-items-center p-2`} style={{ border: "1px solid #2F2F2F", backgroundColor: "#161616", borderRadius: "12px" }}>
                                    <input id="card-number" type="text" placeholder="123" className="w-100" style={{ backgroundColor: "transparent", border: 0 }} />
                                </div>
                            </div>
                        </div>
                        <div className="w-100 d-flex gap-3 py-3 px-3" style={{ backgroundColor: "#0C131E", color: "#50A2DB", border: "1px solid #12284C", borderRadius: "12px" }}>
                            <CgLock />
                            <p className="mb-0" style={{ fontSize: "11px" }}>Your payment information is encrypted and secure. We never store your full card details.</p>
                        </div>
                    </div>
                    : paymentMethod === "PayPal"
                    ? ""
                    : paymentMethod === "Apple Pay"
                    ? ""
                    : ""
                }
            </div>
        </div>
    )
}
export default CheckoutPayment;