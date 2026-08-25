import PaymentCard from "../../components/Account/PaymentCard";

import { useEffect } from "react";

import paymentStyles from "../../assets/CSS/My-Account/payment.module.css";

function Payment () {
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
    const cards = [
        {
            card_id: 1,
            typeof_card: "Visa",
            card_number: "4613 5684 1234 4242",
            expiry_date: "12/27",
            background_color: "#1E53DF",
            isDefault: true,
        },
        {
            card_id: 2,
            typeof_card: "Mastercard",
            card_number: "7534 1234 4567 8821",
            expiry_date: "08/26",
            background_color: "#D83520",
            isDefault: false,
        },
    ]
    return (
        <div className="d-flex flex-column w-100">
            <div className="d-flex justify-content-between align-items-center mb-4 w-100">
                <h5 className="text-white fw-bold">Payment Methods</h5>
                <button className={`${paymentStyles["add-new"]} btn text-white`}>+ Add Card</button>
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-4 animate-section w-100 ms-md-0 ms-1">
                {
                    cards.map(card => {
                        return <PaymentCard key={card.card_id} card={card} />
                    })
                }
            </div>
        </div>
    )
}
export default Payment;