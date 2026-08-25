import Input from "../../components/Shop/Input";
import ProductsContext from "../../contexts/ProductsContext";

import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { LuFilter } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

import shopAsideStyles from "../../assets/CSS/Shop/shop-aside.module.css";
import asideRadioStyles from "../../assets/CSS/Shop/aside-radio.module.css";

function ShopAside ({ asideCategory, asideSetCategory, asideMaxPrice, asideSetMaxPrice, asideRate, asideSetRate, asideSearchBar, handleSearcing }) {
    const { products } = useContext(ProductsContext);
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
    const maxAvailablePrice = Math.max(...products.products.map(product => product.price), 0);

    const navigate = useNavigate();
    const location = useLocation();
    const asideClearFilters = () => {
        asideSetCategory("All");
        asideSetMaxPrice(maxAvailablePrice);
        asideSetRate(0);
        navigate("/shop")
    }
    const filterCounter = (asideCategory !== "All" ? 1 : 0) + 
        (asideMaxPrice < 36990 ? 1 : 0) + 
        (asideRate > 0 ? 1 : 0);
    return (
        <>
            <aside className="d-flex flex-column align-items-start px-4 py-4" style={{ width: "100%", backgroundColor: "#111111", border: "1px solid #1F1F1F", borderRadius: "15px" }}>
                <div className="d-flex align-items-start fw-bold gap-2">
                    <h5 className="text-white fw-bold"><LuFilter className="me-1" style={{ color: "var(--main-color)", fontSize: "1.05rem" }} /> Filters</h5>
                    {
                        filterCounter > 0 ? <p className="text-white text-center fw-bold" style={{ marginTop: "2px", borderRadius: "50%", backgroundColor: "var(--main-color)", width: "1.4rem", height: "1.4rem" }}>{filterCounter}</p> : ""
                    }
                </div>
                <div className="mb-4">
                    <p className="text-white fw-bold">Search</p>
                    <Input asideSearchBar={asideSearchBar} handleSearcing={handleSearcing}  />
                </div>
                <div className="w-100">
                    <p className="text-white fw-bold">Category</p>
                    <ul className="ps-0" style={{ width: "100%" }}>
                        {
                            categories.map(cat => {
                                return <li className={"list-group-item p-0 mb-1 " + shopAsideStyles["shop-aside-btn"]} style={{ borderRadius: "10px", fontSize: "14px", transition: "0.3s" }}><NavLink to={`/shop/${cat}`} className={({ isActive }) => {
                                    const isAllDefault = cat === "All" && location.pathname === "/shop";
                                    return `${isActive || isAllDefault ? shopAsideStyles["aside-active"] : ""} px-3 py-2 d-flex align-items-center justify-content-between`;
                                }} style={{ width: "100%", display: "block", borderRadius: "10px", color: "#888788"}} onClick={() => {asideSetCategory(cat)}}>{cat} <span>{cat == "All" ? products.products.length : products.products.filter(prod => prod.category === cat).length}</span></NavLink></li>
                                
                            })
                        }
                    </ul>
                </div>
                <div className="w-100 mb-4">
                    <p className="text-white fw-bold">Price Range</p>
                    <div className="d-flex">
                        <input id="range1" className={"form-range me-3 " + shopAsideStyles["price-range"]} type="range" min={0} max={Math.max(...products.products.map(prod => prod.price), 0)} step={10} value={asideMaxPrice} onChange={(e) => {asideSetMaxPrice(e.target.value)}} />
                        <label htmlFor="range1" className="form-label">{asideMaxPrice}</label>
                    </div>
                </div>
                <div className="w-100">
                    <p className="text-white fw-bold mb-2">
                        Min Rating
                    </p>
                    <div className={asideRadioStyles["radio-container"]}>
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
                        <div className={asideRadioStyles["glider-container"]}>
                            <div className={asideRadioStyles["glider"]}></div>
                        </div>
                    </div>
                </div>
                {
                    ((asideCategory !== "All" || asideMaxPrice !== 36990 || asideRate !== 0) && filterCounter > 0) && 
                    <button className={shopAsideStyles["clear-filters"] + " w-100 text-center py-2"} style={{ color: "var(--main-color)", backgroundColor: "#111111", border: "1px solid #592217", borderRadius: "15px", fontSize: "14px" }} onClick={asideClearFilters}>
                        Clear Filters ({filterCounter})
                    </button>
                }
            </aside>
        </>
    )
}

export default ShopAside;