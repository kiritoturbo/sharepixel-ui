import React, { useState,useEffect } from "react";
import "../../main.css";
import { SiConsul } from "react-icons/si";
import { BsPhoneVibrate } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { FcMenu } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../AuthContext/AuthContext";

// import logo from '../../Assets/logo.png'
function Navbar() {
  // show menu in the smaill width screens
  const [active, setActive] = useState("navBarMenu");
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [username, setUsername] = useState(null);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const showNavBar = () => {
    setActive("navBarMenu showNavBar");
  };

  const removeNavBar = () => {
    setActive("navBarMenu");
  };

  const handleSignOut = () => {
    logout();
    setUsername(null); // Cập nhật trạng thái
    navigate("/login"); // Điều hướng về trang đăng nhập
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
          {/* <img src="https://truestore.vn/wp-content/themes/twentysixteen/assets/images/brand-logos/desktop-logo.svg" alt="" className="icon" /> */}

        </div>

        {/* <div className=" flex none">
          <li className="flex">
            <BsPhoneVibrate className="icon" />
            Support
          </li>
          <li className="flex">
            <AiOutlineGlobal className="icon" />
            Language
          </li>
        </div> */}

        <div className="atb flex">
          {/* <Link to="/login">
            <span>Sign In</span>
          </Link>

          <span onClick={handleSignOut}>Sign Out</span> */}
          {username ? (
            <>
              <span>Welcome, {username}</span>
              <span onClick={handleSignOut} className="signOut">Sign Out</span>
            </>
          ) : (
            <Link to="/login">
              <span>Sign In</span>
            </Link>
          )}

        </div>
      </div>

      <div className={noBg}>
        <div className="logoDiv">
          <img src="https://truestore.vn/wp-content/themes/twentysixteen/assets/images/brand-logos/desktop-white.svg" alt="" className="logo" />
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
            <Link to="/historysharepxtotal">
              <li onClick={removeNavBar} className="listItem">
                History - Share Pixel admin
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
