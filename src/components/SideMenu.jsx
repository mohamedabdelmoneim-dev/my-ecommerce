import SearchBarPopup from "./SeachBarPopup";
import CartAside from "./Cart/CartAside/CartAside";
import LocalStorageContext from "../contexts/LocalstorageContext";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContextProvider";

import logo from "../assets/images/logo.png";

import { CiShop } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { IoMdHelpCircle } from "react-icons/io";
import { FiUser, FiSearch } from "react-icons/fi";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaArrowRight, FaInstagram } from "react-icons/fa6";
import { IoClose, IoGridOutline, IoHome } from "react-icons/io5";
import { FiRefreshCw, FiTwitter, FiYoutube, FiFacebook } from "react-icons/fi";

import sideMenuStyles from "../assets/CSS/General/side-menu.module.css";


function SideMenu({ onClose }) {
    const [showAsideCart, setShowAsideCart] = useState(false)
    const [isClosing, setIsClosing] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
 
    const handleShowSearch = () => {{
        setShowSearch(!showSearch);
    }}
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => onClose(), 300);
    }
    const handleCloseOnSideMenu = () => {
        setIsClosing(true);
        onClose();
    }
    const {cart} = useContext(CartContext);
    const { localStorageLength, setLocalStorageLength } = useContext(LocalStorageContext)
    
    const [localStorageCount, setLocalStorageCount] = useState(localStorageLength)
        useEffect(() => {
            const wishlistCount = Object.keys(localStorage).filter(key => key.startsWith("product_card")).length == 0 ? 0 : Object.keys(localStorage).filter(key => key.startsWith("product_card")).length ;
            setLocalStorageCount(wishlistCount);
    }, [localStorageLength])
    const navigate = useNavigate();
    useEffect(() => {
        const allElements = document.querySelectorAll(".animate-section-side > *");
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
    return createPortal (
        <>
            <div className={`${sideMenuStyles["overlay"]} ${isClosing ? sideMenuStyles["closing"] : ""}`} onClick={handleClose}></div>
            <div className={`${sideMenuStyles["side-menu"]} position-fixed p-4`} style={{ backgroundColor: "#0F0F0F", top: 0, right: 0, height: "100vh", zIndex: "999", width: "100%", animation: isClosing ? "slideOut 0.3s ease forwards" : "slide 0.3s ease" }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className={sideMenuStyles["logo"]}>
                        <img onClick={() => navigate('/')} src={logo} className={sideMenuStyles["logo"]} alt="Logo" style={ { width: '90px', cursor: 'pointer'} } />
                    </div>
                    <div className="d-flex align-items-center justify-content-end mb-4">
                    <nav className="icons-nav pt-1">
                        <ul className="nav d-flex align-items-center justify-content-end">
                            <li className="nav-item">
                                <Link style={{ color: "#B5B5B5" }} className="nav-link pt-1" to="#" onClick={() => handleShowSearch()}><FiSearch  /></Link>
                                {showSearch && <SearchBarPopup onClose={() => setShowSearch(false)} handleCloseOnSideMenu={handleCloseOnSideMenu} />}
                            </li>
                            
                            
                            
                        </ul>
                    </nav>
                    <button onClick={handleClose} className={`${sideMenuStyles["side-menu-close"]} text-center d-flex justify-content-center align-items-center p-1`} aria-label="Close" style={{ color: "#B5B5B5", fontSize: "24px", backgroundColor: "transparent", border: "none", height: "fit-content" }}>
                        <IoClose />
                    </button>
                </div>
                </div>
                <ul className="nav d-flex gap-2 flex-column animate-section-side">
                    <li className="nav-item"><Link onClick={() => onClose()} style={{ color: "#CECECE", fontSize: "25px", fontWeight: "bold" }} to="/home" className="nav-link w-100 p-3 d-flex gap-3 align-items-center"><IoHome /> Home</Link></li>
                    <li className="nav-item"><Link onClick={() => onClose()} style={{ color: "#CECECE", fontSize: "25px", fontWeight: "bold" }} to="/shop" className="nav-link w-100 p-3 d-flex gap-3 align-items-center"><RiShoppingBag4Fill /> Shop</Link></li>
                    <li className="nav-item"><Link onClick={() => onClose()} style={{ color: "#CECECE", fontSize: "25px", fontWeight: "bold" }} to="/shop" className="nav-link w-100 p-3 d-flex gap-3 align-items-center"><IoGridOutline /> Collections</Link></li>
                    <li className="nav-item nav-heart position-relative">
                        <div className={`${sideMenuStyles["header-icon-counter"]} ${localStorageCount !== 0 ? "d-flex" : "d-none"}`}><p className="fw-bold mb-0" style={{ fontSize: "12px", color: "#FFF" }}>{localStorageCount !== 0 ? localStorageCount : ""}</p></div>
                        <Link onClick={() => onClose()} style={{ color: "#CECECE", fontSize: "25px", fontWeight: "bold" }} className="nav-link p-3 d-flex gap-3 align-items-center" to="/account/wishlist"><FaRegHeart /> Favourites</Link>
                    </li>
                    <li className="nav-item">
                        <Link onClick={() => onClose()} style={{ color: "#CECECE", fontSize: "25px", fontWeight: "bold" }} className="nav-link p-3 d-flex gap-3 align-items-center" to="/account/orders"><FiUser /> Account</Link>
                    </li>
                    <li className="nav-item position-relative">
                        <div className={`${sideMenuStyles["header-icon-counter"]} ${cart.length !== 0 ? "d-flex" : "d-none"}`}><p className="fw-bold mb-0" style={{ fontSize: "12px", color: "#FFF" }}>{cart.length > 0 ? cart.reduce((sum, item) => sum + item.quantity, 0) > 9 ? "9+" : cart.reduce((sum, item) => sum + item.quantity, 0) : ""}</p></div>
                        <div className={`nav-link p-3 ${sideMenuStyles["cart-link"]} d-flex gap-3 align-items-center`} style={{ cursor: "pointer", color: "#CECECE", fontSize: "25px", fontWeight: "bold" }} onClick={() => { setShowAsideCart(true); handleClose(); }}><LuShoppingBag style={{ color: "#B5B5B5" }} /> Cart</div>
                        {showAsideCart && <CartAside onClose={() => setShowAsideCart(false)} />}
                    </li>
                </ul>
                <div className={`${sideMenuStyles["side-menu-socials-support-wrapper"]} mt-4 gap-3`}>
                    <div className={`${sideMenuStyles["side-menu-socials"]} w-50`}>
                        <h4 className="mb-4 fw-bold text-white ">Follow Us</h4>
                        <ul className=" mt-0 d-flex flex-column gap-4 align-items-center justify-content-start flex-wrap">
                            <li className="w-100 d-flex">
                                <div className="list-group-item border-0" style={{ backgroundColor: "transparent" }}>
                                    <Link className="d-flex align-items-center gap-3" style={{ color: "#CECECE", padding: "8px 12px" }}>
                                        <span style={{ backgroundColor: "#171717", padding: "8px 12px", borderRadius: "10px" }}><FaInstagram  style={{ color: '#6F7072'  }} /></span> Instagram
                                    </Link>
                                </div>
                                <div className="list-group-item border-0" style={{ backgroundColor: "transparent" }}>
                                    <Link className="d-flex align-items-center gap-3" style={{ color: "#CECECE", padding: "8px 12px", borderRadius: "10px" }}>
                                        <span style={{ backgroundColor: "#171717", padding: "8px 12px", borderRadius: "10px" }}><FiTwitter  style={{ color: '#6F7072'  }} /></span> Twitter
                                    </Link>
                                </div>
                            </li>
                            <li className="w-100 d-flex">
                                <div className="list-group-item border-0" style={{ backgroundColor: "transparent" }}>
                                    <Link className="d-flex align-items-center gap-3" style={{ color: "#CECECE", padding: "8px 12px", borderRadius: "10px" }}>
                                        <span style={{ backgroundColor: "#171717", padding: "8px 12px", borderRadius: "10px" }}><FiYoutube  style={{ color: '#6F7072'  }} /></span> Youtube
                                    </Link>
                                </div>
                                <div className="list-group-item border-0" style={{ backgroundColor: "transparent" }}>
                                    <Link className="d-flex align-items-center gap-3" style={{ color: "#CECECE", padding: "8px 12px", borderRadius: "10px" }}>
                                        <span style={{ backgroundColor: "#171717", padding: "8px 12px", borderRadius: "10px" }}><FiFacebook  style={{ color: '#6F7072'  }} /></span> Facebook
                                    </Link>
                                </div>

                            </li>
                        </ul>
                    </div>
                    <div className={sideMenuStyles["break-bar"]}></div>
                    <div className={sideMenuStyles["side-menu-support"]}>
                        <h4 className="mb-4 fw-bold text-white ">Support</h4>
                        <ul className=" mt-0 d-flex flex-column gap-4 align-items-center justify-content-start flex-wrap">
                            <li className="w-100 d-flex">
                                <div className="list-group-item border-0" style={{ backgroundColor: "transparent" }}>
                                    <Link className="d-flex align-items-center gap-3" style={{ color: "#CECECE", padding: "8px 12px" }}>
                                        <span style={{ backgroundColor: "#171717", padding: "8px 12px", borderRadius: "10px" }}><FiRefreshCw  style={{ color: '#6F7072'  }} /></span> Return Policy
                                    </Link>
                                </div>
                                <div className="list-group-item border-0" style={{ backgroundColor: "transparent" }}>
                                    <Link className="d-flex align-items-center gap-3" style={{ color: "#CECECE", padding: "8px 12px", borderRadius: "10px" }}>
                                        <span style={{ backgroundColor: "#171717", padding: "8px 12px", borderRadius: "10px" }}><CiShop  style={{ color: '#6F7072'  }} /></span> Shipping Info
                                    </Link>
                                </div>
                            </li>
                            <li className="w-100 d-flex">
                                <div className="list-group-item border-0" style={{ backgroundColor: "transparent" }}>
                                    <Link className="d-flex align-items-center gap-3" style={{ color: "#CECECE", padding: "8px 12px", borderRadius: "10px" }}>
                                        <span style={{ backgroundColor: "#171717", padding: "8px 12px", borderRadius: "10px" }}><IoMdHelpCircle  style={{ color: '#6F7072'  }} /></span> FAQ
                                    </Link>
                                </div>
                                <div className="list-group-item border-0" style={{ backgroundColor: "transparent" }}>
                                    <Link className="d-flex align-items-center gap-3" style={{ color: "#CECECE", padding: "8px 12px", borderRadius: "10px" }}>
                                        <span style={{ backgroundColor: "#171717", padding: "8px 12px", borderRadius: "10px" }}><IoMdHelpCircle  style={{ color: '#6F7072'  }} /></span> Contact Us
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>, document.body
    );
}
export default SideMenu;