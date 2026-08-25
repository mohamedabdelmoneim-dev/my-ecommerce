import { useEffect } from "react";

import { FaStar, FaRegStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";

import "../assets/CSS/Shop/shop.module.css";

function ShopListTheme({ listOfProducts }) {
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
    },[listOfProducts])
    const handleStars = (rating) => {
        const stars = [];
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.push(<FaStar className="me-1" style={{ fill: "gold", fontSize: "11px" }} />)
        }
        if (rating % 1 > 0) {
            stars.push(<FaStarHalfStroke className="me-1" style={{ fill: "gold", fontSize: "11px" }} />)
        }
        for (let i = 0; i < 5 - Math.ceil(rating); i++) {
            stars.push(<FaRegStar className="me-1" style={{ fontSize: "11px", fill: "var(--text-color)" }} />)
        }
        return stars;
    }
    return (
        <div className="d-flex flex-column gap-4 animate-section">
            {
                listOfProducts.map(prod => {
                    return <div className="w-100 px-4 pt-4 pb-3 d-flex gap-3" style={{ backgroundColor: "#111111", border: "1px solid #1F1F1F", borderRadius: "15px" }}>
                        <div>
                            <img src={prod.thumbnail} alt="" style={{ width: "130px", height: "120px", backgroundColor: "#FFF", borderRadius: "15px" }} />
                        </div>
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center gap-2">
                                <div>{handleStars(prod.rating)}</div>
                                <p style={{ color: "#6F726C", fontSize: "12px", marginBottom: 0 }}>(1,923)</p>
                            </div>
                            <h5 className="text-white mb-2">{prod.title}</h5>
                            <p style={{ color: "#888788", fontSize: "13px" }}>The Apex Smart Watch Series 9 combines cutting-edge health tracking with elegant design. Monitor your heart rate, sleep, and fitness goals with precision.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-end gap-2">
                                    <p className="text-white mb-0 fw-bold" style={{ fontSize: "17px" }}>${prod.price}</p>
                                    <p style={{ marginBottom: 0, color: "var(--text-color)", fontSize: "13px", fontSize: "13px" }}><del>${ Math.round((prod.price / ((100 - prod.discountPercentage) / 100)) * 100) / 100 }</del></p>
                                </div>
                                <button className="text-white py-2 px-3 add-to-cart" style={{ backgroundColor: "var(--main-color)", fontSize: "14px", borderRadius: "10px" }}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}
export default ShopListTheme;