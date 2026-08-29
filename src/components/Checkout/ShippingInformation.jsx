import { useEffect, useState } from "react";

import { BsTruck } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { LuPackage, LuZap } from "react-icons/lu";

import shippingInformationStyles from "../../assets/CSS/Checkout/shipping-inforamation.module.css";

function ShippingInformation({ shippingSelected, setShippingSelected }) {
    const countries = ["United States", "United Kongdom", "Canada", "Australia", "Germany", "France"];
    const options = [
        {
            value: "standard",
            title: "Standard Shipping",
            subtitle: "5-7 business days",
            price: "$15",
            icon: <BsTruck />
        },
        {
            value: "express",
            title: "Express Shipping",
            subtitle: "2-3 business days",
            price: "$25",
            icon: <LuPackage />
        },
        {
            value: "overnight",
            title: "Overnight Delivery",
            subtitle: "Next business day",
            price: "$45",
            icon: <LuZap />
        }
    ];
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
    const [formData, setFormData] = useState(
        localStorage.getItem("shippingInfo") 
        ? JSON.parse(localStorage.getItem("shippingInfo")) 
        : {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            country: countries[0]
        }
    );
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    useEffect(() => {
        localStorage.setItem("shippingInfo", JSON.stringify(formData));
    }, [formData])
    return(
        <div className={`${shippingInformationStyles["shipping-information"]} mb-5 animate-section`}>
            <div className="d-flex align-items-center gap-2 mb-3">
                <GrLocation style={{ color: "var(--main-color)", fontSize: "1.3rem" }} />
                <h5 className="text-white fw-bold mb-0">Shipping Information</h5>
            </div>
            <div>
                <div className={`${shippingInformationStyles["shipping-information-form"]} row g-3 needs-validation`}>
                    <div className="col-md-6">
                        <label for="validationCustom01" className="form-label">First name</label>
                        <input type="text" className="form-control" id="validationCustom01" placeholder="John" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label for="validationCustom02" className="form-label">Last name</label>
                        <input type="text" className="form-control" id="validationCustom02" placeholder="Doe" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label for="validationCustomUsername" className="form-label">Email Address</label>
                        <div className="input-group has-validation">
                            <input type="email" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" placeholder="john@example.com" name="email" value={formData.email} onChange={handleInputChange} required />
                            <div className="invalid-feedback">
                                Please Enter Your Email
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label for="validationCustom02" className="form-label">Phone Number</label>
                        <input type="tel" className="form-control" id="validationCustom02" placeholder="+1 (555) 000-0000" name="phone" value={formData.phone} onChange={handleInputChange} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label for="validationCustom03" className="form-label">Street Address</label>
                        <input type="text" className="form-control" id="validationCustom03" placeholder="123 Main Street, Apt 4" name="street" value={formData.street} onChange={handleInputChange} required />
                        <div className="invalid-feedback">
                            Please provide a valid Street Address.
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label for="validationCustom03" className="form-label">City</label>
                        <input type="text" className="form-control" id="validationCustom03" placeholder="New York" name="city" value={formData.city} onChange={handleInputChange} required />
                        <div className="invalid-feedback">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label for="validationCustom03" className="form-label">State / Province</label>
                        <input type="text" className="form-control" id="validationCustom03" placeholder="NY" name="state" value={formData.state} onChange={handleInputChange} required />
                        <div className="invalid-feedback">
                            Please provide a valid state.
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label for="validationCustom05" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="validationCustom05" placeholder="10001" name="zip" value={formData.zip} onChange={handleInputChange} required />
                        <div className="invalid-feedback">
                            Please provide a valid zip.
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label for="validationCustom04" className="form-label">Country</label>
                        <select className="form-select" id="validationCustom04" name="country" value={formData.country} onChange={handleInputChange} required>
                            {countries.map(country => <option>{country}</option>)}
                        </select>
                        <div className="invalid-feedback">
                            Please select a valid state.
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <BsTruck style={{ color: "var(--main-color)", fontSize: "1.3rem" }} />
                    <h5 className="text-white fw-bold mb-0">Shipping Method</h5>
                </div>
                <div className={shippingInformationStyles["shipping-options"]}>
                    {options.map(option => (
                        <label key={option.value} className={`${shippingInformationStyles["shipping-tile"]} ${shippingSelected === option.value ? shippingInformationStyles["shipping-active"] : ""}`}>
                            <input
                                type="radio"
                                name="shipping"
                                value={option.value}
                                checked={shippingSelected === option.value}
                                onChange={(e) => setShippingSelected(e.target.value)}
                                className={shippingInformationStyles["shipping-radio-input"]}
                            />
                            <div className={shippingInformationStyles["shipping-icon"]}>{option.icon}</div>
                            <div className={shippingInformationStyles["shipping-text"]}>
                                <p className={shippingInformationStyles["shipping-title"]}>{option.title}</p>
                                <p className={shippingInformationStyles["shipping-subtitle"]}>{option.subtitle}</p>
                            </div>
                            <div className={shippingInformationStyles["shipping-right"]}>
                                <span className={shippingInformationStyles["shipping-price"]}>{option.price}</span>
                                <span className={shippingInformationStyles["shipping-check"]}></span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ShippingInformation;