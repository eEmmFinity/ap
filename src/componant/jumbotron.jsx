import React from "react";
import Iphone from "../assets/images/iphone-14.jpg"
import HoldingIphone from "../assets/images/iphone-hand.png"
// import SoundSection from "./soundSection";

function Jumbotron() {

const learnMore = () => {
    const element = document.querySelector(".sound-section");
    window.scrollTo({
        top: element?.getBoundingClientRect().top,
        left: 0,
        behavior: 'smooth'
    })
}

    return (

       <div className="jumbotron-section wrapper">
        <h2 className = "title">New</h2>
        <img src={Iphone} alt="iphone 14 pro" />
        <p className="text">Big and Bigger</p>
        <span className="description">
            From $41.62/mo. for 24 mo. or $999 before trade-in
        </span>
        <ul className="links">
            <li>
                <button className="button">Buy</button>
            </li>
            <li className="link" onClick={learnMore}>Learn More</li>
        </ul>
        <img src={HoldingIphone} alt="iPhone" className="iphone-img" />
       </div>
      );
}

export default Jumbotron;