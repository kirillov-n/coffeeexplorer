import './App.css';
import React, {Fragment} from "react";
import Header from "../appHeader/Header";
// import Home from "../appHome/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Details from '../appDetails/Details';
import Map from "../appMap/Map";

function App() {
    return (
        <Fragment>
            <Header/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Map/> } />
                        <Route path="details/:establishmentID" element={<Details />} />
                    </Routes>
                </BrowserRouter>
            {/* <Home/> */}
        </Fragment>
    );
}

export default App;