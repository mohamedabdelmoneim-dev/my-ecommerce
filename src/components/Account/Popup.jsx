import { createPortal } from "react-dom";

import { IoMdCheckmark, IoMdClose } from "react-icons/io";

import popupStyles from "../../assets/CSS/General/popup.module.css";

function Popup({ popupMessage }) {
    const handleClosingPopup = () => {
        document.querySelector(".popup").classList.add("hide");
        setTimeout(() => setShowPopup(false), 300);
    }
    return createPortal(
        <div className={`${popupStyles["popup"]} alert`} style={{ color: "#FFF", border: "1px solid #18CD60", }} role="alert">
            <IoMdCheckmark style={{ borderRadius: "50%", color: "#18CD60", }} /> {popupMessage}
            <IoMdClose onClick={handleClosingPopup} style={{ marginLeft: "10px", cursor: "pointer" }} />
        </div>, document.body
    )
}
export default Popup;