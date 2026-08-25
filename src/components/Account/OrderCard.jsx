import { Link } from "react-router-dom";

import { FaCheck } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";

import orderCardStyles from "../../assets/CSS/My-Account/orders.module.css";

function OrderCard ({ id, orderDate, orderStatus, orderImage, orderPrice }) {
    return (
        <div className="order-card d-flex flex-column w-100 p-4 text-white mb-3" style={{ backgroundColor: "#141414", borderRadius: "15px", border: "1px solid #212121" }}>
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h6 className="fw-bold">Order {id}</h6>
                    <p style={{ color: "#636163", fontSize: "12px" }}>{orderDate}</p>
                </div>
                {
                    orderStatus == "Delivered" 
                    ? <p className="order-stat py-1 px-2 d-flex align-items-center gap-2 justify-content-center" style={{ fontSize: "12px", borderRadius: "15px", color: "#05DF6F", backgroundColor:"#12281D", border: "1px solid #0F4D2E" }}><FaCheck fill="#05DF6F" />Delivered</p>
                    : orderStatus == "In Transit"
                    ? <p className="order-stat py-1 px-2 d-flex align-items-center gap-2 justify-content-center" style={{ fontSize: "12px", borderRadius: "15px", color: "#47A2FF", backgroundColor:"#1A222C", border: "1px solid #47A2FF" }}><BsTruck fill="#47A2FF" />In Transit</p>
                    : <p className="order-stat py-1 px-2 d-flex align-items-center gap-2 justify-content-center" style={{ fontSize: "12px", borderRadius: "15px", color: "#FFAB0A", backgroundColor:"#2B2412", border: "1px solid #FFAB0A" }}><FiClock color="#FFAB0A" />Processing</p>
                }
            </div>
            <div className="orders-card-footer d-flex justify-content-between align-items-end">
                <div>
                    {
                        orderImage?.map(img => {
                            return <img src= {img} alt="" width="50px" height="50px" style={{ borderRadius: "15px", backgroundColor: "#FFF", marginRight: "10px" }} />
                        })
                    }
                    <p className="mb-0 mt-3" style={{ transform: "translateY(5px)" }}>${orderPrice}</p>
                </div>
                <Link to="#" className={orderCardStyles["view-order"]} style={{ color: "var(--main-color)", fontSize: "13px" }}>View Order <FaArrowRight fill="var(--main-color)" /></Link>
            </div>
        </div>
    )
}
export default OrderCard;