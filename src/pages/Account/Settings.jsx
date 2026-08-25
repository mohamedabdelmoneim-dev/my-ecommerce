import { useState, useEffect } from "react";
import Popup from "../../components/Account/Popup";

import { FiUser } from "react-icons/fi";
import { LuShield } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import settingsStyles from "../../assets/CSS/My-Account/settings.module.css"

function Settings () {
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
    const [firstName, setFirstName] = useState("Alex");
    const [lastName, setLastName] = useState("Johnson");
    const [email, setEmail] = useState("alex.johnson@email.com");
    const [phone, setPhone] = useState("+1 (555) 123-4567");
    // const [formData, setFormData] = useState({
    //     firstName: "Alex",
    //     lastName: "Johnson",
    //     email: "alex.johnson@email.com",
    //     phone: "+1 (555) 123-4567",
    // });

    const handleInputChange = (e) => {
        // const { name, value } = e.target;
        // setFormData(prev => ({ ...prev, [name]: value }));
        setFirstName();
        setLastName();
        setEmail();
        setPhone();
    }
    const [showPopup, setShowPopup] = useState(false);

    const handleSaveChanges = (e) => {
        e.preventDefault();
        setShowPopup(true);
        setTimeout(() => {
            document.querySelector(".popup").classList.add("hide");
            setTimeout(() => setShowPopup(false), 300);
        }, 3000);
    }
    const handleCheckBackground = (e) => {
        e.target.classList.toggle("checked");
    }
    return (
        <>
            <div className={`d-flex flex-column gap-4 w-100 animate-section`}>
                <h5 className="text-white fw-bold">Account Settings</h5>
                <div className="px-3 py-4" style={{ borderRadius: "15px", backgroundColor: "#141414", border: "1px solid #222222" }}>
                    <h6 className="text-white fw-bold d-flex align-items-center gap-2"><FiUser style={{ color: "var(--main-color)" }} />Profile Information</h6>
                    
                    <form className={settingsStyles["settings-form"] + " row g-3"}>
                        <div className="col-md-6">
                            <label htmlFor="fNAme" className="form-label">First Name</label>
                            <input type="text" className="form-control p-2" id="fNAme" value={firstName} onChange={e => handleInputChange(e.target.value)} style={{ backgroundColor: "#202020", border: "1px solid #373737", borderRadius: "15px" }} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lName" className="form-label">Last Name</label>
                            <input type="text" className="form-control p-2" id="lName" value={lastName} onChange={e => handleInputChange(e.target.value)} style={{ backgroundColor: "#202020", border: "1px solid #373737", borderRadius: "15px" }} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputEmail14" className="form-label">Email</label>
                            <input type="email" className="form-control p-2" id="inputEmail14" value={email} onChange={e => handleInputChange(e.target.value)} style={{ backgroundColor: "#202020", border: "1px solid #373737", borderRadius: "15px" }} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputPhone14" className="form-label">Phone</label>
                            <input type="tel" className="form-control p-2" id="inputPhone14" value={phone}onChange={e => { const value = e.target.value.replace(/[^0-9+\-\s()]/g, ""); setPhone(value); }} style={{ backgroundColor: "#202020", border: "1px solid #373737", borderRadius: "15px" }} />
                        </div>
                        <div className="col-12">
                            <button type="submit" onClick={handleSaveChanges} className="btn text-white fw-bold" style={{ backgroundColor: "var(--main-color)", fontSize: "14px", borderRadius: "15px", padding: "12px 19px" }}>Save Changes</button>
                            {showPopup && <Popup popupMessage={"Changes Saved Successfully"} />}
                        </div>
                    </form>
                    
                </div>
                <div className={`px-3 py-4 ${settingsStyles["notifications"]}`} style={{ borderRadius: "15px", backgroundColor: "#141414", border: "1px solid #222222" }}>
                    <h6 className="text-white fw-bold d-flex align-items-center gap-2 mb-4"><FaRegBell style={{ color: "var(--main-color)" }} />Notifications</h6>
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-white" style={{ fontSize: "15px" }}>Order Updates</p>
                                <p style={{ color: "#83898A", fontSize: "12px" }}>Shipping and delivery notifications</p>
                            </div>
                            
                            <div className="form-check form-switch">
                                <input className="form-check-input" onClick={handleCheckBackground} type="checkbox" role="switch" id="switchCheckDefault" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-white" style={{ fontSize: "15px" }}>Promotions</p>
                                <p style={{ color: "#83898A", fontSize: "12px" }}>Deals, discounts, and new arrivals</p>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" onClick={handleCheckBackground} type="checkbox" role="switch" id="switchCheckDefault" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-white" style={{ fontSize: "15px" }}>Newsletter</p>
                                <p style={{ color: "#83898A", fontSize: "12px" }}>Weekly style inspiration</p>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" onClick={handleCheckBackground} type="checkbox" role="switch" id="switchCheckDefault" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-3 py-4" style={{ borderRadius: "15px", backgroundColor: "#141414", border: "1px solid #222222" }}>
                    <h6 className="text-white fw-bold d-flex align-items-center gap-2 mb-4"><LuShield style={{ color: "var(--main-color)" }} />Security</h6>
                    <div className="d-flex flex-column">
                        <div className={`${settingsStyles["sec-ele"]} d-flex justify-content-between align-items-center mb-4`} style={{ color: "#B9B8B9", borderBottom: "1px solid #212121" }}>
                            <p style={{ fontSize: "14px" }}>Change Password</p>
                            <MdOutlineKeyboardArrowRight />
                        </div>
                        <div className={`${settingsStyles["sec-ele"]} d-flex justify-content-between align-items-center mb-4`} style={{ color: "#B9B8B9", borderBottom: "1px solid #212121" }}>
                            <p style={{ fontSize: "14px" }}>Two-Factor Authentication</p>
                            <MdOutlineKeyboardArrowRight />
                        </div>
                        <div className={`${settingsStyles["sec-del"]} d-flex justify-content-between align-items-center mb-1`} style={{ color: "#B94C3D" }}>
                            <p style={{ fontSize: "14px", marginBottom: "0" }}>Delete Account</p>
                            <MdOutlineKeyboardArrowRight />
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}
export default Settings;