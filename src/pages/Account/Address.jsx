import AddressCard from "../../components/Account/AddressCard";

import { useEffect } from "react";

import addressStyles from "../../assets/CSS/My-Account/addresses.module.css";

function Address () {
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
    const addresses = [
        {
            address_id: 1,
            address_name: "Home",
            building_number: 123,
            street: "Main Street",
            apartment_suite: "Apt",
            apartment_suite_number: 4,
            city: "New York",
            state: "NY",
            zip_code: "10001",
            country: "United States",
            isDefault: true,
        },
        {
            address_id: 2,
            address_name: "Work",
            building_number: 456,
            street: "Office Blvd",
            apartment_suite: "Suite",
            apartment_suite_number: 20,
            city: "New York",
            state: "NY",
            zip_code: "10018",
            country: "United States",
            isDefault: false,
        },

    ]
    
    return (
        <>
            <div className="d-flex flex-column w-100 ms-md-0 ms-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="text-white fw-bold">Saved Addresses</h5>
                    <button className={`btn ${addressStyles["add-new"]} text-white`} style={{ backgroundColor: "var(--main-color)", borderRadius: "15px", fontSize: "14px", transform: "translateX(-1rem)" }}>+ Add New</button>
                </div>
                <div className={`${addressStyles["address-cards"]} row row-cols-xl-2 row-cols-sm-1 g-4 animate-section`} style={{ width: "100%" }}>
                    {
                        addresses.map(address => {
                            return <AddressCard key={address.address_id} address={address} />
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default Address;