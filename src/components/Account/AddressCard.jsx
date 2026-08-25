import { IoLocationOutline } from "react-icons/io5";

import addressCardStyles from "../../assets/CSS/My-Account/addresses.module.css";

function AddressCard ({ key, address }) {
    return (
        <div className="col">
            <div className="card p-2" style={{ backgroundColor: "#141414", borderRadius: "15px", border: "1px solid #222222" }}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="card-title text-white d-flex align-items-center gap-1"><IoLocationOutline style={{ color: "var(--main-color)", fontSize: "18px" }} /> {address.address_name}</p>
                        <p className={address.isDefault ? "d-block" : "d-none"} style={{ color: "var(--main-color)", backgroundColor: "#371C17", border: "1px solid #5B241A", borderRadius: "8px", padding: "1px 7px", marginBottom: 0, fontSize: "13px" }}>
                            {address.isDefault ? "Default" : ""}
                        </p>
                    </div>
                    <p className="card-text w-50 mb-4" style={{ color: "var(--text-color)", fontSize: "14px" }}>
                        {address.building_number} {address.street}, {address.apartment_suite} {address.apartment_suite_number}, {address.city}, {address.state} {address.zip_code} {address.country}
                    </p>
                    <div className="d-flex">
                        {
                        address.isDefault
                            ? <div className="d-flex align-items-center" style={{ height: "fit-content" }}>
                                <button className={`${addressCardStyles["address-btn"]} btn ${addressCardStyles["edit-btn"]}`}>Edit</button> 
                                <span style={{ width: "2.5px", height: "2.5px", backgroundColor: "var(--text-color)", marginRight : "10px" }}></span>
                                <button className={`${addressCardStyles["address-btn"]} btn ${addressCardStyles["delete-btn"]}`}>Delete</button>
                            </div>
                            : <div className="d-flex align-items-center" style={{ height: "fit-content" }}>
                                <button className={`${addressCardStyles["address-btn"]} btn ${addressCardStyles["edit-btn"]}`}>Edit</button> 
                                <span style={{ width: "2.5px", height: "2.5px", backgroundColor: "var(--text-color)", marginRight : "10px" }}></span>
                                <button className={`${addressCardStyles["address-btn"]} btn ${addressCardStyles["set-default-btn"]}`}>Set as Default</button>
                                <span style={{ width: "2.5px", height: "2.5px", backgroundColor: "var(--text-color)", marginRight : "10px" }}></span>
                                <button className={`${addressCardStyles["address-btn"]} btn ${addressCardStyles["delete-btn"]}`}>Delete</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddressCard;