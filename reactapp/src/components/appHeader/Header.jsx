import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import profileIcon from "../../media/Profile.svg";
import PopupMenu from "../appPopupMenu/PopupMenu";

const Header = ({ isAuthenticated, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="header-container">
            <div className="text">
                <h1>
                    <Link to="/" className="main-button">Coffee Explorer</Link>
                </h1>
            </div>
            <button className="profile-button" onClick={toggleMenu}>
                <img src={profileIcon} alt="Профиль" />
            </button>
            {isMenuOpen && (
                <PopupMenu
                    isAuthenticated={isAuthenticated}
                    onLogout={onLogout}
                    onClose={toggleMenu}
                >
                    {!isAuthenticated && (
                        <div className="auth-buttons">
                            <Link to="/signin" className="auth-button">Войти</Link>
                            <Link to="/signup" className="auth-button">Зарегистрироваться</Link>
                        </div>
                    )}
                </PopupMenu>
            )}
        </div>
    );
};

export default Header;
