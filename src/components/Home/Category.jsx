import { Link } from "react-router-dom";

import { IoIosArrowForward } from "react-icons/io";

import categoryStyles from "../../assets/CSS/Home/browse-categories.module.css";

function Category ( { categories } ) {
    return (
        categories.map(cat => {
            return (
                <Link key={cat.id} to={cat.link} className="col-11 col-lg-3 col-sm-4 mb-4">
                    <div className={`${categoryStyles["category"]} position-relative`} style={{ borderRadius: "15px", overflow: "hidden" }}>
                    <div className={`${categoryStyles["cat-overlay"]}`} style={{ background: `linear-gradient(to top, ${cat.bgColor}, transparent)` }}></div>
                        <div className={`${categoryStyles["cat-back"]}`}>
                            <img src={cat.image} alt="" width="100%" />
                        </div>
                        <div className='position-absolute bottom-0' style={{ left: "1.5rem" }}>
                            <h5 className='text-white fw-bold'>{cat.title.slice(0, 1).toUpperCase() + cat.title.slice(1)}</h5>
                            <p style={{ color: "var(--text-color)" }}>{Math.floor(Number(cat.stock) / 100) * 100}+ products<IoIosArrowForward className={`${categoryStyles["cat-arrow"]}`} /></p>
                        </div>
                    </div>
                </Link>
            )
        })
    )
}

export default Category;