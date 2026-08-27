import ProductsContext from "../../contexts/ProductsContext";

import { createPortal } from "react-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { IoClose } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { FaStar } from "react-icons/fa";

import asideRadioStyles from "../../assets/CSS/Shop/aside-radio.module.css";
import asideShopStyles from "../../assets/CSS/Shop/shop-aside.module.css";
import shopFiltersSmallStyles from "../../assets/CSS/Shop/shop-filters-small-device.module.css";
import inputStyles from "../../assets/CSS/Shop/input-shop.module.css";
import Input from "./Input";

function ShopFiltersSmallDevice ({ asideCategory, asideSetCategory, asideMaxPrice, asideSetMaxPrice, asideRate, asideSetRate, asideSearchBar, handleSearcing, onClose }) {
    const { products } = useContext(ProductsContext);
    const [isClosing, setIsClosing] = useState(false);

    const sheetRef = useRef(null);
    const dragStartY = useRef(0);
    const dragCurrentY = useRef(0);
    const isDragging = useRef(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => onClose(), 300);
    }

    // ---- Drag to dismiss (Pointer Events: works with touch, mouse, pen) ----
    const handlePointerDown = (e) => {
        console.log("Pointer down:", e.clientY);
        dragStartY.current = e.clientY;
        isDragging.current = true;
        e.target.setPointerCapture(e.pointerId);
        if (sheetRef.current) sheetRef.current.style.transition = "none";
    };

    const handlePointerMove = (e) => {
        if (!isDragging.current) return;
        const diff = e.clientY - dragStartY.current;
        if (diff > 0) {
            dragCurrentY.current = diff;
            requestAnimationFrame(() => {
                if (sheetRef.current) {
                    sheetRef.current.style.transform = `translateY(${diff}px)`;
                }
            });
        }
    };

    const handlePointerUp = () => {
        if (!isDragging.current || !sheetRef.current) return;
        isDragging.current = false;
        sheetRef.current.style.transition = "transform 0.3s ease";

        const threshold = sheetRef.current.offsetHeight * 0.25;

        if (dragCurrentY.current > threshold) {
            sheetRef.current.style.transform = "translateY(100%)";
            setTimeout(() => onClose(), 300);
        } else {
            sheetRef.current.style.transform = "translateY(0)";
        }
        dragCurrentY.current = 0;
    };
    // --------------------------------------------------------------------

    if (!products) return <div className="d-flex justify-content-center align-items-center w-100">
        <div className="spinner-border" style={{ color: "var(--main-color)" }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>;
    const seen = new Set();
    const unique = products ? products["products"].filter(prod => {
        if (seen.has(prod.category)) return false;
        seen.add(prod.category);
        return true;
    }) : "";
    const categories = ["All", ...unique.map(prod => prod.category)];
    const searchLower = asideSearchBar.toLowerCase();

    const searchMatchesCategory = products.products.some(p =>
        p.category.toLowerCase().includes(searchLower)
    );

    const filteredProducts = products.products.filter(product => {
        const categoryMatch = asideCategory === "All" || product.category === asideCategory;
        const priceMatch = product.price <= asideMaxPrice;
        const rateMatch = asideRate === 0 || product.rating >= asideRate;

        let searchMatch;
        if (asideSearchBar === "") {
            searchMatch = true;
        } else if (searchMatchesCategory) {
            searchMatch = product.category.toLowerCase().includes(searchLower);
        } else {
            searchMatch = product.title.toLowerCase().includes(searchLower);
        }

        return categoryMatch && priceMatch && rateMatch && searchMatch;
    });
    const filterCounter = (asideCategory !== "All" ? 1 : 0) + 
        (asideMaxPrice < 36990 ? 1 : 0) + 
        (asideRate > 0 ? 1 : 0);
    const navigate = useNavigate();
    const maxAvailablePrice = Math.max(...products.products.map(product => product.price), 0);
    const asideClearFilters = () => {
        asideSetCategory("All");
        asideSetMaxPrice(maxAvailablePrice);
        asideSetRate(0);
        navigate("/shop");
        onClose();
    }
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
    return createPortal (
        <>
            <div className={`${shopFiltersSmallStyles["shop-filters-overlay"]} ${isClosing ? shopFiltersSmallStyles["closing"] : ""}`} onClick={handleClose}></div>
            <div ref={sheetRef} className={`${shopFiltersSmallStyles["animate-section"]} ${shopFiltersSmallStyles["shop-filters-small-device"]} position-fixed d-flex flex-column align-items-start px-4 py-4`} style={{ width: "100%",  backgroundColor: "#111111",  border: "1px solid #2F2F2F",  borderRadius: "15px",  zIndex: 9999,  bottom: 0,  left: 0,  height: "85vh",  animationName: isClosing ? shopFiltersSmallStyles["slideUpOut"] : shopFiltersSmallStyles["slideUp"], animationDuration: "0.3s", animationTimingFunction: "ease", animationFillMode: isClosing ? "forwards" : "none" }}>
                
                {/* Drag Handle */}
                <div
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    style={{ width: "100%", display: "flex", justifyContent: "center", padding: "4px 0 12px", touchAction: "none", cursor: "grab" }}
                >
                    <span style={{ width: "40px", height: "5px", borderRadius: "10px", backgroundColor: "#3A3A3A" }}></span>
                </div>

                <div className={`${shopFiltersSmallStyles["animate-section"]} d-flex align-items-center justify-content-between w-100`}>
                    <h5 className="text-white mb-0 fw-bold">Filters</h5>
                    <button className="" onClick={handleClose} style={{ backgroundColor: "#242424", borderRadius: "12px", padding: "5px 8px", border: "none" }}>
                        <IoClose style={{ color: "#A7A7A7", fontSize: "1.10rem" }} />
                    </button>
                </div>
                <div className={`${shopFiltersSmallStyles["animate-section"]} mt-4 w-100`}>
                    <label htmlFor="search" className={`${inputStyles["search-label"]} form-label text-white fw-bold`}>Search</label>
                    <div>
                        <Input handleSearcing={handleSearcing} />
                    </div>
                </div>
                <div className={`${asideShopStyles["animate-section"]} mt-4 w-100`}>
                    <h6 htmlFor="category" className={`${asideShopStyles["category-label"]} form-label text-white fw-bold`}>Category</h6>
                    <ul className="ps-0" style={{ width: "100%" }}>
                        {
                            categories.map(cat => {
                                return <li key={cat} onClick={() => setIsClosing(true)} className={`list-group-item p-0 mb-1 ${asideShopStyles["shop-aside-btn"]}`} style={{ borderRadius: "10px", fontSize: "14px", transition: "0.3s" }}><NavLink to={`/shop/${cat}`} className={({ isActive }) => {
                                    const isAllDefault = cat === "All" && location.pathname === "/shop";
                                    return `${isActive || isAllDefault ? asideShopStyles["aside-active"] : ""} px-3 py-2 d-flex align-items-center justify-content-between`;
                                }} style={{ width: "100%", display: "block", borderRadius: "10px", color: "#888788"}} onClick={() => {asideSetCategory(cat)}}>{cat} <span>{cat == "All" ? products.products.length : products.products.filter(prod => prod.category === cat).length}</span></NavLink></li>
                                
                            })
                        }
                    </ul>
                </div>
                <div className={`animate-section mt-4 w-100`}>
                    <h6 htmlFor="price" className={`${shopFiltersSmallStyles["price-label"]} form-label text-white fw-bold`}>Price Range</h6>
                    <div className="d-flex">
                        <input id="range1" className={`form-range me-3 ${shopFiltersSmallStyles["price-range"]}`} type="range" min={0} max={Math.max(...products.products.map(prod => prod.price), 0)} step={10} value={asideMaxPrice} onChange={(e) => {asideSetMaxPrice(e.target.value)}} />
                        <label htmlFor="range1" className="form-label">{asideMaxPrice}</label>
                    </div>
                </div>
                <div className={`animate-section  w-100`}>
                    <p className="text-white fw-bold mb-2">
                        Min Rating
                    </p>
                    <div className={asideRadioStyles["radio-container"]}>
                        <input type="radio" name="rating" id="rate-0" value={0} onChange={(e) => {asideSetRate(Number(e.target.value))}} checked={asideRate === 0}  />
                        <label onClick={() => setIsClosing(true)} htmlFor="rate-0" className="d-flex gap-2 align-items-center">All</label>

                        <input type="radio" name="rating" id="rate-1" value={1} onChange={(e) => {asideSetRate(Number(e.target.value))}} checked={asideRate === 1}  />
                        <label onClick={() => setIsClosing(true)} htmlFor="rate-1" className="d-flex gap-2 align-items-center">1+ <FaStar style={{ fill: "gold", fontSize: "15px" }} /></label>

                        <input type="radio" name="rating" id="rate-2" value={2} onChange={(e) => {asideSetRate(Number(e.target.value))}} checked={asideRate === 2}  />
                        <label onClick={() => setIsClosing(true)} htmlFor="rate-2" className="d-flex gap-2 align-items-center">2+
                            <div>
                                <FaStar style={{ fill: "gold", fontSize: "15px" }} />
                                <FaStar style={{ fill: "gold", fontSize: "15px" }} />
                            </div>
                        </label>

                        <input type="radio" name="rating" id="rate-3" value={3} onChange={(e) => {asideSetRate(Number(e.target.value))}} checked={asideRate === 3}  />
                        <label onClick={() => setIsClosing(true)} htmlFor="rate-3" className="d-flex gap-2 align-items-center">3+
                            <div>
                                <FaStar style={{ fill: "gold", fontSize: "15px" }} />
                                <FaStar style={{ fill: "gold", fontSize: "15px" }} />
                                <FaStar style={{ fill: "gold", fontSize: "15px" }} />
                            </div>
                        </label>
                        <div className={asideRadioStyles["glider-container"]}>
                            <div className={asideRadioStyles["glider"]}></div>
                        </div>
                    </div>
                </div>
                {
                    filteredProducts.length && asideCategory !== "All" &&  <div className="w-100 text-center"><button className={`${shopFiltersSmallStyles["apply-filters-btn"]} mt-4 text-center fw-bold`} style={{ backgroundColor: "var(--main-color)", borderRadius: "15px" }}>Apply results ({filteredProducts.length})</button></div>
                }
                {
                    ((asideCategory !== "All" || asideMaxPrice !== 36990 || asideRate !== 0) && filterCounter > 0) && 
                    <div className="w-100 text-center mt-3">
                        <button className={`${shopFiltersSmallStyles["clear-filters"]} text-center py-2`} style={{ color: "var(--main-color)", backgroundColor: "#111111", border: "1px solid #592217", borderRadius: "15px", fontSize: "14px" }} onClick={asideClearFilters}>
                            Clear Filters ({filterCounter})
                        </button>
                    </div>
                }
            </div>
        </>, document.body
    )
}

export default ShopFiltersSmallDevice;