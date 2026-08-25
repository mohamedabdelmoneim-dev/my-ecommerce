import { useState } from "react";
import { createPortal } from "react-dom";

import warningAlertStyles from "../../assets/CSS/General/warning.module.css";

function WarningAlert ({ warningMessage }) {
    const [display, setDisplay] = useState(true);
    if (!display) return null;

    return createPortal (
        <>
            <div className={warningAlertStyles["overlay"]}></div>
            <div className={`${warningAlertStyles["warning"]} py-lg-0`} style={{ border: "1px solid #222222", borderRadius: "15px", backgroundColor: "#141414" }}>
                <h5 className="text-white">{warningMessage}</h5>
                <div className="d-flex flex-wrap gap-xl-4 gap-lg-3 gap-2 justify-content-center">
                    <button type="button" className={`${warningAlertStyles["yes"]} p-lx-3 p-2 fw-bold`} style={{ borderRadius: "15px", width: "10rem" }} onClick={() => setDisplay(!display)}>Yes</button>
                    <button type="button" className={`${warningAlertStyles["no"]} p-lx-3 p-2 bg-danger fw-bold text-white`} style={{ borderRadius: "15px", width: "10rem" }} onClick={() => setDisplay(!display)}>No</button>
                </div>
            </div>
        </>, document.body
    )
}
export default WarningAlert;