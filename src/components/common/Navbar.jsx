import React, { useState } from "react";
import "../../styles/navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiServices";
import logo from "../../Images/Capture.PNG";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
    const isAuthenticated = ApiService.isAuthenticated();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/?search=${searchValue}`);
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
        if (confirmLogout) {
            ApiService.logout();
            setTimeout(() => {
                navigate("/login");
            }, 500);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/">
                    <img src={logo} alt="Sankhal Mart" />
                </NavLink>
            </div>

            {/* SEARCH FORM */}
            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <div className="search-container">
                    <input
                    type="text"
                    placeholder="Search products"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <FontAwesomeIcon
                    icon={faSearch}
                    className="search-icon"
                    onClick={handleSearchSubmit}
                    />
                </div>
            </form>

            <div className="navbar-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/categories">Categories</NavLink>
                {isAuthenticated && <NavLink to="/profile">Mon compte</NavLink>}
                {isAdmin && <NavLink to="/admin">Admin</NavLink>}
                {!isAuthenticated ? <NavLink to="/login">Login</NavLink> : null}
                {isAuthenticated && (
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                )}
                <NavLink to="/cart">Cart</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;