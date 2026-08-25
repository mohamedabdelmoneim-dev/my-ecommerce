import SideMenu from "./SideMenu";
import SearchBarPopup from "./SeachBarPopup";
import CartAside from "./Cart/CartAside/CartAside";
import SearchContext from "../contexts/SearchContext";
import ProductsContext  from "../contexts/ProductsContext";
import { CartContext } from "../contexts/CartContextProvider";
import LocalStorageContext from "../contexts/LocalstorageContext";

import { useEffect, useState, useContext } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import logo from "../assets/images/logo.png";

import { IoMenu } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { FiUser, FiSearch } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";

import headerStyles from "../assets/CSS/General/header.module.css";

 
const navLinks = [
    {title: "Home", link: "/home"},
    {title: "Shop", link: "/shop"}
]
function Header () {
    const location = useLocation();
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector("header");
            if (window.scrollY > 20) {
                header.style.backgroundColor = "#0A0A0A";
            } else {
                header.style.backgroundColor = "transparent";
            }
        };
 
        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const { localStorageLength, setLocalStorageLength } = useContext(LocalStorageContext)
    const { products } = useContext(ProductsContext)
    const seen = new Set();
    const unique = products ? products["products"].filter(prod => {
        if (seen.has(prod.category)) return false;
        seen.add(prod.category);
        return true;
    }) : [];
    const [localStorageCount, setLocalStorageCount] = useState(localStorageLength)
    useEffect(() => {
        const wishlistCount = Object.keys(localStorage).filter(key => key.startsWith("product_card")).length == 0 ? 0 : Object.keys(localStorage).filter(key => key.startsWith("product_card")).length ;
        setLocalStorageCount(wishlistCount);
    }, [localStorageLength])
    const { search, setSearch } = useContext(SearchContext);
    const [showSearch, setShowSearch] = useState(false);
 
    const handleShowSearch = () => {{
        setShowSearch(!showSearch);
    }}
    const {cart} = useContext(CartContext);
    const [showAsideCart, setShowAsideCart] = useState(false)
    const navigate = useNavigate();
    const [showsideMenu, setShowSideMenu] = useState(false);
    const handleSideMenu = () => {
        setShowSideMenu(!showsideMenu);
    }
    
    return (
        <>
            <header className="d-flex between align-items-center mb-5" style={ { height: '64px' } }>
                <div className="position-relative container d-flex justify-content-between align-items-center p-0">
                    
                    <div className={headerStyles["logo"]}>
                        <img onClick={() => navigate('/')} src={logo} className={headerStyles["logo"]} alt="Logo" style={ { width: '90px', cursor: 'pointer'} } />
                    </div>
                    <nav className="navbar navbar-expand-lg">
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className={`navbar-nav ${headerStyles["links"]} d-flex align-items-center justify-content-center`}>
                                {
                                    navLinks.map(item => {
                                        return(
                                            <li className="nav-item">
                                                {
                                                    item.title !== "Collections" ? <NavLink className={`nav-link ${location.pathname === "/" && item.title == "Home" ? "active" : location.pathname === item.link ? "active" : ""}`} aria-current="page" to={item.link} style={{ fontSize: "13px" }}>{item.title}</NavLink>
                                                    : <>
                                                        <NavLink className="nav-link" to="/shop" role="button" aria-expanded="false" style={{ fontSize: "13px" }}> Collections <RiArrowDropDownLine  style={ { fontSize: '28px' } } className={headerStyles["dropdown-arrow"]} /> </NavLink>
                                                        <ul className="dropdown-menu position-absolute" style={ { left:'-50px' } }>
                                                            <li><Link className="dropdown-item w-100" to="#" >New Arrivals</Link></li>
                                                            <li><Link className="dropdown-item w-100" to="#">Electronics</Link></li>
                                                            <li><Link className="dropdown-item w-100" to="#">Fashion</Link></li>
                                                            <li><Link className="dropdown-item w-100" to="#">Home & Living</Link></li>
                                                        </ul>
                                                    </>
                                                }
                                            </li>
                                        )
                                    })
                                }
                                <li className="nav-item dropdown position-realtive">
                                    <NavLink className="nav-link" to="/shop" role="button" aria-expanded="false">
                                        Collections <RiArrowDropDownLine  style={ { fontSize: '28px' } } className={headerStyles["dropdown-arrow"]} />
                                    </NavLink>
                                    <ul className="dropdown-menu position-absolute" style={ { left:'-50px', maxHeight: "200px", overflowY: "scroll" } }>
                                        {
                                            unique.slice(0).map(prod => {{
                                                return (prod + 1).category !== prod.category
                                                ? <li>
                                                    <Link className="dropdown-item w-100" to={`/shop/${prod.category}`}>{ prod.category }</Link>
                                                </li>
                                                : "";
                                            }})
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <nav className={headerStyles["icons-nav"]}>
                        <ul className="nav d-flex align-items-center justify-content-end">
                            <li className="nav-item">
                                <Link className="nav-link pt-1" to="#" onClick={() => handleShowSearch()}><FiSearch  /></Link>
                                {showSearch && <SearchBarPopup onClose={() => setShowSearch(false)} />}
                            </li>
                            <li className="nav-item nav-heart position-relative">
                                <div className={`${headerStyles["header-icon-counter"]} ${localStorageCount !== 0 ? "d-flex" : "d-none"}`}><p className="fw-bold mb-0" style={{ fontSize: "12px", color: "#FFF" }}>{localStorageCount !== 0 ? localStorageCount : ""}</p></div>
                                <Link className="nav-link pt-1" to="/account/wishlist"><FaRegHeart /></Link>
                            </li>
                            <li className="nav-item">
            
                                <Link className="nav-link pt-1" to="/account/orders"><FiUser /></Link>
                            </li>
                            <li className="nav-item position-relative">
                                <div className={`${headerStyles["header-icon-counter"]} ${cart.length !== 0 ? "d-flex" : "d-none"}`}><p className="fw-bold mb-0" style={{ fontSize: "12px", color: "#FFF" }}>{cart.length > 0 ? cart.reduce((sum, item) => sum + item.quantity, 0) > 9 ? "9+" : cart.reduce((sum, item) => sum + item.quantity, 0) : ""}</p></div>
                                <div className={`nav-link pt-1 text-white ${headerStyles["cart-link"]}`} style={{ cursor: "pointer" }} onClick={() => setShowAsideCart(true)}><LuShoppingBag /></div>
                                {showAsideCart && <CartAside onClose={() => setShowAsideCart(false)} />}
                            </li>
                        
                            <button style={{ backgroundColor: "transparent" }} className={`${headerStyles["header-burger"]} d-lg-none d-flex align-items-center justify-content-center`} onClick={handleSideMenu}>
                                <IoMenu style={{ fontSize: "24px", color: "#FFF" }} />
                            </button>
                            {showsideMenu && <SideMenu onClose={() => setShowSideMenu(false)} />}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}
 
export default Header;