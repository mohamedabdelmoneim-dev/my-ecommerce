import marqueeStyles from "../../assets/CSS/Home/hero-section.module.css"

function MarqueeItem () {
    const marqueItems = ["Free Shipping Over $200", "New Season Arrivals", "30-Day Returns", "Premium Quality", "Exclusive Deals", "Customer Favorite", "Free Shipping Over $200", "New Season Arrivals", "30-Day Returns", "Premium Quality", "Exclusive Deals", "Customer Favorite"]
    return (
        <>
            {
                marqueItems.map (item => {
                    return (
                        <>
                            <div className={`d-flex align-items-center gap-1 ${marqueeStyles["marquee-item"]}`}>
                                <span className={`${marqueeStyles["marquee-dot"]}`}></span>
                                <p className='mb-1' style={{ color: "var(--text-color)" }}>{item}</p>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}
export default MarqueeItem;