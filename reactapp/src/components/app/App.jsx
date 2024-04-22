import './App.css';
import React, {Fragment} from "react";
import Header from "../appHeader/Header";
import Home from "../appHome/Home";

function App() {
    return (
        <Fragment>
            <Header/>
            <Home/>
        </Fragment>
    );
}

export default App;