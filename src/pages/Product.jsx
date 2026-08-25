import ProductsList from "../components/ProductsList";
import CartAside from "../components/Cart/CartAside/CartAside";
import ProductsContext from "../contexts/ProductsContext";
import LocalStorageContext from "../contexts/LocalstorageContext";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";


import { BsTruck } from "react-icons/bs";
import { LuShoppingBag, LuShield } from "react-icons/lu";
import { FiShare2, FiRefreshCw } from "react-icons/fi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { FaStarHalfStroke, FaCheck } from "react-icons/fa6";
import { CartContext } from "../contexts/CartContextProvider";
import { FaRegHeart, FaStar, FaRegStar, FaHeart } from "react-icons/fa";

import productStyles from "../assets/CSS/Product/product.module.css";
import '../assets/CSS/Product/swiper.css';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
// import required modules
import { Navigation, EffectFade, Pagination } from 'swiper/modules';



function Product () {
    const { state } = useLocation();
    const { products } = useContext(ProductsContext);
    if (!products) return <div className="d-flex justify-content-center align-items-center w-100">
        <div className="spinner-border" style={{ color: "var(--main-color)" }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>;
    const product = products?.products.find(prod => prod.id === state?.id);
    const productId = product?.id;
    const cardHeart = useRef(null);
    const [IsWishlist, setIsWishList] = useState( !!localStorage.getItem(`product_card${productId}`));
    const [heartBackgroundColor, setHeartBackgroundColors] = useState(localStorage.getItem(`heart-backgroundColor${productId}`) || "#8E8F8B")
    const [heartColor, setHeartColor] = useState(localStorage.getItem(`heart-color${productId}`) || "");
    const { localStorageLength, setLocalStorageLength } = useContext(LocalStorageContext)

    const status = ["Best Seller", "New", "Popular", "Limited", "Trending", "Sale", "Luxury"];
    const randomStatus = useMemo(() => 
        status[Math.floor(Math.random() * status.length)]
    , []);
    const handleWishlist = (e) => {
        e.stopPropagation();
        setIsWishList(!IsWishlist);
        if (!IsWishlist) {
            const { id, title, price, thumbnail } = product;
            const productKey = `product_card${productId}`;
            if (!localStorage.getItem(productKey)) {
                localStorage.setItem(productKey, JSON.stringify({ id, title, price, thumbnail }));
            }
            localStorage.setItem(`heart-backgroundColor${productId}`, "red");
            localStorage.setItem(`heart-color${productId}`, "#FFF");
            const wishlistCount = Object.keys(localStorage).filter(key => key.startsWith("product_card")).length;
            setLocalStorageLength(wishlistCount);
            setHeartBackgroundColors("red")
        } else { 
            localStorage.removeItem(`product_card${productId}`)
            localStorage.setItem(`heart-backgroundColor${productId}`, "#8E8F8B");
            localStorage.setItem(`heart-color${productId}`, "");
            setHeartBackgroundColors("#8E8F8B")
            const wishlistCount = Object.keys(localStorage).filter(key => key.startsWith("product_card")).length;
            setLocalStorageLength(wishlistCount);
        }
            

    }
    const mainSwiper = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const handleStars = (rating) => {
        const stars = [];
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.push(<FaStar className="ms-1" style={{ fill: "#FFB900", fontSize: "15px" }} />)
        }
        if (rating % 1 > 0) {
            stars.push(<FaStarHalfStroke className="ms-1" style={{ fill: "#FFB900", fontSize: "15px" }} />)
        }
        for (let i = 0; i < 5 - Math.ceil(rating); i++) {
            stars.push(<FaRegStar className="ms-1" style={{ fontSize: "15px", fill: "var(--text-color)" }} />)
        }
        return stars;
    }
    const handleMiniStars = (rating) => {
        const stars = [];
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.push(<FaStar className="ms-1" style={{ fill: "#FFB900", fontSize: "12.5px" }} />)
        }
        if (rating % 1 > 0) {
            stars.push(<FaStarHalfStroke className="ms-1" style={{ fill: "#FFB900", fontSize: "12.5px" }} />)
        }
        for (let i = 0; i < 5 - Math.ceil(rating); i++) {
            stars.push(<FaRegStar className="ms-1" style={{ fontSize: "12.5px", fill: "var(--text-color)" }} />)
        }
        return stars;
    }
    const [spanColor, setSpanColor] = useState("#C9A96E");
    const { cart, cartDispatch } = useContext(CartContext);
    const cartItem = cart.find(item => item.id === product?.id);
    const handleIncrease = () => {
        if (cartItem) {
            cartDispatch({ type: "Increase", id: productId });
        } else {
            cartDispatch({ type: "Add_To_Cart", product });
        }
    };
    const [numQuantity, setNumQuantity] = useState(1);
    const handleIncreaseQuan = () => {
        setNumQuantity(prev => prev + 1);
    };
    
    const handleDecreaseQuan = () => {
        setNumQuantity(prev => Math.max(prev - 1, 1));
    };
    const [showAsideCart, setShowAsideCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const handleAddToCart = () => {
        cartDispatch({ 
            type: "Add_To_Cart", 
            product: { ...product, quantity: numQuantity } 
        });
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 3000)
    };
    const [prodDetails, setProdDetails] = useState("description");
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
    },[prodDetails]);
    const unique = products.products.filter(prod => prod.category == product?.category && prod.id != product.id);
    console.log(unique)
    console.log(state)
    const navigate = useNavigate();
    return (
        <>
            <div className="product-page" style={{ paddingTop: "64px" }}>
                <div className="container">
                    <div style={{ paddingTop: "20px" }}>
                        <ul className="nav mb-3" style={{ fontSize: "13px" }}>
                            <li className="nav-item" style={{ color: "#4D5556" }}>
                                <Link to="/home" className={"home-page " + productStyles["product-path"]} style={{ color: "#4D5556", transition: "0.3s" }}>Home </Link>
                                <span className="mx-2">/</span>
                            </li>
                            <li className="nav-item" style={{ color: "#4D5556" }}>
                                <Link className={productStyles["product-path"]} to="/shop" style={{ color: "#4D5556", transition: "0.3s" }}>Shop</Link>
                                <span className="mx-2">/</span>
                            </li>
                            <li className="nav-item" style={{ color: "#4D5556" }}>
                                <Link className={productStyles["product-path"]} to={`/shop/${product?.category}`} style={{ color: "#4D5556", transition: "0.3s" }}>{product?.category}</Link>
                                <span className="mx-2">/</span>
                            </li>
                            <li className="nav-item" style={{ color: "#B1AEB1" }}>
                                {product?.title}
                            </li>
                        </ul>
                    </div>
                    <div className="row my-5">
                        <div className="col-md-6 col-12 ps-0">
                            <Swiper
                                effect={'fade'}
                                fadeEffect={{ crossFade: true }}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                modules={[EffectFade, Navigation, Pagination]}
                                className="mySwiper"
                                pagination={{
                                    clickable: true,
                                }}
                                onSwiper={(swiper) => (mainSwiper.current = swiper)}
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            >
                                {
                                    product?.images.map(prod => {
                                        return (
                                            <>
                                                <SwiperSlide>
                                                <div className="position-relative ms-md-0 ms-3">
                                                    <img src={prod} style={{ backgroundColor: "#FFF", borderRadius: "15px", width: "100%", maxWidth: "39.8125rem", height: "auto" }} />
                                                    <div className="position-absolute d-flex flex-column justify-content-evenly gap-1" style={{ top: "10px", left: "0.7rem" }}>
                                                        <p style={{ borderRadius: "10px", color: "white", width: "fit-content", padding: "5px 10px", fontSize: "0.8rem", fontWeight: 700, marginBottom: 0 }} className={randomStatus == "Limited" ? `${productStyles["limited-product"]}` : randomStatus == "Trending" || randomStatus == "New" ? `${productStyles["blue-status"]}` : `${productStyles["orange-status"]}`}>{randomStatus}</p>
                                                        <p className="py-1 px-2" style={{ borderRadius: "10px", color: "white", backgroundColor: "#18CD60", width: "fit-content", fontSize: "0.8rem", fontWeight: 700 }}>-{product.discountPercentage}%</p>
                                                    </div>
                                                    <div className="position-absolute d-flex flex-column gap-2" style={{ top: "10px", right: "1.3rem" }}>
                                                        <div ref={cardHeart} className={`card-heart ${IsWishlist ? "wishlisted" : ""}`} style={{ padding: "5px 10px", borderRadius: "10px", transition: "0.3s", cursor: "pointer", backgroundColor: heartBackgroundColor  }} onClick={handleWishlist}>{localStorage.getItem(`heart-color${productId}`) === "#FFF" ? <FaHeart style={{ fill: "#FFF", fontSize: "15px" }} /> : <FaRegHeart style={{ fill: "#FFF", fontSize: "15px" }} />}</div>
                                                    </div>
                                                </div>
                                                </SwiperSlide>
                                            </>
                                        )
                                    })
                                }
                            </Swiper>
                            <div className="d-flex align-items-center justify-content-start mt-5 gap-3">
                                {
                                    product?.images.map((prod, index) => {
                                        return (
                                                <img className={`${activeIndex === index ? "swiper-img-brdr" : ""} my-swiper-img`} key={index} src={prod} alt="" style={{ width: "100px", backgroundColor: "#FFF", borderRadius: "15px", padding: "5px", cursor: "pointer" }} onClick={() => {mainSwiper.current.slideToLoop(index)}} />
                                            )
                                        })
                                }
                            </div>
                        </div>
                        <div className="col-md-6 col-12 pe-0">
                            <div className="d-flex gap-3 align-items-start">
                                <div>{handleStars(product?.rating)}</div>
                                <p style={{ color: "#989D9D", marginTop: "4px", fontSize: "14px" }}>{product?.rating} (2,847 reviews)</p>
                            </div>
                            <h2 className="text-white mb-4" style={{ fontWeight: 900 }}>{product?.title}</h2>
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <h3 className="text-white mb-2" style={{ fontWeight: 900 }}>${product?.price}</h3>
                                <p className="mb-0" style={{ color: "#545354" }}><del>${ Math.round((product?.price / ((100 - product?.discountPercentage) / 100)) * 100) / 100 }</del></p>
                                <p className="mb-0 px-3 py-1" style={{ color: "#05DF66", fontSize: "14px", backgroundColor: "#092715", border: "1px solid #074721", borderRadius: "10px" }}>Save ${ Math.round((product?.price / ((100 - product?.discountPercentage) / 100) - product?.price) * 100) / 100 }</p>
                            </div>
                            <p style={{ color: "#939D9D" }}>{product?.description}</p>
                            <div className="d-flex justify-content-between mt-5">
                                <div className="d-flex flex-column">
                                    <p className="text-white" style={{ fontSize: "14px" }}>Color</p>
                                    <div className="d-flex align-items-center gap-2 mb-5">
                                        <span className={`color-span d-flex justify-content-center align-items-center ${spanColor === "#C9A96E" ? productStyles["span-outline"] : "" }`} onClick={() => {setSpanColor("#C9A96E");}} style={{ backgroundColor: "#C9A96E", width: "35px", height: "35px", borderRadius: "50%", cursor: "pointer" }}>
                                                {spanColor === "#C9A96E" && <div className="span-overlay"><FaCheck style={{ color: "#FFF" }} /></div>}
                                        </span>
                                        <span className={`color-span d-flex justify-content-center align-items-center ${spanColor === "#1A1A1A" ? productStyles["span-outline"] : "" }`} onClick={() => {setSpanColor("#1A1A1A");}} style={{ backgroundColor: "#1A1A1A", width: "35px", height: "35px", borderRadius: "50%", cursor: "pointer" }}>
                                                {spanColor === "#1A1A1A" && <div className="span-overlay"><FaCheck style={{ color: "#FFF" }} /></div>}
                                        </span>
                                        <span className={`color-span d-flex justify-content-center align-items-center ${spanColor === "#C0C0C0" ? productStyles["span-outline"] : "" }`} onClick={() => {setSpanColor("#C0C0C0");}} style={{ backgroundColor: "#C0C0C0", width: "35px", height: "35px", borderRadius: "50%", cursor: "pointer" }}>
                                                {spanColor === "#C0C0C0" && <div className="span-overlay"><FaCheck style={{ color: "#FFF" }} /></div>}
                                        </span>
                                    </div>
                                </div>
                                <p style={{ color: "#6C6C6C", fontSize: "12px" }}>{spanColor}</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-start gap-3 mb-4">
                                <p className="text-white mb-0">Quantity</p>
                                <div className="d-flex align-items-center justify-content-evenly" style={{ backgroundColor: "#222222", borderRadius: "15px", width: "130px", height: "45px" }}>
                                    <button style={{ backgroundColor: "transparent", color: "#FFF" }} onClick={handleDecreaseQuan}>-</button>
                                    <p className="text-white mb-0 mx-1">{numQuantity}</p>
                                    <button style={{ backgroundColor: "transparent", color: "#FFF" }} onClick={handleIncreaseQuan}>+</button>
                                </div>
                                <p className="mb-0" style={{ color: "#4F5354" }}>${numQuantity * product?.price}total</p>
                            </div>
                            <div className="d-flex align-items-center gap-3 mb-4">
                                {
                                    addedToCart ?  <button className={`${productStyles["product-add-to-cart"]} d-flex justify-content-center align-items-center gap-2`} style={{ backgroundColor: "#00C950", color: "#FFF", textAlign: "canter", width: "60%", height: "50px", borderRadius: "15px", fontWeight: "bold", transition: "0.3s" }}>
                                    <FaCheck />Added to Cart
                                    {showAsideCart && <CartAside onClose={() => setShowAsideCart(false)} />}
                                </button> : <button onClick={() => {handleAddToCart(); setShowAsideCart(true) }} className={`${productStyles["product-add-to-cart"]} d-flex justify-content-center align-items-center gap-2`} style={{ backgroundColor: "var(--main-color)", color: "#FFF", textAlign: "canter", width: "60%", height: "50px", borderRadius: "15px", fontWeight: "bold", transition: "0.3s" }}>
                                    <LuShoppingBag />Add to Cart
                                    {showAsideCart && <CartAside onClose={() => setShowAsideCart(false)} />}
                                </button>
                                }
                                
                                <button onClick={() => navigate('/checkout')} className={`${productStyles["product-buy-now"]} d-flex align-items-center justify-content-center gap-1 px-4`} style={{ backgroundColor: "#FFF", borderRadius: "15px", color: "#000", fontWeight: "bold", fontSize: "17px", height: "50px", transition: "0.3s" }}>
                                    <HiOutlineLightningBolt style={{ color: "var(--main-color)", fill: "var(--main-color)", fontSize: "1.5rem" }} /> Buy Now
                                </button>
                                <button className={productStyles["product-share"]} style={{ borderRadius: "15px", padding: "15px 20px", backgroundColor: "#181818", border: "1px solid #2F2F2F", transition: "0.3s" }}>
                                    <FiShare2 style={{ fontSize: "1.2rem", color: "#979797" }}/>
                                </button>
                            </div>
                            <div className={`d-flex align-items-center justify-content-around ${productStyles["adv-prod"]} p-3 mb-4`} style={{ backgroundColor: "#141414", borderRadius: "15px", border: "1px solid #212121" }}>
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <BsTruck className="mb-1" style={{ color: "var(--main-color)", fontSize: "1.35rem" }} />
                                    <p className="text-white" style={{ fontSize: "12.5px" }}>Free Delivery</p>
                                    <p style={{ color: "#6C726C", fontSize: "11px" }}>On Oreders $200+</p>
                                </div>
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <LuShield className="mb-1" style={{ color: "var(--main-color)", fontSize: "1.35rem" }} />
                                    <p className="text-white" style={{ fontSize: "12.5px" }}>Secure Payment</p>
                                    <p style={{ color: "#6C726C", fontSize: "11px" }}>SSL Protected</p>
                                </div>
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <FiRefreshCw className="mb-1" style={{ color: "var(--main-color)", fontSize: "1.35rem" }} />
                                    <p className="text-white" style={{ fontSize: "12.5px" }}>Easy Returns</p>
                                    <p style={{ color: "#6C726C", fontSize: "11px" }}>30 days</p>
                                </div>
                            </div>
                            <div className="d-flex flex-column ">
                                <div className="btn-group mb-4" role="group" aria-label="Basic radio toggle button group" style={{ backgroundColor: "#141414" }}>
                                    <input onClick={() => setProdDetails("description")} type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" defaultChecked style={{ borderRadius: "10px" }} />
                                    <label className={"btn " + productStyles["btn-outline"]} htmlFor="btnradio1" style={{ borderRadius: "10px", fontWeight: 700 }}>Description</label>

                                    <input onClick={() => setProdDetails("specs")} type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" style={{ borderRadius: "10px" }} />
                                    <label className={"btn " + productStyles["btn-outline"]} htmlFor="btnradio2" style={{ borderRadius: "10px", fontWeight: 700 }}>Specs</label>

                                    <input onClick={() => setProdDetails("reviews")} type="radio" className="btn-check" name="btnradio" id="btnradio3" autocomplete="off" style={{ borderRadius: "10px" }} />
                                    <label className={"btn " + productStyles["btn-outline"]} htmlFor="btnradio3" style={{ borderRadius: "10px", fontWeight: 700 }}>Reviews</label>
                                </div>

                                <div className="animate-section">
                                    {
                                    
                                            prodDetails == "description" ? <><p style={{ color: "#939D9D" }}>{product?.description}</p>
                                            <div className="d-flex flex-column">
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <FaCheck style={{ color: "#05DF72" }} />
                                                    <p className="mb-0" style={{ color: "#939D9D", fontSize: "0.9rem" }}>Premium quality materials</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <FaCheck style={{ color: "#05DF72" }} />
                                                    <p className="mb-0" style={{ color: "#939D9D", fontSize: "0.9rem" }}>Designed for daily use</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <FaCheck style={{ color: "#05DF72" }} />
                                                    <p className="mb-0" style={{ color: "#939D9D", fontSize: "0.9rem" }}>Backed by 12-month warranty</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <FaCheck style={{ color: "#05DF72" }} />
                                                    <p className="mb-0" style={{ color: "#939D9D", fontSize: "0.9rem" }}>Eco-friendly packaging</p>
                                                </div>
                                            </div></> : 
                                            prodDetails == "specs" ? 
                                            <div className="d-flex flex-column animate-section">
                                                <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderBottom: "1px solid #181818" }}>
                                                    <p className="mb-2" style={{ color: "#6C6C66", fontSize: "15px" }}>Category</p>
                                                    <p className="mb-0 text-white" style={{ fontSize: "15px" }}>{product?.category}</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderBottom: "1px solid #181818" }}>
                                                    <p className="mb-2" style={{ color: "#6C6C66", fontSize: "15px" }}>Rating</p>
                                                    <p className="mb-0 text-white" style={{ fontSize: "15px" }}>{product?.rating}</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderBottom: "1px solid #181818" }}>
                                                    <p className="mb-2" style={{ color: "#6C6C66", fontSize: "15px" }}>Reviews</p>
                                                    <p className="mb-0 text-white" style={{ fontSize: "15px" }}>2,847</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderBottom: "1px solid #181818" }}>
                                                    <p className="mb-2" style={{ color: "#6C6C66", fontSize: "15px" }}>Availability</p>
                                                    <p className="mb-0 text-white" style={{ fontSize: "15px" }}>{product?.availabilityStatus}</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderBottom: "1px solid #181818" }}>
                                                    <p className="mb-2" style={{ color: "#6C6C66", fontSize: "15px" }}>SKU</p>
                                                    <p className="mb-0 text-white" style={{ fontSize: "15px" }}>{product?.sku}</p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderBottom: "1px solid #181818" }}>
                                                    <p className="mb-2" style={{ color: "#6C6C66", fontSize: "15px" }}>Warranty</p>
                                                    <p className="mb-0 text-white" style={{ fontSize: "15px" }}>12 months</p>
                                                </div>
                                            </div>
                                            
                                            : <div className="d-flex flex-column gap-3 animate-section">
                                                {
                                                    product?.reviews.sort((a, b) => b.rating - a.rating).map(review => {
                                                        const reviewDate = new Date(review.date);
                                                        const today = new Date();
                                                        let result = "";
                                                        if (reviewDate.getFullYear() == today.getFullYear() && reviewDate.getMonth() == today.getMonth()) {
                                                            if (reviewDate.getDate() == today.getDate()) {
                                                                result = "today";
                                                            } else if (reviewDate.getDate() - today.getDate() == 1) {
                                                                result = "yesterday";
                                                            } else {
                                                                result = `${reviewDate.getDate() - today.getDate()} days ago`;
                                                            }
                                                        } else if (reviewDate.getFullYear() == today.getFullYear() && reviewDate.getMonth() != today.getMonth()) {
                                                            if (reviewDate.getMonth() - today.getMonth() == 1) {
                                                                result = "one month ago";
                                                            } else {
                                                                result = `${Math.floor(reviewDate.getMonth() - today.getMonth())} months ago`;
                                                            }
                                                        } else if (reviewDate.getFullYear() != today.getFullYear()) {
                                                            if (Math.floor(today.getFullYear() - reviewDate.getFullYear()) == 1) {
                                                                result = "one year ago"
                                                            } else {
                                                                result = `${today.getFullYear() - reviewDate.getFullYear()} years ago`
                                                            }
                                                        }
                                                        const nameArr = review.reviewerName.split(" ");
                                                        return <div className="p-3" style={{ backgroundColor: "#141414", border: "1px solid #212121", borderRadius: "15px" }}>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div className="text-center" style={{ backgroundColor: "#431F18", borderRadius: "50%", padding: "5px 12px" }}>
                                                                        <p className="fw-bold mb-0" style={{ color: "var(--main-color)" }}>{review.reviewerName[0]}</p>
                                                                    </div>
                                                                    <p className="text-white fw-bold mb-0" style={{ fontSize: "14px" }}>{`${nameArr[0]} ${nameArr[1][0]}.`}</p>
                                                                </div>
                                                                <p style={{ fontSize: "13px", color: "#505A5B" }}>
                                                                    {result}
                                                                </p>
                                                            </div>
                                                            <div className="mb-2">{handleMiniStars(review.rating)}</div>
                                                            <p className="mb-0" style={{ color: "#98A1A1", fontSize: "14px" }}>{review.comment}</p>
                                                        </div>
                                                    }) 
                                                }
                                            </div>
                                            
                                    
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginBottom: "12rem" }}>
                        <p className="fw-bold" style={{ color: "var(--main-color)", marginBottom: "10px" }}>You May Also Like</p>
                        <h3 className="text-white mb-4" style={{ fontWeight: 900 }}>Related Products</h3>
                        <ProductsList unique={unique} xlSize={3} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Product;