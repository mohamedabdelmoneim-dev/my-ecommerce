import SearchContext from "../contexts/SearchContext";

import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import searchBarPopupStyles from "../assets/CSS/General/searchbar-popup.module.css";

function SearchBarPopup({ onClose, handleCloseOnSideMenu }) {
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [searchBar, setSearchBar] = useState('');
    const { search, setSearch } = useContext(SearchContext);
    const navigate = useNavigate();
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Enter") {
                setSearch(e.target.value);
                onClose();
                navigate('/shop');
                handleCloseOnSideMenu();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [])
    return createPortal(
        showSearchBar && (
            <div className={`${searchBarPopupStyles["search-bar"]} position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center`}
                style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0,0,0,0.7)", zIndex: 9999 }}
                onClick={() => {setShowSearchBar(false)}}
                
                >
                <div onClick={e => e.stopPropagation()} style={{ width: "45%", backgroundColor: "#1a1a1a", borderRadius: "15px", border: "1px solid var(--main-color)", padding: "15px 20px" }}>
                    <div className="d-flex align-items-center gap-3">
                        <FiSearch style={{ color: "#767676" }} />
                        <input autoFocus type="search" placeholder="Search products, categories..." onChange={(e) => {setSearchBar(e.target.value)}} className={`w-100 ${searchBarPopupStyles["bar"]}`} style={{ background: "none", border: "none", color: "#FFF" }} />
                        <IoMdClose style={{ color: "#FFF", cursor: "pointer" }} onClick={() => {setShowSearchBar(false)}} />
                    </div>
                    <p style={{ color: "#767676", fontSize: "12px", marginTop: "10px", marginBottom: 0 }}>
                        Press <kbd>Enter</kbd> to search or <kbd>Esc</kbd> to close
                    </p>
                </div>
            </div>
        ), document.body
    )
}
export default SearchBarPopup;