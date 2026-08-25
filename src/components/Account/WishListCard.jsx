import { useNavigate } from "react-router-dom";

function WishListCard( { items }) {
    const navigate = useNavigate();
    return (
        <>
            <div className="wishlist-card px-0 animate-section" style={{ borderRadius: "15px", border: "1px solid #222222", overflow: "hidden" }}>
                <img src={items.thumbnail} width="100%" style={{ backgroundColor: "white" }} />
                <div className="text-white d-flex flex-column justify-content-between p-3" style={{ backgroundColor: "#141414", height: "7.1rem" }}>
                    <div className="mb-2">
                        <p className="mb-0" style={{ fontSize: "13px" }}>
                            {items.title}
                        </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0" style={{ fontSize: "13px" }}>{items.price}</p>
                        <button onClick={() => navigate('/product', { state: { id: items.id } })} style={{ color: "var(--main-color)", border: "none", backgroundColor: "transparent" }}>view</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default WishListCard;