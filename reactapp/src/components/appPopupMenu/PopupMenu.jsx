import React from "react";
import { Link } from "react-router-dom";
import "./PopupMenu.css";

const PopupMenu = ({ isAuthenticated, onLogout, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    const handleLogout = () => {
        onLogout();
        handleClose();
    };

    return (
        <div className="popup-menu">
            <ul>
                {!isAuthenticated && (
                    <div>
                        <li>
                            <Link to="/signin" onClick={handleClose}>Войти</Link>
                        </li>
                        <li>
                            <Link to="/signup" onClick={handleClose}>Зарегистрироваться</Link>
                        </li>
                    </div>
                )}
                {isAuthenticated && (
                    <div>
                        <li>
                        <Link to="/profile" onClick={handleClose}>Профиль</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Выйти</button>
                        </li>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default PopupMenu;
