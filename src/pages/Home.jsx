import Category from '../components/Home/Category';
import ProductsList from '../components/ProductsList';
import MarqueeItem from '../components/Home/MarqueeItem';
import ProductsContext  from "../contexts/ProductsContext";
import AdvantageCard from '../components/Home/AdvantageCard';
import TestimonialsCard from '../components/Home/TestimonialsCard';

import { FaPlay } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { HiLightningBolt } from "react-icons/hi";
import { LuSparkles, LuShield } from "react-icons/lu";


import { Link } from 'react-router-dom';
import { useRef, useEffect, useContext } from 'react';


import back from "../assets/images/hero_section.png"
import firstCat from "../assets/images/categories/category_01.png";
import secCat from "../assets/images/categories/category_02.png";
import thirdCat from "../assets/images/categories/category_03.png";
import fourthCat from "../assets/images/categories/category_04.png";
import testOne from "../assets/images/testimonials/testinmonials_01.jpg"
import testTwo from "../assets/images/testimonials/testinmonials_02.jpg"
import testThree from "../assets/images/testimonials/testinmonials_03.jpg"


import ratesStyles from "../assets/CSS/Home/rates.module.css";
import trendingNowStyles from "../assets/CSS/Home/trending-now.module.css";
import heroSectionStyles from "../assets/CSS/Home/hero-section.module.css";
import limitedOfferStyles from "../assets/CSS/Home/limited-offer.module.css";
import someAdvantagesStyles from "../assets/CSS/Home/some-advantages.module.css";
import browseCategoriesStyles from "../assets/CSS/Home/browse-categories.module.css";

const homeStyles = { ...heroSectionStyles, ...browseCategoriesStyles, ...limitedOfferStyles, ...trendingNowStyles, ...someAdvantagesStyles, ...ratesStyles };


