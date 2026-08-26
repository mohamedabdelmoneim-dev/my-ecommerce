import WarningAlert from "../../components/Account/WarningAlert";

import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import myImage from "../../assets/images/testimonials/testinmonials_02.jpg";

import { BsBoxSeam } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { PiSignOutBold } from "react-icons/pi";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import myAccountStyles from "../../assets/CSS/My-Account/my-account.module.css";

function Account () {
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
    const [signOut, setSignOut] = useState(false);
    const handleSignOut = (e) => {
        setSignOut(!signOut);
    }
    return (
        <>
            <div className={`mt-5 ${myAccountStyles["account-page"]} mb-5 ${myAccountStyles["animate-section"]}`} style={{ paddingTop: "64px",}}>
                <div className="mb-5" style={{ backgroundColor: "#141414", padding: "20px", borderBottom: "1px solid #242424", }}>
                    <div className="container">
                        <div className={myAccountStyles["account-content-container"]}>
                            <div className="container-fluid" style={{ width: "100%" }}>
                                <ul className="nav mb-3" style={{ fontSize: "13px" }}>
                                    <li className="nav-item" style={{ color: "#4D5556" }}>
                                        <Link to="/home" className="home-page" style={{ color: "#4D5556", transition: "0.3s" }}>Home </Link>
                                        <span className="mx-1">/</span>
                                    </li>
                                    <li className="nav-item" style={{ color: "#B1AEB1" }}>
                                        Account
                                    </li>
                                </ul>
                                <h2 className="text-white" style={{ fontWeight: 800 }}>My Account</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-4">
                    <div className={myAccountStyles["account-content-container"]}>
                        <div className="row gap-xl-3 gap-5">
                            <div className="col-xl-3 col-12 d-flex flex-column gap-4">
                                <div className="py-4 px-3 " style={{ backgroundColor: "#141414", border: "1px solid #242424", borderRadius: "15px" }}>
                                    <div className={`${myAccountStyles["account-profile-personal-details"]} d-flex align-items-start gap-3 mb-3`}>
                                        <div className={`${myAccountStyles["account-image"]} position-relative`}>
                                            <img src={myImage} alt="" width="65px" style={{ borderRadius: "15px" }} />
                                            <div className="position-absolute text-center text-white" style={{ paddingTop: "2px", width: "23px", height: "23px", backgroundColor: "var(--main-color)", right: "-5px", borderRadius: "50%", top: "80%", fontSize: "13px" }}><LuPencilLine /></div>
                                        </div>
                                        <div className={myAccountStyles["account-profile-meta"]}>
                                            <h5 className="text-white fw-bold mb-1" style={{ fontSize: "18px" }}>Alex Johnson</h5>
                                            <p className={myAccountStyles["account-profile-email"]} style={{ color: "#6F6D6F", marginBottom: "3px", fontSize: "14px" }}>alex.jhonson@email.com</p>
                                            <p className="px-2 text-center mb-0 fw-bold" style={{ color: "#FFB402", paddingTop: "2px", paddingBottom: "2px", fontSize: "12px", backgroundColor: "#372811", width: "fit-content", borderRadius: "8px", border: "1px solid #FFB402" }}>Gold Member</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="" style={{ padding: "12px 12px", backgroundColor: "#1D1D1D", borderRadius: "15px", border: "1px solid #2F2F2F" }}>
                                            <div className="d-flex justify-content-between">
                                                <p style={{ color: "#848D8B", fontSize: "12.5px", marginBottom: 0 }}>Loyalty Points</p>
                                                <FaStar style={{ fill: "#FBBF24" }} />
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="text-white fw-bold" style={{ fontSize: "18px", marginBottom: 0 }}>4,820</p>
                                                <p style={{ color: "#5D605D", fontSize: "12.5px", marginBottom: 0 }}>= $48.20 credit</p>
                                            </div>
                                            <div className={myAccountStyles["progress-div"]}>
                                                <progress value={4820} max={5500} />
                                            </div>
                                            <p style={{ color:"#5D605D", fontSize: "12px", marginBottom: 0 }}>{5500 - 4820} pts until Platinum</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <ul className={`list-group ${myAccountStyles["account-list-group"]}`}>
                                        <li className={`list-group-item ${myAccountStyles["list-group-item-account"]} ${myAccountStyles["account-list-group-header"]}`}>
                                            <NavLink to="/account/orders" className={({ isActive }) => `nav-link ${isActive ? `${myAccountStyles["active"]} ${myAccountStyles["text-fcs"]}` : ""} d-flex justify-content-between align-items-center`}>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <BsBoxSeam />
                                                    Orders
                                                </div>
                                                <MdOutlineKeyboardArrowRight />
                                            </NavLink>
                                        </li>
                                        <li className={`list-group-item ${myAccountStyles["list-group-item-account"]}`}>
                                            <NavLink to="/account/wishlist" className={({ isActive }) => `nav-link ${isActive ? `${myAccountStyles["active"]} ${myAccountStyles["text-fcs"]}` : ""} d-flex justify-content-between align-items-center`}>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <FaRegHeart />
                                                    Wishlist
                                                </div>
                                                <MdOutlineKeyboardArrowRight />
                                            </NavLink>
                                        </li>
                                        <li className={`list-group-item ${myAccountStyles["list-group-item-account"]}`}>
                                            <NavLink to="/account/address" className={({ isActive }) => `nav-link ${isActive ? `${myAccountStyles["active"]} ${myAccountStyles["text-fcs"]}` : ""} d-flex justify-content-between align-items-center`}>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <SlLocationPin />
                                                    Address
                                                </div>
                                                <MdOutlineKeyboardArrowRight />
                                            </NavLink>
                                        </li>
                                        <li className={`list-group-item ${myAccountStyles["list-group-item-account"]}`}>
                                            <NavLink to="/account/payment" className={({ isActive }) => `nav-link ${isActive ? `${myAccountStyles["active"]} ${myAccountStyles["text-fcs"]}` : ""} d-flex justify-content-between align-items-center`}>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <MdPayment />
                                                    Payment
                                                </div>
                                                <MdOutlineKeyboardArrowRight />
                                            </NavLink>
                                        </li>
                                        <li className={`list-group-item ${myAccountStyles["list-group-item-account"]}`}>
                                            <NavLink to="/account/settings" className={({ isActive }) => `nav-link ${isActive ? `${myAccountStyles["active"]} ${myAccountStyles["text-fcs"]}` : ""} d-flex justify-content-between align-items-center`}>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <IoSettingsOutline />
                                                    Settings
                                                </div>
                                                <MdOutlineKeyboardArrowRight />
                                            </NavLink>
                                        </li>
                                        <li className={`list-group-item ${myAccountStyles["list-group-item-account"]} ${myAccountStyles["sign-out"]}`} onClick={handleSignOut} style={{ cursor: "pointer" }}>
                                            <PiSignOutBold />
                                            Sign Out
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {signOut ? <WarningAlert warningMessage={"Are You Sure to Sign Out?"} /> : ""}
                            <div className="col-xl-8 col-12">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Account;