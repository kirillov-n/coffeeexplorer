import './App.css';
import React, {Fragment} from "react";
import Header from "../appHeader/Header";
// import Home from "../appHome/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Details from "../appDetails/Details";
import Map from "../appMap/Map";
import SigninForm from "../appSignin/Signin";
import SignupForm from "../appSignup/Signup";
import UserProfile from "../appProfile/Profile";

function App() {
    return (
        <div className="page">
            <Fragment>
                    <BrowserRouter>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<Map/>} />
                            <Route path="details/:establishmentID" element={<Details/>} />
                            <Route path="/signin/" element={<SigninForm/>} />
                            <Route path="/signup/" element={<SignupForm/>} />
                            <Route path="/profile/" element={<UserProfile/>} />
                        </Routes>
                    </BrowserRouter>
                {/* <Home/> */}
            </Fragment>
        </div>
    );
}

export default App;