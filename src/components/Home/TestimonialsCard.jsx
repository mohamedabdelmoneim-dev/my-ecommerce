import { FaStar } from "react-icons/fa";

import testimonialsCardStyles from "../../assets/CSS/Home/testimonials.module.css";

function TestimonialsCard ({ testId, testOppinion, testUserImage, testUserName, testUserJob }) {
    return (
        <div className={`ms-md-0 ms-4 ${testimonialsCardStyles["testimonial-card"]} p-4`} style={{ backgroundColor: "#141414", borderRadius: "15px", maxHeight: "180px" }}>
            <div className='d-flex justify-content-start gap-1 mb-2'>
                <FaStar style={{ fill: "gold" }} />
                <FaStar style={{ fill: "gold" }} />
                <FaStar style={{ fill: "gold" }} />
                <FaStar style={{ fill: "gold" }} />
                <FaStar style={{ fill: "gold" }} />
            </div>
            <div>
                <p style={{ color: "#A9A4A9", fontSize: "12px", }}>
                    "{testOppinion}"
                </p>
            </div>
            <div className='d-flex align-items-center'>
                <img className='me-3' src={testUserImage} alt="" style={{ borderRadius: "50%", width: "50px",  height: "50px"}} />
                <div className=''>
                    <p className='mb-1 text-white'>{testUserName}</p>
                    <p className='mb-1' style={{ fontSize: "13px", color: "#6F7072" }}>{testUserJob}</p>
                </div>
            </div>
        </div>
    )
}
export default TestimonialsCard;