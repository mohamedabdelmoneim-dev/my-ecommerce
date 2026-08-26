import FooterLink from '../components/FooterLinks';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';


import logo from "../assets/images/logo.png";


import { SlEnvolope } from "react-icons/sl";
import { FaArrowRight, FaInstagram } from "react-icons/fa6";
import { FiTwitter, FiYoutube, FiFacebook } from "react-icons/fi";


import footerCss from "../assets/CSS/General/footer.module.css";
import footerLinksCss from "../assets/CSS/General/footer-links.module.css";

const footerStyles = { ...footerCss, ...footerLinksCss };

function Footer () {
    useEffect(() => {
            const allElements = document.querySelectorAll(".animate-section > *");
            const observer = new IntersectionObserver (entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            }, {threshold: 0.2});
            allElements.forEach(el => observer.observe(el))
            
            return () => observer.disconnect();
        },[])
    const footerLinks = [
        {
            title: "Shop",
            links: [
                {link_title: "New Arrivals", link_to: "/shop/new"},
                {link_title: "Electronics", link_to: "/shop/electronics"},
                {link_title: "Fashion", link_to: "/shop/fashion"},
                {link_title: "Home & Living", link_to: "/shop/home"},
                {link_title: "Accessories", link_to: "/shop/accessories"},
            ],
        },
        {
            title: "Support", 
            links: [
                {link_title: "Help Center", link_to: "#"},
                {link_title: "Shipping Info", link_to: "#"},
                {link_title: "Returns", link_to: "#"},
                {link_title: "Order Tracking", link_to: "#"},
                {link_title: "Contact Us", link_to: "#"},
            ],
        },
        {
            title: "Company",
            links: [
                {link_title: "About LUXE", link_to: "#"},
                {link_title: "Careers", link_to: "#"},
                {link_title: "Press", link_to: "#"},
                {link_title: "Sustainability", link_to: "#"},
                {link_title: "Affiliates", link_to: "#"},
            ],
        },
    ]
    return (
        <>
            <section className={`animate-section ${footerStyles["join-community"]} mb-5 pt-5`} style={{ borderBottom: "1px solid #242424",  borderTop: "1px solid #242424" }}>
                <div className="container">
                    <div className="d-flex align-items-center justify-content-md-between justify-content-center pb-5 flex-column flex-lg-row gap-4 w-100">
                        <div className='w-lg-50 w-100 text-sm-start text-center' style={{ width: "40%" }}>
                            <h4 className='text-white fw-bold mb-3'>Join the LUXE community</h4>
                            <p style={{ color: "#6F7072" }}>Get exclusive deals, new arrivals, and style inspiration delivered to your inbox.</p>
                        </div>
                        <div className={`${footerStyles["footer-email-sub"]} d-flex gap-2 align-items-sm-center justify-content-lg-center justify-content-sm-start justify-content-center flex-column flex-sm-row flex-lg-row w-100`} style={{ width: "60%" }}>
                            <div className={`${footerStyles["email"]} px-3 py-2 d-flex align-items-center`} style={{ backgroundColor: "#171717", borderRadius: "15px", height: "45px", transition: "0.3s" }}>
                                <SlEnvolope style={{ fill: "#6F7072" }} />
                                <input type="email" name="email" id="email" placeholder='your@email.com' className='border-0 ms-md-2 ms-1 text-white' style={{ backgroundColor: "#171717", fontSize: "14px", width: "250px", transition: "0.3s" }} />
                            </div>
                            <button type="submit" className={`scale-hover-btn ${footerStyles["home-subscribe-btn"]}`} style={{ backgroundColor: "var(--main-color)", color: "#FFF", fontSize: "14px", border: "none", borderRadius: "15px", transition: "0.3s", width: "140px", height: "50px" }}>Subscribe <FaArrowRight /></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`animate-section ${footerStyles["footer-links"]} pb-5`} style={{ borderBottom: "1px solid #242424" }}>
                <div className="container">
                    <div className="d-flex justify-content-start row">
                        <div className='d-flex flex-column col-xl-3 col-12 mb-xl-0 mb-5 text-md-start text-sm-center'>
                            <img src={logo} className={`${footerStyles["logo"]} mb-3`} alt="Logo" style={ { width: '110px', cursor: 'pointer'} } />
                            <p style={{ color: "#6F7072", fontSize: "14px" }}>Premium products curated for those who demand the best in quality, design, and innovation.</p>
                            <div className={footerStyles["social-media"]}>
                                <ul className="list-group list-group-horizontal gap-2 mt-0">
                                    <li className="list-group-item border-0" style={{ backgroundColor: "#171717", padding: "8px 12px", borderRadius: "10px" }}><Link><FaInstagram color='#6F7072' /></Link></li>
                                    <li className="list-group-item border-0" style={{ backgroundColor: "#171717", padding: "8px 12px", borderRadius: "10px" }}><Link><FiTwitter color='#6F7072' /></Link></li>
                                    <li className="list-group-item border-0" style={{ backgroundColor: "#171717", padding: "8px 12px", borderRadius: "10px" }}><Link><FiYoutube color='#6F7072' /></Link></li>
                                    <li className="list-group-item border-0" style={{ backgroundColor: "#171717", padding: "8px 12px", borderRadius: "10px" }}><Link><FiFacebook color='#6F7072' /></Link></li>
                                </ul>
                            </div>
                        </div>
                        {
                            footerLinks.map(footerlink => {
                                return <FooterLink linksTitle = {footerlink.title} links = {footerlink.links} key={footerlink.title} />
                            })
                        }
                    </div>
                </div>
            </section>
            <footer className={`animate-section pt-4 pb-4 ${footerStyles["footer-copyright"]}`}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <p className='m py-0b-0' style={{ color: "#424646", fontSize: "13px" }}>&copy; 2026 LUXE. All rights reserved.</p>
                        </div>
                        <div>
                            <ul className='list-group list-group-horizontal d-flex'>
                                <li className='footer-copyright list-group-item border-0 py-0' style={{ backgroundColor: "transparent" }}>
                                    <Link style={{ color: "#464642", fontSize: "13px" }}>Privacy Policy</Link>
                                </li>
                                <li className='footer-copyright list-group-item border-0 py-0' style={{ backgroundColor: "transparent" }}>
                                    <Link style={{ color: "#464642", fontSize: "13px" }}>Terms of Service</Link>
                                </li>
                                <li className='footer-copyright list-group-item border-0 py-0' style={{ backgroundColor: "transparent" }}>
                                    <Link style={{ color: "#464642", fontSize: "13px" }}>Cookie Settings</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;