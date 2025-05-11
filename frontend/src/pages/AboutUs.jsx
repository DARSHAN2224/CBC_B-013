import React from 'react';
import Navbar from "../components/Navbar";
import About from "../components/About"

export default function AboutUs(){
    return(
        <>
        <Navbar getStarted = {false} />
        <About/>
        </>
    ) 
}