function Home() {
    
    const categories = [
        {title: "electronics", image: firstCat, Link: "/shop/electronics", stock: 546, bgColor: "#131625"},
        {title: "fashion", image: secCat, Link: "/shop/fashion", stock: 754, bgColor: "#291919"},
        {title: "home & Living", image: thirdCat, Link: "/shop/home & living", stock: 1565, bgColor: "#182718"},
        {title: "accessories", image: fourthCat, Link: "/shop/accessories", stock: 355, bgColor: "#252115"},
    ]
    const scrollNav = useRef(null);

    const heroScroll = () => {
        scrollNav.current?.classList.add("hero-active");
    }
    useEffect(() => {
        const handleScroll = () => heroScroll();
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
        

    }, []);
    const { products } = useContext(ProductsContext)
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
    },[products])
    const seen = new Set();
    const unique = products ? products["products"].filter(prod => {
        if (seen.has(prod.category)) return false;
        seen.add(prod.category);
        return true;
    }) : "";
    const advantages = [
        {icon: <BsTruck />, title: "Free Shipping", desc: "On orders over $200"},
        {icon: <LuShield />, title: "Secure Payment", desc: "100% protected checkout"},
        {icon: <FiRefreshCw />, title: "Easy Returns", desc: "30-day return policy"},
        {icon: <LuSparkles />, title: "Premium Quality", desc: "Curated products only"},
    ]
    const testimonials = [
        {
            testimonial_id: 1,
            testimonial_oppinion: "LUXE has completely transformed my shopping experience. The quality is unmatched and delivery is lightning fast.",
            testimonial_user_image: testOne,
            testimonial_username: "Sarah M.",
            testimonial_user_job: "Fashion Designer",
        },
        {
            testimonial_id: 2,
            testimonial_oppinion: "Best curated electronics store I've found. Every product exceeds expectations.",
            testimonial_user_image: testTwo,
            testimonial_username: "James K.",
            testimonial_user_job: "Tech Enthusiast",
        },
        {
            testimonial_id: 3,
            testimonial_oppinion: "The home collection is stunning. I've bought multiple pieces and each one is perfection.",
            testimonial_user_image: testThree,
            testimonial_username: "Amara J.",
            testimonial_user_job: "Interior Stylist",
        },
    ]
    
    return (
        <>
            <div className={`${homeStyles["hero-section"]} animate-section`} style={{background: `url(${back} center center/cover no-repeat`, maxWidth: "100%"}}>
                <div className="container" style={{ position: 'relative' }} >
                    <div className='w-25'>
                        <p className={`${homeStyles["new-season"]} py-1 fw-bold text-center`}><LuSparkles /> NEW SEASON 2026</p>
                    </div>
                    <div className='d-flex justify-content-center justify-content-md-start flex-start row '>
                        <div className='col-lg-6 col-12' style={{ fontFamily: 'Pretendard, sans-serif' }}>
                            <h1 className={`${homeStyles["hero-header"]} text-white mb-3 `}>Discover <span className={homeStyles["gradient-text"]} >Premium</span> Products<span className={homeStyles["dot"]}></span></h1>
                            <p className='w-sm-75 w-100' style={{ color: "var(--text-color)", fontSize: '1.25rem' }}>Curated collection of luxury electronics, fashion, and lifestyle essentials for the discerning individual.</p>
                            <div className='d-flex flex-lg-row flex-column gap-3 mt-5'>
                                <button className='py-3 fw-bold d-flex justify-content-center'>
                                    <Link className='text-decoration-none text-white d-flex align-items-center' to="/shop">
                                        Shop Now <FaArrowRight className='ms-3' style={{ fontSize: '15px' }} />
                                    </Link>
                                </button>
                                <button className='py-3 fw-bold'>
                                    <Link className='text-decoration-none text-white d-flex align-items-center' to="/shop"><FaPlay className='me-2' />
                                        Watch Story
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${homeStyles["hero-rates"]} position-relative`}>
                    <div className="container">
                        <div className="pt-4 d-flex justify-content-sm-start justify-content-center w-sm-50 w-100 mt-5 ">
                            <div className={`${homeStyles["hero-rates-content"]} d-flex text-white gap-xl-5 gap-sm-3 gap-2 text-center align-items-center`} style={{ fontWeight: 900 }}>
                                <div>
                                    <h3>50k+</h3>
                                    <p>Happy Customers</p>
                                </div>
                                <div>
                                    <h3>2K+</h3>
                                    <p>Products</p>
                                </div>
                                <div>
                                    <h3>4.9+</h3>
                                    <p>Avg Rating</p>
                                </div>
                            </div>
                            <div className={homeStyles["hero-scroll"]} ref={scrollNav} onScroll={heroScroll} >
                                <p className='mb-1' style={ { color: "var(--text-color)", fontWeight: 700, } }>SCROLL</p>
                                <span className={homeStyles["scroll-indicator"]}></span>
                            </div>
                        </div>
                    </div>
                    <div className={`${homeStyles["marquee-slider"]} w-100 py-3 px-3 mt-3`}>
                        <div className={`${homeStyles["marquee-content"]} d-flex gap-sm-5 gap-3 justify-content-start`}>
                            <MarqueeItem />
                        </div>
                    </div>
                </div>
            </div>
            <section className={`animate-section ${homeStyles["browse-categories"]} mt-5`}>
                <div className="container">
                    <div className="d-flex flex-column">
                        <h6 className='mb-4' style={{color: "var(--main-color)", fontWeight: 900}}>BROWSE CATEGORIES</h6>
                        <div className={`${homeStyles["shop-by-collection"]} d-flex justify-content-between align-items-sm-center align-items-end mb-sm-5 mb-3`}>
                            <div>
                                <h2 className='text-white fs-1' style={{ fontWeight: 900 }}>Shop by Collection</h2>
                            </div>
                            <button style={{ color: "var(--text-color)", backgroundColor: 'transparent', border: 'none', transition: '0.3s' }}><Link to="/shop" style={{ color: 'var(--text-color)', transition: '0.3s' }}>View all <FaArrowRight /> </Link></button>
                        </div>
                        <div className='d-flex row align-items-center justify-content-sm-start justify-content-center animate-section' >
                            <Category categories = {categories} />
                        </div>
                    </div>
                </div>
            </section>
            <section className={`animate-section ${homeStyles["handpicked"]} mt-5`}>
                <div className="container">
                    <div className="d-flex flex-column">
                        <h6 className='mb-4' style={{color: "var(--main-color)", fontWeight: 900}}>HANDPICKED</h6>
                        <div className={`${homeStyles["featured-products"]} d-flex justify-content-between align-items-sm-center align-items-end mb-sm-5 mb-4`}>
                            <div>
                                <h2 className='text-white fs-1' style={{ fontWeight: 900 }}>Featured Products</h2>
                            </div>
                            <button style={{ color: "var(--text-color)", backgroundColor: 'transparent', border: 'none', transition: '0.3s' }}><Link to="/shop" style={{ color: 'var(--text-color)', transition: '0.3s' }}>Shop all <FaArrowRight /> </Link></button>
                        </div>
                        <ProductsList limit={4} category={"variable"} unique={unique} xlSize={3} />
                    </div>
                </div>
            </section>
            <section className={`animate-section ${homeStyles["limited-offer"]} mb-5`} style={{ marginTop: "100px", }}>
                <div className="container">
                    <div className={`${homeStyles["limited-offer-content"]} d-flex justify-content-between align-items-center row`} style={{ borderRadius: "25px", height: "fit-content", background: "linear-gradient(135deg, #FF613B, #FF9133, #FF582F)"}}>
                        <div className='d-flex flex-column p-5 text-white col-xl-5 col-md-6 col-12'>
                            <p className=' fw-bold d-flex align-items-center gap-1' style={{ letterSpacing: "1px" }}><HiLightningBolt className='fs-4' /> LIMITED OFFER</p>
                            <h1 style={{ fontWeight: 900, fontSize: "3rem", letterSpacing: "-3px" }}>Up to 40% Off Premium Gear</h1>
                            <p style={{ color: "#FFD8C8", fontSize: "1.1rem" }}>Limited time offer on our bestselling electronics and accessories. Don't miss out.</p>
                        </div>
                        <div className='d-flex flex-column align-items-center col-xl-3 col-lg-4 col-md-5'>
                            <div className={`${homeStyles["countdown"]} d-flex align-items-center gap-3 text-white mb-4`}>
                                <div className='text-center px-3 pb-0 pt-3' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius: "15px" }}>
                                    <h2 style={{ fontWeight: 900 }}>48</h2>
                                    <p style={{ color: "#FFCFB5", fontSize: "12px" }}>Hours</p>
                                </div>
                                <div  className='text-center px-3 pb-0 pt-3' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius: "15px" }}>
                                    <h2 style={{ fontWeight: 900 }}>30</h2>
                                    <p style={{ color: "#FFCFB5", fontSize: "12px" }}>Minutes</p>
                                </div>
                                <div  className='text-center px-3 pb-0 pt-3' style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius: "15px" }}>
                                    <h2 style={{ fontWeight: 900 }}>00</h2>
                                    <p style={{ color: "#FFCFB5", fontSize: "12px" }}>Seconds</p>
                                </div>
                            </div>
                            <button className={`border-0 py-3 ${homeStyles["limited-sale"]} mb-5`} style={{ borderRadius: "15px", width: "65%", transition: "0.3s" }}><Link to="/shop" className='fw-bold' style={{ color: "var(--main-color)" }}>Shop the Sale <FaArrowRight /></Link></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`animate-section ${homeStyles["trending-now"]}`} style={{ marginBottom: "100px" }}>
                <div className="container">
                    <div className="d-flex flex-column">
                        <h6 className='mb-4' style={{color: "var(--main-color)", fontWeight: 900}}>EXPLORE MORE</h6>
                        <div className={`${homeStyles["featured-products"]} d-flex justify-content-between align-items-sm-center align-items-end mb-sm-5 mb-4`}>
                            <div>
                                <h2 className='text-white fs-1 mb-0' style={{ fontWeight: 900 }}>Trending Now</h2>
                            </div>
                            <button style={{ color: "var(--text-color)", backgroundColor: 'transparent', border: 'none', transition: '0.3s' }}><Link to="/shop" style={{ color: 'var(--text-color)', transition: '0.3s' }}>Shop all <FaArrowRight /> </Link></button>
                        </div>
                        <ProductsList limit={8} category={"variable"} unique={unique} xlSize={3} />
                        <div className='d-flex justify-content-center mt-5'>
                            <button type='button' className={`${homeStyles["trending-btn"]} py-3 px-5 border-0`} style={{ borderRadius: "15px" }}><Link to="/shop" className={`${homeStyles["load-more"]} text-white fw-bold`}>Load More Products</Link></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`animate-section container-fluid ${homeStyles["some-advantage"]}`} style={{ marginBottom: "100px", backgroundColor: "#0D0D0D", borderTop: "solid 1px #242424", borderBottom: "solid 1px #242424" }}>
                <div className="container">
                    <div className={` ${homeStyles["advantages"]} d-flex justify-content-between flex-wrap w-100 py-5`}>
                        {
                            advantages.map(adv => {
                                return <AdvantageCard advIcon = {adv.icon} advTitle = {adv.title} advDesc = {adv.desc} />
                            }) 
                        }
                    </div>
                </div>
            </section>
            <section className={`animate-section ${homeStyles["testimonials"]}`} style={{ marginBottom: "70px" }}>
                <div className="container">
                    <div className='text-center mb-5'>
                        <p className='fw-bold' style={{ color: "var(--main-color)" }}>TESTIMONIALS</p>
                        <h1 className='text-white' style={{ fontWeight: 900 }}>What Our Customers Say</h1>
                    </div>
                    <div className='d-flex flex-wrap gap-3 justify-content-xl-start align-items-center' style={{ width: "100%" }} >
                        {
                            testimonials.map(testimonial => {
                                return (<TestimonialsCard
                                    testId={testimonial.testimonial_id}
                                    testOppinion={testimonial.testimonial_oppinion}
                                    testUserImage={testimonial.testimonial_user_image}
                                    testUserName={testimonial.testimonial_username}
                                    testUserJob={testimonial.testimonial_user_job}
                                />)
                            })
                        }
                    </div>
                </div>
            </section>
            <section className={`animate-section ${homeStyles["home-rates"]} pb-5`}>
                <div className="container" style={{ borderTop: "1px solid #242424", paddingTop: "70px" }}>
                    <div className="row align-items-start">
                        <div className='col-xl-3 col-lg-4 col-sm-6 text-center'>
                            <h2 className='text-white' style={{ fontWeight: 900, fontSize: "40px" }}>50,000+</h2>
                            <p style={{ color: "#6F7072", fontSize: "13px" }}>Happy Customers</p>
                        </div>
                        <div className='col-xl-3 col-lg-4 col-sm-6 text-center mt-sm-0 mt-5'>
                            <h2 className='text-white' style={{ fontWeight: 900, fontSize: "40px" }}>2,000+</h2>
                            <p style={{ color: "#6F7072", fontSize: "13px" }}>Products Listed</p>
                        </div>
                        <div className='col-xl-3 col-lg-4 col-sm-6 text-center mt-sm-0 mt-5'>
                            <h2 className='text-white' style={{ fontWeight: 900, fontSize: "40px" }}>98%</h2>
                            <p style={{ color: "#6F7072", fontSize: "13px" }}>Satisfaction Rate</p>
                        </div>
                        <div className='col-xl-3 col-lg-4 col-sm-6 text-center mt-xl-0 mt-lg-4 mt-sm-0 mt-5'>
                            <h2 className='text-white' style={{ fontWeight: 900, fontSize: "40px" }}>24/7</h2>
                            <p style={{ color: "#6F7072", fontSize: "13px" }}>Support Available</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home;