import { Link } from "react-router-dom";

import footerCss from "../assets/CSS/General/footer.module.css";
import footerLinksCss from "../assets/CSS/General/footer-links.module.css";

const footerLinkStyles = { ...footerCss, ...footerLinksCss };

function FooterLink ({ linksTitle, links }) {
    return (
        <div className="col-xl-3 col-4 text-md-start text-center mt-lg-0 mt-5">
            <p className="text-white" style={{ fontSize: "14px" }}>{linksTitle}</p>
            <ul className="list-group">
                {
                    links.map(link => {
                        return <li className={`${footerLinkStyles["footer-categories-links"]} list-group-item bg-transparent border-0 px-0`} style={{ fontSize: "14px" }}><Link to={link.link_to} style={{ color: "#6F7072" }}>{link.link_title}</Link></li>
                    })
                }
            </ul>
        </div>
    )
}
export default FooterLink;