import React from "react";
import Logo from "../assets/images/logo.svg";
import Search from "../assets/images/search.svg"
import Store from "../assets/images/store.svg"
// import Store from ".../assets/images/store.svg"
// This componant is for navigation bar of the website

function NavigationBar() {
  return (
    <nav className="nav-wrapper">
      <div className="nav-content">
        <ul className="list-styled">
          <li>
            <img src={Logo} alt="Apple" />
          </li>
          <li>
            <a className="link-styled">Store</a>
          </li>
          <li>
            <a className="link-styled">iphone</a>
          </li>
          <li>
            <a className="link-styled">Ari pods </a>
          </li>
          <li>
            <a className="link-styled">TV & Home</a>
          </li>
          <li>
            <a className="link-styled">Entertainment</a>
          </li>
          <li>
            <a className="link-styled">Accesories</a>
          </li>
          <li>
            <a className="link-styled">Support</a>
          </li>

          <li>
            <img src={Search} alt="Search" />
          </li>
          <li>
            <img src={Store} alt="Search" />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
