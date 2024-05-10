import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <div className="text-left">
            <h1>
                <Link to="/" className="main-button">Coffee Explorer</Link>
            </h1>
        </div>
    );
};

export default Header;
