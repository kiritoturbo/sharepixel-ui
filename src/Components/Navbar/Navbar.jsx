import React, { useState } from "react";
import "../../main.css";
import { SiConsul } from "react-icons/si";
import { BsPhoneVibrate } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { FcMenu } from "react-icons/fc";
import { Link } from 'react-router-dom'

// import logo from '../../Assets/logo.png'
function Navbar() {
  // show menu in the smaill width screens
  const [active, setActive] = useState("navBarMenu");

  const showNavBar = () => {
    setActive("navBarMenu showNavBar");
  };

  const removeNavBar = () => {
    setActive("navBarMenu");
  };

  ///add a backgroud color to the second navbar
  const [noBg, addBg] = useState("navBarTwo");

  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg("navBarTwo navbar_With_Bg");
    } else {
      addBg("navBarTwo");
    }
  };
  window.addEventListener("scroll", addBgColor);

  return (
    <div className="navBar  flex">
      <div className="navBarOne flex">
        <div>
          <SiConsul className="icon" />
        </div>

        <div className="none flex">
          <li className="flex">
            <BsPhoneVibrate className="icon" />
            Support
          </li>
          <li className="flex">
            <AiOutlineGlobal className="icon" />
            Language
          </li>
        </div>

        <div className="atb flex">
        <Link to="/login">
          <span>Sign In</span>
        </Link>

        <span>Sign Out</span>
        </div>
      </div>

      <div className={noBg}>
        <div className="logoDiv">
          {/* <img src={logo} alt="" className="logo" /> */}
        </div>

        <div className={active}>
          <ul className="menu flex">
            <Link to="/">
              <li onClick={removeNavBar} className="listItem">
                Home
              </li>
            </Link>
            <Link to="/accesstokenfacebook">
              <li onClick={removeNavBar} className="listItem">
                Update Token Facebook
              </li>
            </Link>
            <Link to="/historysharepx">
              <li onClick={removeNavBar} className="listItem">
                History - Share Pixel
              </li>
            </Link>
            {/* <li onClick={removeNavBar} className="listItem">
              Seats
            </li>
            <li onClick={removeNavBar} className="listItem">
              Destinations
            </li> */}
          </ul>

          <button onClick={removeNavBar} className="btn flex btnOne">
            Contact
          </button>
        </div>

        <button className="btn flex btnTwo">Contact</button>

        <div onClick={showNavBar} className="toggleIcon">
          <FcMenu className="icon" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
