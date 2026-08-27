import ReviewOrder from "../../components/Checkout/ReviewOrder";
import CheckoutStepper from "../../components/Checkout/CheckoutStepper";
import CheckoutPayment from "../../components/Checkout/CheckoutPayment";
import ShippingInformation from "../../components/Checkout/ShippingInformation";

import { Link, useNavigate } from "react-router-dom";
import { totalPrice } from "../../components/Cart/CartReducer";
import { useState, useEffect, useContext, useRef } from "react";
import { CartContext } from "../../contexts/CartContextProvider";


import { CgLock } from "react-icons/cg";
import { FaArrowLeft } from "react-icons/fa6";


import checkoutStyles from "../../assets/CSS/Checkout/checkout.module.css";


function Checkout() {
    const { cart, cartDispatch } = useContext(CartContext);
    const [currentStep, setCurrentStep] = useState(1);
    const [isComplete, setIsComplete] = useState(false);
    const CheckoutSteps = [
        {
            name: "Shipping",
            Component: ShippingInformation  ,
        },
        {
            name: "Payment",
            Component: CheckoutPayment ,
        },
        {
            name: "Review",
            Component: ReviewOrder ,
        },
    ];
    const handleNext = () => {
        
        setCurrentStep(prevStep => {
            if (prevStep === CheckoutSteps.length) {
                setIsComplete(true);
                return prevStep;
            } else {
                return prevStep + 1;
            }
        })
    }
    const ActiveComponent = CheckoutSteps[currentStep - 1]?.Component
    const navigate = useNavigate()
    const confirmNavigate = useNavigate()
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
    const [shippingSelected, setShippingSelected] = useState("standard");
    let shippingCost = shippingSelected == "standarf" ? 0 : shippingSelected == "express" ? 25 : shippingSelected == "overnight" ? 45 : 0;
    let tax = Number((totalPrice(cart) * 0.08).toFixed(2));
    let total = 0;
    cart.length > 1 ? total = Number(((totalPrice(cart) + shippingCost - ((cart.map(prod => prod.discountPercentage).reduce((acc, curr) => acc + curr, 0)) / 100) * totalPrice(cart)) + tax).toFixed(2) ) : total = Number((totalPrice(cart) + tax).toFixed(2));
    const handlePlaceOrder = () => {
        const oldOrders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];
        const newOrder = {
            id: Date.now(),
            date: new Date(),
            status: "Processing",
            items: cart
        };
        localStorage.setItem("orders", JSON.stringify([...oldOrders, newOrder]));
        cartDispatch({ type: "Clear_Cart" });
    }
    const [validated, setValidated] = useState(false);
    const formRef = useRef(null);

    return (
        <>
            <div className={checkoutStyles["checkout"]} style={{ backgroundColor: "#0D0D0D", borderBottom: "1px solid #242424", marginTop: "70px" }}>
                <div className="container-fluid px-0" style={{ padding: "20px", width: "100%" }}>
                    <div className="container">
                        <div className={checkoutStyles["checkout-container"]}>
                            <ul className="nav mb-3" style={{ fontSize: "13px" }}>
                                <li className="nav-item" style={{ color: "#4D5556" }}>
                                    <Link to="/home" className="home-page" style={{ color: "#4D5556", transition: "0.3s" }}>Home </Link>
                                    <span className="mx-1">/</span>
                                </li>
                                <li className="nav-item" style={{ color: "#4D5556" }}>
                                    <Link to="/cart" className={checkoutStyles["cart"]} style={{ color: "#4D5556", transition: "0.3s" }}>Cart </Link>
                                    <span className="mx-1">/</span>
                                </li>
                                <li className="nav-item" style={{ color: "#B1AEB1", fontSize: "14px" }}>
                                    Checkout
                                </li>
                            </ul>
                            
                            <div className="d-flex justify-content-center">
                                <CheckoutStepper steps={CheckoutSteps} currentStep={currentStep} isComplete={isComplete} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-5" style={{ marginTop: "35px" }}>
                <div className="container">
                    <div className={checkoutStyles["checkout-container"]}>
                        <div className="row">
                            <div className="col-lg-7 col-12">
                                <form ref={formRef} className={`animate-section ${validated ? "was-validated" : ""}`}  onSubmit={(e) => {e.preventDefault()}} noValidate >
                                    <ActiveComponent shippingSelected={shippingSelected} setShippingSelected={setShippingSelected} />
                                    {
                                        !isComplete && (
                                            <div className={`${checkoutStyles["checkout-info"]} d-flex flex-row justify-content-between align-items-center mt-5`}>
                                                {
                                                    ActiveComponent == CheckoutSteps[0].Component
                                                    ? <button onClick={() => navigate('/cart')} className={`${checkoutStyles["back-btn"]} btn fw-bold d-flex align-items-center gap-2`} style={{ color: "#5C5C5C", width: "fit-content", height: "fit-content", fontSize: "16px" }}><FaArrowLeft /> Back to Cart</button>
                                                    : ActiveComponent == CheckoutSteps[1].Component
                                                    ? <button onClick={() => setCurrentStep(1)} className={`${checkoutStyles["back-btn"]} btn fw-bold d-flex align-items-center gap-2`} style={{ color: "#5C5C5C", width: "fit-content", height: "fit-content", fontSize: "16px" }}><FaArrowLeft /> Back</button>
                                                    : <button onClick={() => setCurrentStep(2)} className={`${checkoutStyles["back-btn"]} btn fw-bold d-flex align-items-center gap-2`} style={{ color: "#5C5C5C", width: "fit-content", height: "fit-content", fontSize: "16px" }}><FaArrowLeft /> Back</button>
                                                }
                                                
                                                {
                                                    currentStep === CheckoutSteps.length
                                                    ? <button type="submit" className={`${checkoutStyles["continue-btn"]} btn py-3 px-5 text-white fw-bold d-flex align-items-center gap-1`} style={{ backgroundColor: "var(--main-color)", fontSize: "15px" }} onClick ={() => {confirmNavigate('/confirm-order'); handlePlaceOrder()}}><CgLock /> Place Order . {total}</button>
                                                    : <button type="submit" className={`${checkoutStyles["continue-btn"]} btn py-3 px-5 text-white fw-bold d-flex align-items-center gap-1`} style={{ backgroundColor: "var(--main-color)", fontSize: "15px" }} onClick= {() => { if (formRef.current.checkValidity() === false) {setValidated(true); return;} handleNext();}}>{currentStep === CheckoutSteps.length ? <><CgLock /> Place Order . ${total}</> : "Continue"}</button>
                                                }
                                                
                                            </div>
                                        )
                                    }
                                </form>
                            </div>
                            <div className="col-lg-5 col-12 ps-lg-4">
                                <div className={`${checkoutStyles["order-summary"]} p-3`} style={{ backgroundColor: "#141414", borderRadius: "15px", border: "1px solid #222222", width: "95%" }}>
                                    <p className="text-white fw-bold pb-3 mb-1" style={{ fontSize: "17px" }}>Order Summary</p>
                                    <div className="d-flex flex-column mb-3" style={{ borderBottom: "1px solid #222222" }}>
                                        {
                                            cart.map(ele => {
                                                return <div className="d-flex align-items-center mb-3 gap-3" >
                                                    <img src={ele.thumbnail} style={{ backgroundColor: "#FFF", width: "50px", borderRadius: "15px" }} alt="" />
                                                    <div className="d-flex justify-content-between w-100">
                                                        <p className="text-white mb-0" style={{ fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{ele.title}</p>
                                                        <p className="text-white mb-0 fw-bold">${ele.price * ele.quantity}</p>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <p className="mb-0" style={{ color: "#83898A", fontSize: "14px" }}>Subtotal</p>
                                        <p className="text-white mb-0">${Number(totalPrice(cart).toFixed(2))}</p>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <p className="mb-0" style={{ color: "#83898A", fontSize: "14px" }}>Shipping</p>
                                        <p className="mb-0" style={{ color: "#05DF66" }}>{shippingSelected == "standard" ? "Free" : shippingSelected == "express" ? `$25` : shippingSelected == "overnight" ? "$45" : ""}</p>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <p className="mb-0" style={{ color: "#05DF66", fontSize: "14px" }}>Discount</p>
                                        <p className="mb-0" style={{ color: "#05DF66" }}>-${Number((((cart.map(prod => prod.discountPercentage).reduce((acc, curr) => acc + curr, 0)) / 100) * totalPrice(cart)).toFixed(2))}</p>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3 pb-1" style={{ borderBottom: "1px solid #242424" }}>
                                        <p className="mb-0" style={{ color: "#83898A", fontSize: "14px" }}>Tax</p>
                                        <p className="mb-0 text-white" >${tax}</p>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <h6 className="mb-0 text-white fw-bold" >Total</h6>
                                        <h6 className="mb-0 text-white fw-bold" >${total}</h6>
                                    </div>
                                </div>
                            </div>
                        </div> 

                    </div>
                </div>
            </div>
        </>
    )
}
export default Checkout;