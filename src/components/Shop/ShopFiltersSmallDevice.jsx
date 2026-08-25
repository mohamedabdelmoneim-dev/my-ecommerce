import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import ProductsContext from "../../contexts/ProductsContext";
import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";


import shopFiltersSmallStyles from "../../assets/CSS/Shop/shop-filters-small-device.module.css";

function ShopFiltersSmallDevice ({ asideCategory, asideSetCategory, asideMaxPrice, asideSetMaxPrice, asideRate, asideSetRate, asideSearchBar, handleSearcing, onClose }) {
    const { products } = useContext(ProductsContext);
    const [isClosing, setIsClosing] = useState(false);
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => onClose(), 300);
    }
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
    const filteredProducts = products.products.filter(product => {
        const categoryMatch = asideCategory === "All" || product.category === asideCategory;
        const priceMatch = product.price <= asideMaxPrice;
        const rateMatch = asideRate === 0 || product.rating >= asideRate;
        const searchMatch = asideSearchBar === "" ||
            product.title.toLowerCase().includes(asideSearchBar.toLowerCase());

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
            <div className={`${shopFiltersSmallStyles["animate-section"]} ${shopFiltersSmallStyles["shop-filters-small-device"]} position-fixed d-flex flex-column align-items-start px-4 py-4`} style={{ width: "100%", backgroundColor: "#111111", border: "1px solid #2F2F2F", borderRadius: "15px", zIndex: 9999, bottom: 0, left: 0, height: "85vh", animation: isClosing ? "slideUpOut 0.3s ease forwards" : "slideUp 0.3s ease" }}>
                <div className={`${shopFiltersSmallStyles["animate-section"]} d-flex align-items-center justify-content-between w-100`}>
                    <h5 className="text-white mb-0 fw-bold">Filters</h5>
                    <button className="" onClick={handleClose} style={{ backgroundColor: "#242424", borderRadius: "12px", padding: "5px 8px", border: "none" }}>
                        <IoClose style={{ color: "#A7A7A7", fontSize: "1.10rem" }} />
                    </button>
                </div>
                <div className={`${shopFiltersSmallStyles["animate-section"]} mt-4 w-100`}>
                    <label htmlFor="search" className={`${shopFiltersSmallStyles["search-label"]} form-label text-white fw-bold`}>Search</label>
                    <div className={`${shopFiltersSmallStyles["search-bar-small-container"]} d-flex align-items-center`} style={{ backgroundColor: "#1F1F1F", borderRadius: "10px", padding: "5px 10px" }}>
                        <IoIosSearch style={{ color: "#615E61", fontSize: "1.25rem" }} />
                        <input className={`${shopFiltersSmallStyles["search-bar-small"]} form-control`} style={{ backgroundColor: "transparent", border: "none" }} type="text" id="search" value={asideSearchBar} onChange={(e) => handleSearcing(e.target.value)} placeholder="Search products..." />
                    </div>
                </div>
                <div className={`${shopFiltersSmallStyles["animate-section"]} mt-4 w-100`}>
                    <h6 htmlFor="category" className={`${shopFiltersSmallStyles["category-label"]} form-label text-white fw-bold`}>Category</h6>
                    <ul className="ps-0" style={{ width: "100%" }}>
                        {
                            categories.map(cat => {
                                return <li className={`list-group-item p-0 mb-1 ${shopFiltersSmallStyles["shop-aside-btn"]}`} style={{ borderRadius: "10px", fontSize: "14px", transition: "0.3s" }}><NavLink to={`/shop/${cat}`} className={({ isActive }) => {
                                    const isAllDefault = cat === "All" && location.pathname === "/shop";
                                    return `${isActive || isAllDefault ? shopFiltersSmallStyles["aside-active"] : ""} px-3 py-2 d-flex align-items-center justify-content-between`;
                                }} style={{ width: "100%", display: "block", borderRadius: "10px", color: "#888788"}} onClick={() => {asideSetCategory(cat)}}>{cat} <span>{cat == "All" ? products.products.length : products.products.filter(prod => prod.category === cat).length}</span></NavLink></li>
                                
                            })
                        }
                    </ul>
                </div>
                <div className={`${shopFiltersSmallStyles["animate-section"]} mt-4 w-100`}>
                    <h6 htmlFor="price" className={`${shopFiltersSmallStyles["price-label"]} form-label text-white fw-bold`}>Price Range</h6>
                    <div className="d-flex">
                        <input id="range1" className={`form-range me-3 ${shopFiltersSmallStyles["price-range"]}`} type="range" min={0} max={Math.max(...products.products.map(prod => prod.price), 0)} step={10} value={asideMaxPrice} onChange={(e) => {asideSetMaxPrice(e.target.value)}} />
                        <label htmlFor="range1" className="form-label">{asideMaxPrice}</label>
                    </div>
                </div>
                <div className={`${shopFiltersSmallStyles["animate-section"]}  w-100`}>
                    <p className="text-white fw-bold mb-2">
                        Min Rating
                    </p>
                    <div className={shopFiltersSmallStyles["radio-container"]}>
                        <input type="radio" name="rating" id="rate-0" value={0} onChange={(e) => {asideSetRate(Number(e.target.value))}} checked={asideRate === 0} />
                        <label htmlFor="rate-0" className="d-flex gap-2 align-items-center">All</label>

                        <input type="radio" name="rating" id="rate-1" value={1} onChange={(e) => {asideSetRate(Number(e.target.value))}} checked={asideRate === 1} />
                        <label htmlFor="rate-1" className="d-flex gap-2 align-items-center">1+ <FaStar style={{ fill: "gold", fontSize: "15px" }} /></label>

                        <input type="radio" name="rating" id="rate-2" value={2} onChange={(e) => {asideSetRate(Number(e.target.value))}} checked={asideRate === 2} />
                        <label htmlFor="rate-2" className="d-flex gap-2 align-items-center">2+
                            <div>
                                <FaStar style={{ fill: "gold", fontSize: "15px" }} />
                                <FaStar style={{ fill: "gold", fontSize: "15px" }} />
                            </div>
                        </label>

                        <input type="radio" name="rating" id="rate-3" value={3} onChange={(e) => {asideSetRate(Number(e.target.value))}} checked={asideRate === 3} />
                        <label htmlFor="rate-3" className="d-flex gap-2 align-items-center">3+
                            <div>
                                <FaStar style={{ fill: "gold", fontSize: "15px" }} />
                                <FaStar style={{ fill: "gold", fontSize: "15px" }} />
                                <FaStar style={{ fill: "gold", fontSize: "15px" }} />
                            </div>
                        </label>
                        <div className={shopFiltersSmallStyles["glider-container"]}>
                            <div className={shopFiltersSmallStyles["glider"]}></div>
                        </div>
                    </div>
                </div>
                {
                    filteredProducts.length && asideCategory !== "All" &&  <div className="w-100 text-center"><button className={`${shopFiltersSmallStyles["apply-filters-btn"]} mt-4 w-25 text-center fw-bold`} style={{ backgroundColor: "var(--main-color)", borderRadius: "15px" }}>Apply results ({filteredProducts.length})</button></div>
                }
                {
                    ((asideCategory !== "All" || asideMaxPrice !== 36990 || asideRate !== 0) && filterCounter > 0) && 
                    <div className="w-100 text-center mt-3">
                        <button className={`${shopFiltersSmallStyles["clear-filters"]} w-25 text-center py-2`} style={{ color: "var(--main-color)", backgroundColor: "#111111", border: "1px solid #592217", borderRadius: "15px", fontSize: "14px" }} onClick={asideClearFilters}>
                            Clear Filters ({filterCounter})
                        </button>
                    </div>
                }
            </div>
        </>, document.body
    )
}

export default ShopFiltersSmallDevice;