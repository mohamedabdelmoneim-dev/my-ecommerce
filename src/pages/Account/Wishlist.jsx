import { useContext, useEffect, useState } from "react";
import ProductsContext from "../../contexts/ProductsContext";
import WishListCard from "../../components/Account/WishListCard";
import LocalStorageContext from "../../contexts/LocalstorageContext";

import wishlistStyles from "../../assets/CSS/My-Account/wishlist.module.css";

function Wishlist ({ id }) {
    const { products } = useContext(ProductsContext)
    const [items, setItems] = useState([]);
    const [heartBackgroundColor, setHeartBackgroundColors] = useState(localStorage.getItem(`heart-backgroundColor${id}`) || "#8E8F8B")
    const [heartColor, setHeartColors] = useState();
    const { localStorageLength, setLocalStorageLength } = useContext(LocalStorageContext)
    const wishlistKeys = Object.keys(localStorage).filter(key => key.startsWith("product_card"));
    const wishlistProducts = wishlistKeys.map(key => JSON.parse(localStorage.getItem(key)));
    
    const heartBackgroundColors = Object.keys(localStorage).filter(key => key.startsWith("heart-backgroundColor"));
    const heartColors = Object.keys(localStorage).filter(key => key.startsWith("heart-color"));
    useEffect(() => {
        if (!products) return;
        const fullWishlistProducts = wishlistProducts.map(wishItem => 
            products.products.find(prod => prod.id === wishItem.id)
        );
        setItems(fullWishlistProducts);
        setHeartBackgroundColors(localStorage.getItem(`heart-backgroundColor${id}`) || "#8E8F8B");
        setHeartColors(heartColors);
    }, [products])
    useEffect(() => {
        const allElements = document.querySelectorAll(".animate-section > *");
        const observer = new IntersectionObserver (entries => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = `${index * 0.05}s`;
                    entry.target.classList.add("visible");
                }
            });
        }, {threshold: 0.2});
        allElements.forEach(el => observer.observe(el))
        
        return () => observer.disconnect();
    },[items])
    if (!products) return <div className="d-flex justify-content-center align-items-center w-100">
        <div className="spinner-border" style={{ color: "var(--main-color)" }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>;
    const handleRemoveAllItems = () => {
        wishlistKeys.forEach(key => {{
            localStorage.removeItem(key);
            setItems([]);
            setLocalStorageLength(0)
        }});
        heartBackgroundColors.forEach(heart => {
            localStorage.removeItem(heart);
            setHeartBackgroundColors([]);
            setLocalStorageLength(0)
        });
        heartColors.forEach(heart => {
            localStorage.removeItem(heart);
            setHeartColors([])
            setLocalStorageLength(0)
        });
        localStorage.setItem(`heart-backgroundColor${id}`, "#8E8F8B");
        localStorage.setItem(`heart-color${id}`, "");
    }
    
    return (
        <>
            <div className={`d-flex flex-column w-100 ${wishlistStyles["animate-section"]}`}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="text-white fw-bold">
                        Wishlist
                    </h4>
                    <button className={`${wishlistStyles["remove-wishlist-items"]} btn align-self-end`} style={{ transition: "0.3s", color: "var(--main-color)", width: "fit-content" }} onClick={handleRemoveAllItems}>Remove All items</button>
                </div>
                <div className="d-flex justify-content-xl-end justify-content-md-between justify-content-center gap-xl-4 gap-3 w-100 offset-xl-1 ">
                    {
                        items == 0
                        ? <div className="text-white w-100 text-center" style={{ transition: "0.3s" }}>No Items Yet...</div>
                        : <div className={`w-100 row offset-lg-0 offset-md-1 offset-xs-1 justify-content-md-start justify-content-center gap-4 row-cols-xl-4 row-cols-md-4 row-cols-sm-1 ${wishlistStyles["animate-section"]} gap-1`}>
                            {
                                items.map(product => {
                                    return <WishListCard items={product} />
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Wishlist;