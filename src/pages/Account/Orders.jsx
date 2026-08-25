import OrderCard from "../../components/Account/OrderCard";
import ProductsContext  from "../../contexts/ProductsContext";

import { useContext, useEffect } from "react";

import ordersStyles from "../../assets/CSS/My-Account/orders.module.css";

function Orders () {
    const { products } = useContext(ProductsContext)
    if (!products) return <div className="d-flex justify-content-center align-items-center w-100">
        <div class="spinner-border" style={{ color: "var(--main-color)" }} role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>;

    const orders = [
        {order_id: "Order #LXE-284710", order_date: "March 28, 2026", order_status: "Delivered", order_images: [products.products[0].thumbnail, products.products[1].thumbnail], order_price: (products.products[0].price + products.products[1].price).toFixed(2)},
        {order_id: "Order #LXE-273891", order_date: "March 15, 2026", order_status: "In Transit", order_images: [products.products[28].thumbnail], order_price: (products.products[28].price).toFixed(2)},
        {order_id: "Order #LXE-261044", order_date: "February 28, 2026", order_status: "Processing", order_images: [products.products[18].thumbnail, products.products[50].thumbnail], order_price: (products.products[18].price + products.products[50].price).toFixed(2)},
    ]
    const otherOrders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];
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
        
    return (
        <div className={`${ordersStyles["orders"]} w-100 animate-section`}>
            <h5 className="text-white fw-bold">Order History</h5>
            <div className={`${ordersStyles["order-cards"]} animate-section`}>
                {
                    orders.map(order => {
                        return <OrderCard id={order.order_id} orderDate = {order.order_date} orderStatus={order.order_status} orderImage={order.order_images} orderPrice={order.order_price} />
                    })
                }
                {
                    otherOrders.map (order => {
                        return <OrderCard id={order.id} orderDate = {order.date} orderStatus={order.status} orderImage={order.items?.map(item => item.thumbnail)} orderPrice={order?.items ? order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2) : "0.00"} />
                    }) 
                }
            </div>
        </div>
    )
}
export default Orders;