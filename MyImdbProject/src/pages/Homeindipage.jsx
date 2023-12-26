import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import Homeindi from "../components/Homeindi";
import { useLocation } from "react-router-dom";

function Homeindipage(){
    const location = useLocation();
    let propsValue = null;
    if(location.state){
        propsValue = location.state.props;
        console.log(propsValue);
    }
    return(
        <>
            <Header />
            <Homeindi props={propsValue}/>
            <Footer />
        </>
    )
}

export default Homeindipage;