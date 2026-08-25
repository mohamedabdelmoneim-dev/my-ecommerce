import { LuShield } from "react-icons/lu";

import paymentCardStyles from "../../assets/CSS/My-Account/payment.module.css";

function PaymentCard ({ card }) {
    return (
        <div className="col-12 w-100 p-3" style={{ borderRadius: "15px", backgroundColor: card.background_color }}>
            <div className="d-flex justify-content-between mb-4">
                <p className={paymentCardStyles["typeof-card"]} style={{ fontSize: "14px" }}>{card.typeof_card}</p>
                <div>
                    {
                        card.isDefault
                        ? <><span className="text-white fw-bold" style={{ fontSize: "12px", backgroundColor: "#ffffff5d", borderRadius: "15px", padding: "3px 7px" }}>Default</span> <LuShield style={{ color: "#FFF" }} /> </>
                        : <LuShield style={{ color: "#FFF" }} />
                    }
                </div>
            </div>
            <div className={paymentCardStyles["card-number"]}>
                <h5 className="text-white d-flex">•••• •••• •••• {card.card_number.slice(-4)} </h5>
            </div>
            <div className="d-flex justify-content-between">
                <div>
                    <p className="mb-0" style={{ color: "#ffffffa4", fontSize: "12px" }}>Expires</p>
                    <p className="text-white mb-0">{card.expiry_date}</p>
                </div>
                <div>
                    <button className={`btn ${paymentCardStyles["edit-btn"]}`} style={{ color: "#ffffffa4" }}>Edit</button>
                    <button className={`btn ${paymentCardStyles["remove-btn"]}`} style={{ color: "#ffffffa4" }}>Remove</button>
                </div>
            </div>
        </div>
    )
}
export default PaymentCard;