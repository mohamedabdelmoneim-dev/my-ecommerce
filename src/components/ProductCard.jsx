import CartAside from "./Cart/CartAside/CartAside";
import { CartContext } from "../contexts/CartContextProvider";
import LocalStorageContext from "../contexts/LocalstorageContext";

import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useRef, useContext } from "react";

import { PiEyeBold  } from "react-icons/pi";
import { LuShoppingBag } from "react-icons/lu";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaRegHeart, FaStar, FaRegStar, FaHeart } from "react-icons/fa";

import productCardStyles from "../assets/CSS/General/product-card.module.css";

function ProductCard ( { xlSize, lgSize, id, title, description, category, price, discountPercentage, rating, stock, tags, brand, reviews, returnPolicy, minimumOrderQuantity, images, thumbnail, status } ) {
    const handleStars = (rating) => {
    const stars = [];
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.push(<FaStar key={`star-full-${i}`} style={{ fill: "#FFB900", fontSize: "15px" }} />)
        }
        if (rating % 1 > 0) {
            stars.push(<FaStarHalfStroke key="star-half" style={{ fill: "#FFB900", fontSize: "15px" }} />)
        }
        for (let i = 0; i < 5 - Math.ceil(rating); i++) {
            stars.push(<FaRegStar key={`star-empty-${i}`} style={{ fontSize: "15px", fill: "var(--text-color)" }} />)
        }
        return stars;
    }
    const { localStorageLength, setLocalStorageLength } = useContext(LocalStorageContext)
    const [IsWishlist, setIsWishList] = useState( !!localStorage.getItem(`product_card${id}`));
    const [heartBackgroundColor, setHeartBackgroundColors] = useState(localStorage.getItem(`heart-backgroundColor${id}`) || "#8E8F8B")
    const [heartColor, setHeartColor] = useState(localStorage.getItem(`heart-color${id}`) || "");
    const cardHeart = useRef(null);
    const productCard = useRef(null);
    const productCardCount = 0;
    const handleWishlist = (e) => {
        e.stopPropagation();
        setIsWishList(!IsWishlist);
        const productKey = `product_card${id}`;
        if (!IsWishlist) {
            if (!localStorage.getItem(productKey)) {
                localStorage.setItem(productKey, JSON.stringify({ id, title, price, thumbnail }));
            }
            localStorage.setItem(`heart-backgroundColor${id}`, "red");
            localStorage.setItem(`heart-color${id}`, "#FFF");
            const wishlistCount = Object.keys(localStorage).filter(key => key.startsWith("product_card")).length;
            setLocalStorageLength(wishlistCount);
            setHeartBackgroundColors("red")
            setHeartColor("#FFF");
        } else { 
            localStorage.removeItem(productKey)
            localStorage.setItem(`heart-backgroundColor${id}`, "#8E8F8B");
            localStorage.setItem(`heart-color${id}`, "");
            setHeartBackgroundColors("#8E8F8B")
            setHeartColor("");
            const wishlistCount = Object.keys(localStorage).filter(key => key.startsWith("product_card")).length;
            setLocalStorageLength(wishlistCount);
        }

    }
    const randomStatus = useMemo(() => 
        status[Math.floor(Math.random() * status.length)]
    , []);

    useEffect(() => {
        setIsWishList(!!localStorage.getItem(`product_card${id}`));
        setHeartBackgroundColors(localStorage.getItem(`heart-backgroundColor${id}`) || "#8E8F8B");
        setHeartColor(localStorage.getItem(`heart-color${id}`) || "");
    }, [id]);

    const { cartDispatch } = useContext(CartContext);
    const [showAsideCart, setShowAsideCart] = useState(false)
    const navigate = useNavigate();
    return (
        <div ref={productCard} className={`${productCardStyles["product-card"]} col-xl-${xlSize} col-lg-${lgSize} col-sm-6 d-flex flex-column`} style={{ borderRadius: "15px", height: "max-content", cursor: "pointer" }}>
            <div className="position-relative">
                <img onClick={() => navigate(`/product/${id}`)} loading="lazy" src={thumbnail} alt="" className="" style={{ backgroundColor: "#FFF", borderRadius: "15px 15px 0 0", width: "100%", transition: "0.3s" }} />
                <div className="position-absolute d-flex flex-column justify-content-evenly gap-1" style={{ top: "10px", left: "10px" }}>
                    <p style={{ borderRadius: "10px", color: "white", width: "fit-content", padding: "5px 10px", fontSize: "0.8rem", fontWeight: 700, marginBottom: 0 }} className={`${randomStatus == "Limited" ? productCardStyles["limited-product"] : randomStatus == "Trending" || randomStatus == "New" ? productCardStyles["blue-status"] : productCardStyles["orange-status"]} ${productCardStyles["status"]}`}>{randomStatus}</p>
                    <p className={`${productCardStyles["discount"]} py-1 px-2`} style={{ borderRadius: "10px", color: "white", backgroundColor: "#18CD60", width: "fit-content", fontSize: "0.8rem", fontWeight: 700 }}>-{discountPercentage}%</p>
                </div>
                <div className="position-absolute d-flex flex-column gap-2" style={{ top: "10px", right: "10px" }}>
                    <div ref={cardHeart} className={`${productCardStyles["card-heart"]} ${IsWishlist ? productCardStyles["wishlisted"] : ""}`} style={{ padding: "5px 10px", borderRadius: "10px", transition: "0.3s", cursor: "pointer", backgroundColor: heartBackgroundColor  }} onClick={handleWishlist}>{IsWishlist ? <FaHeart style={{ fill: "#FFF", fontSize: "13px" }} /> : <FaRegHeart style={{ fill: "#FFF", fontSize: "13px" }} />}</div>
                    <div onClick={() => navigate(`/product/${id}`)} className={productCardStyles["card-eye"]} style={{ padding: "5px 10px", borderRadius: "10px", backgroundColor: "#8E8F8B", transition: "0.3s", cursor: "pointer" }}><PiEyeBold  style={{ fill: "#FFF", fontSize: "14px" }} /></div>
                </div>
                <div className={`position-absolute bottom-0 w-100 ${productCardStyles["quick-add"]} ${productCardStyles["disapled-quick-add"]} d-flex justify-content-center`}>
                    <button className="text-center text-white mb-2 d-flex justify-content-center align-items-center gap-2" onClick={() => { cartDispatch({type: "Add_To_Cart", product: {id, title, price, thumbnail, discountPercentage}}); setShowAsideCart(true);}} style={{ paddingTop: "10px", paddingBottom: "10px", boxShadow: "0 0px 20px 35px rgba(0, 0, 0, 0.3)", border: 0, backgroundColor: "var(--main-color)", borderRadius: "15px", transition: "0.3s", fontSize: "14px", width: "90%", fontWeight: 500 }}><LuShoppingBag /> Quick Add</button>
                    {showAsideCart && <CartAside onClose={() => setShowAsideCart(false)} />}
                </div>
            </div>
            <div onClick={() => navigate(`/product/${id}`)} className={`${productCardStyles["bottom-card"]} px-2 py-3`} style={{ backgroundColor: "#3837376e", borderRadius: "0 0 15px 15px " }}>
                <div className="d-flex gap-3 align-items-start flex-sm-row flex-column" style={{ marginBottom: "7px" }}>
                    <div className={productCardStyles["stars"]}>
                        {handleStars(rating)}
                    </div>
                    <p className="mb-0" style={{ color: "var(--text-color)" }}>(2,847)</p>
                </div>
                <p className="text-white fw-bold" style={{ marginBottom: "10px", minHeight: "50px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", }}>
                    {title}
                </p>
                <div className="d-flex justify-content-between gap-2 flex-sm-row flex-column" style={{ marginBottom: "10px" }}>
                    <div className={`${productCardStyles["card-price"]} d-flex align-items-sm-center gap-1 flex-sm-row flex-column`}>
                        <p className="text-white mb-0" style={{ fontSize: "13px" }}>${price}</p>
                        <p style={{ marginBottom: 0, color: "var(--text-color)", fontSize: "13px", fontSize: "13px" }}><del>${ Math.round((price / ((100 - discountPercentage) / 100)) * 100) / 100 }</del></p>
                    </div>
                    <p className="mb-0" style={{ maxHeight: "10px", fontSize: "13px", color: "#07DF72" }}>Save ${ Math.round((price / ((100 - discountPercentage) / 100) - price) * 100) / 100 }</p>
                </div>
                <div className="d-flex justify-content-start gap-1">
                    <span style={{ borderRadius: "50%", width: "20px", height: "20px", backgroundColor: "#0f0f0f" }}></span>
                    <span style={{ borderRadius: "50%", width: "20px", height: "20px", backgroundColor: "#FFF" }}></span>
                    <span style={{ borderRadius: "50%", width: "20px", height: "20px", backgroundColor: "#123" }}></span>
                </div>
            </div>
            
        </div>
    )
}
export default ProductCard;