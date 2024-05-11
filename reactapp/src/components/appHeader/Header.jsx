import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import profileIcon from "../../media/Profile.svg"; 

const Header = () => {
    return (
        <div className="header-container">
            <div className="text">
                <h1>
                    <Link to="/" className="main-button">Coffee Explorer</Link>
                </h1>
            </div>
            <Link to="/signin/" className="profile-button">
                <img src={profileIcon} alt="Профиль" />
            </Link>
        </div>
    );
};

export default Header;
