import ShopAside from "./ShopAside";
import ProductsList from "../../components/ProductsList";
import SearchContext from "../../contexts/SearchContext";
import ShopListTheme from "../../components/ShopListTheme";
import ProductsContext from "../../contexts/ProductsContext";
import ShopFiltersSmallDevice from "../../components/Shop/ShopFiltersSmallDevice";

import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { FiFilter } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { LuLayoutList, LuSlidersHorizontal, LuGrid3X3 } from "react-icons/lu";

import shopStyles from "../../assets/CSS/Shop/shop.module.css";
import radioStyles from "../../assets/CSS/Shop/radio.module.css";

function Shop () {
    const { category: urlCategory } = useParams();
    const { products } = useContext(ProductsContext);
    const { search, setSearch } = useContext(SearchContext);
    const location = useLocation();

    const [shopProducts, setShopProducts] = useState([]);
    const [asideCategory, setAsideCategory] = useState(urlCategory || "All");
    const [maxPrice, setMaxPrice] = useState(0);
    const [asideRate, asideSetRate] = useState(0);
    const [choosingRate, setChoosingRate] = useState(false);
    const [sortProducts, setSortProducts] = useState("Featured")
    const [sortBy, setSortBy] = useState("Featured");
    const [sortActive, setSortActive] = useState("Featured");
    const [isGrid, setIsGrid] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [smallDeviceFilter, setSmallDeviceFilter] = useState(false);

    useEffect(() => {
        if (!products) return;

        const searchLower = search.toLowerCase();
        const searchMatchesCategory = search !== "" && products.products.some(p =>
            p.category.toLowerCase().includes(searchLower)
        );

        let filteredProducts = products.products.filter(product => {
            const categoryMatch = asideCategory === "All" || product.category === asideCategory;
            const priceMatch = product.price <= maxPrice;
            const rateMatch = asideRate === 0 || product.rating >= asideRate;

            let searchMatch;
            if (search === "") {
                searchMatch = true;
            } else if (searchMatchesCategory) {
                searchMatch = product.category.toLowerCase().includes(searchLower);
            } else {
                searchMatch = product.title.toLowerCase().includes(searchLower);
            }

            return categoryMatch && priceMatch && rateMatch && searchMatch;
        });

        if (sortBy === "Price: Low to High") {filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)};
        if (sortBy === "Price: High to Low") {filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)};
        if (sortBy === "Top Rated") {filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)};
        if (sortBy === "Best Discount") {filteredProducts = [...filteredProducts].sort((a, b) => b.discountPercentage - a.discountPercentage)};

        setShopProducts(filteredProducts);
    }, [asideCategory, maxPrice, products, asideRate, sortBy, search]);

    useEffect (() => {
        setAsideCategory(urlCategory || "All");
    }, [urlCategory])

    useEffect(() => {
        if (products) {
            const highest = Math.max(...products.products.map(product => product.price), 0);
            setMaxPrice(highest);
        }
    }, [products]);
    
    const handleSearcing = (value) => {
        setSearch (value);
        
    }
    const sortOptions = ["Featured", "Newest", "Price: Low to High", "Price: High to Low", "Top Rated", "Best Discount"];

    if (!products) return <div className="d-flex justify-content-center align-items-center w-100" style={{ height: "100vh" }}>
        <div className="spinner-border" style={{ color: "var(--main-color)" }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>;

    return (
        <>
            {smallDeviceFilter && <div className={shopStyles["overlay"]}></div>}
            <div style={{ paddingTop: "64px"}}>
                <div className="mt-5" style={{ backgroundColor: "#141414", padding: "20px", borderBottom: "1px solid #242424" }}>
                    <div className="container">
                        <div className="container-fluid" style={{ width: "100%" }}>
                            <ul className="nav mb-3" style={{ fontSize: "13px" }}>
                                <li className="nav-item" style={{ color: "#4D5556" }}>
                                    <Link to="/home" className={shopStyles["home-page"]} style={{ color: "#4D5556", transition: "0.3s" }}>Home </Link>
                                    <span className="mx-1">/</span>
                                </li>
                                <li className="nav-item" style={{ color: "#B1AEB1" }}>
                                    Shop <span style={{ color: "var(--main-color)" }}>{`${asideCategory !== "All" ? `/ ${asideCategory}` : ""}`}</span>
                                </li>
                            </ul>
                            <h2 className="text-white" style={{ fontWeight: 800 }}>{asideCategory == "All" ? "All Products" : asideCategory}</h2>
                            <p style={{ color: "#6E6E6E", fontSize: "14px" }}>{products.products.length} products found</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: "6rem" }}>
                <div className={shopStyles["shop-container"]}>
                    <div className="row justify-content-between" style={{ maxWidth: "100%" }}>
                        <div className={`${shopStyles["shop-aside"]} col-lg-3`} style={{ width: "16.938rem", marginTop: "6rem" }}>
                            <ShopAside 
                                asideCategory={asideCategory} asideSetCategory={setAsideCategory}
                                asideMaxPrice={maxPrice} asideSetMaxPrice={setMaxPrice}
                                asideRate={asideRate} asideSetRate={asideSetRate}
                                asideSearchBar={search} handleSearcing={handleSearcing}
                            />
                        </div>
                        <div className={`${shopStyles["shop-content"]} col-xl-9 col-lg-8 col-12`} style={{ marginTop: "2rem" }}>
                            <div className="mx-lg-0 mx-md-4 ms-2 d-flex justify-content-lg-end justify-content-between align-items-center mb-4 gap-3">
                                <div className={`${shopStyles["filter-btn-res"]} d-flex align-items-center gap-2 px-3 py-2`} onClick={() => setSmallDeviceFilter(!smallDeviceFilter)} style={{ backgroundColor: "#161616", border: "1px solid #2C2C2C", borderRadius: "15px", cursor: "pointer" }}>
                                    <FiFilter style={{ color: "#A7A4A7" }} />
                                    <p className="mb-0" style={{ color: "#A7A4A7" }}>Filters</p>
                                </div>
                                <div className="d-flex justify-content-end align-items-center gap-2">
                                    <div className={`${radioStyles["radio-group"]} ${shopStyles["grid-list-toggle"]}`}>
                                        <div className={radioStyles["slider"]} />
                                        <div className={radioStyles["radio-option"]}>
                                            <input type="radio" name="option" id="option1" defaultChecked />
                                            <label htmlFor="option1" className={radioStyles["radio-label"]} onClick={() => {setIsGrid(true)}}>
                                                <LuGrid3X3 style={{ fontSize: "17px" }} />
                                            </label>
                                        </div>
                                        <div className={radioStyles["radio-option"]}>
                                            <input type="radio" name="option" id="option2" />
                                            <label htmlFor="option2" className={radioStyles["radio-label"]} onClick={() => {setIsGrid(false)}}>
                                                <LuLayoutList style={{ fontSize: "17px" }} />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={`position-relative ${shopStyles["filter-btn"]}`}>
                                            <button style={{ borderRadius: "15px" }} onClick={() => setIsOpen(!isOpen)}>
                                            <LuSlidersHorizontal />
                                                {sortBy} <RiArrowDropDownLine />
                                            </button>
                                            {isOpen &&(
                                                <div className={shopStyles["sort-dropdown"]} style={{
                                                    position: "absolute",
                                                    top: "130%",
                                                    left: "calc(30% - 105px)",
                                                    animation: "slideDown 0.3s ease",
                                                    color: "#FFF",
                                                    zIndex: 999,
                                                    width: "210px",
                                                    borderRadius: "15px",
                                                    overflow: "hidden"

                                                }}>
                                                    {sortOptions.map(option => (
                                                        <button className={`w-100 ${sortActive == option ? shopStyles["option-btn"] : ""} ${shopStyles["sort-option"]} position-relative`} key={option} onClick={() => { setSortBy(option); setIsOpen(false); setSortActive(option); setSortProducts(option) }} style={{ backgroundColor: "#1A1A1A", fontSize: "14px" }}>
                                                            {option}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="me-auto">
                                {isGrid ? <ProductsList category={"variable"} unique={shopProducts} xlSize={4} lgSize={6} ms={1} /> : <ShopListTheme listOfProducts={shopProducts} /> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {smallDeviceFilter && <ShopFiltersSmallDevice asideCategory={asideCategory} asideSetCategory={setAsideCategory} asideMaxPrice={maxPrice} asideSetMaxPrice={setMaxPrice} asideRate={asideRate} asideSetRate={asideSetRate} asideSearchBar={search} handleSearcing={handleSearcing} onClose={() => setSmallDeviceFilter(false)} />}
        </>
    )
}

export default Shop;