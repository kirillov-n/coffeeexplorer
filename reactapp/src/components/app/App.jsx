import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "../appHeader/Header";
import PopupMenu from "../appPopupMenu/PopupMenu";
import "./App.css";

import Details from "../appDetails/Details";
import Map from "../appMap/Map";
import SigninForm from "../appSignin/Signin";
import SignupForm from "../appSignup/Signup";
import UserProfile from "../appProfile/Profile";

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Проверяем наличие токена доступа в localStorage при загрузке приложения
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    const handleLogin = (accessToken) => {
        setIsAuthenticated(true);
        localStorage.setItem('accessToken', accessToken);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="page">
            <Fragment>
                <BrowserRouter>
                    <Header toggleMenu={toggleMenu} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                    {isMenuOpen && (
                        <PopupMenu
                            isAuthenticated={isAuthenticated}
                            onLogout={handleLogout}
                            onClose={() => setIsMenuOpen(false)}
                        />
                    )}
                    <Routes>
                        <Route path="/" element={<Map />} />
                        <Route path="details/:establishmentID" element={<Details />} />
                        {!isAuthenticated && <Route path="/signin" element={<SigninForm onLogin={handleLogin} />} />}
                        {!isAuthenticated && <Route path="/signup" element={<SignupForm />} />}
                        {isAuthenticated && <Route path="/profile" element={<UserProfile />} />}
                        {!isAuthenticated && <Route path="/*" element={<Navigate to="/" />} />}
                    </Routes>
                </BrowserRouter>
            </Fragment>
        </div>
    );
}

export default App;
