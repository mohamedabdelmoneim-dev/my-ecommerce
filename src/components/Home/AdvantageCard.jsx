import React from "react";

import advStyles from "../../assets/CSS/Home/some-advantages.module.css";

function AdvantageCard ({ advIcon, advTitle, advDesc }) {
    return (
        <div className={`d-flex flex-column align-items-center ${advStyles["adv-card"]} text-center py-3`} style={{ backgroundColor: "#161616", borderRadius: "15px", border: "solid 1px ", width: "24%" }}>
            <div className={`adv-icon mb-3 ${advStyles["adv-icon"]}`} style={{ backgroundColor: "#2E1C18", borderRadius: "15px", transition: "0.3s", padding: "15px", border: "1px solid #58251B" }}>
                {/* <BsTruck style={{ fill: "#FF4B26", fontSize: "18px" }} /> */}
                {React.cloneElement(advIcon, { style: { color: "#FF4B26", fontSize: "22px" } })}
            </div>
            <p className={`text-white fw-bold mb-1 ${advStyles["adv-title"]}`}>{advTitle}</p>
            <p className={advStyles["adv-desc"]} style={{ color: "var(--text-color)", fontSize: "13px" }}>{advDesc}</p>
        </div>
    )
}
export default AdvantageCard;