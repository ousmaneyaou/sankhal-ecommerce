import React from "react";
import '../../styles/footer.css';
import { NavLink } from "react-router-dom";

const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer-links">
                <ul>
                    <NavLink to={"/"}>À propos de nous</NavLink>
                    <NavLink to={"/"}>Nous contacter</NavLink>
                    <NavLink to={"/"}>Terms & Conditions</NavLink>
                    <NavLink to={"/"}>Politique de confidentialité</NavLink>
                    <NavLink to={"/"}>FAQs</NavLink>
                </ul>
            </div>
            <div className="footer-info">
                <p>&copy; 2025 sonkal Mart. Tous droits réservés.</p>
            </div>
        </footer>
    )
}
export default Footer;