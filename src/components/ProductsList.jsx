import ProductCard from "./ProductCard";
import  ProductsContext  from "../contexts/ProductsContext";

import { useContext, useEffect } from "react";

function ProductsList ({ xlSize, lgSize, limit = undefined, category = undefined, unique, ms = 0 }) {
    const { products } = useContext(ProductsContext)
    const status = ["Best Seller", "New", "Popular", "Limited", "Trending", "Sale", "Luxury"];

    if (!products) return <div className="d-flex justify-content-center align-items-center w-100">
        <div className="spinner-border" style={{ color: "var(--main-color)" }} role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>;
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
    },[unique])
    return (
        <div className={`ms-${ms} products-list row g-xl-3 g-5 w-100 align-self-center justify-content-xl-start justify-content-center animate-section`}>

            
            {
                
                unique.slice(0, limit).map(prod => {
                    return <ProductCard key={prod.id} xlSize={xlSize} lgSize={lgSize} {...prod} status={status} />
                })
            }
        </div>
    )
}
export default ProductsList;