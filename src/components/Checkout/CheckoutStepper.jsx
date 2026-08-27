import { useEffect, useRef, useState } from "react";

import { FaCheck } from "react-icons/fa6";

import stepperStyles from "../../assets/CSS/Checkout/stepper.module.css";

function CheckoutStepper ({ steps = [], currentStep, isComplete }) {
    const [margins, setMargins] = useState({
        marginLeft: 0,
        marginRight: 0,
    })
    const stepRef = useRef([])
    useEffect(() => {
        setMargins({
            marginLeft: stepRef.current[0].offsetWidth / 2,
            marginRight: stepRef.current[steps.length - 1].offsetWidth / 2,
        })
    }, [stepRef.current])
    if(!steps.length) {
        return <></>;
    }
    const calculateProgressBarWidth = () => {
        return ((currentStep - 1) / (steps.length - 1)) * 100;
    }
    return (
        <>
            <div className={`${stepperStyles["stepper"]} d-flex justify-content-evenly align-items-center gap-5 position-relative w-lg-75 w-100`}>
                {
                    steps.map((step, index) => {
                        return (
                            <div style={{ backgroundColor: "#0D0D0D", zIndex: 6, width: "70px" }}>
                                <div
                                    className={`${stepperStyles["step"]} d-flex flex-column align-items-center  gap-2 ${currentStep > index + 1 || isComplete ? stepperStyles["complete"] : ""} ${currentStep === index + 1 ? stepperStyles["checkout-active"] : ""}`}
                                    key={step.name}
                                    ref={el => (stepRef.current[index] = el)}
                                    >
                                    <div className={stepperStyles["step-num"]}>
                                        <p className="mb-0">{
                                            currentStep > index + 1 || isComplete ? (
                                            <span><FaCheck style={{ color: "#FFF" }} /></span>
                                        ) : (
                                            index + 1
                                        )}</p>
                                        </div>
                                    <div className={`${stepperStyles["step-name"]} ${currentStep === index + 1 ? "text-white" : ""}`}>{step.name}</div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className={stepperStyles["progress-bar"]} style={{ width: `calc(100%) - ${margins.marginLeft + margins.marginRight}px` }}>
                    <div className={stepperStyles["progress"]} style={{ width: `${calculateProgressBarWidth()}%` }}></div>
                </div>
            </div>
        
        </>
    )
}
export default CheckoutStepper;