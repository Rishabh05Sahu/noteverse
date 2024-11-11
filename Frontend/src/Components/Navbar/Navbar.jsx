import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png"

const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="nav-menu-container">
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("home");
          }}
        >
          {" "}
          <Link style={{ textDecoration: "none" }} to="/">
            {" "}
            Home{" "}
          </Link>
          {menu === "home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("note");
          }}
        >
          {" "}
          <Link style={{ textDecoration: "none" }} to="/note">
            {" "}
            Note{" "}
          </Link>
          {menu === "note" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("pyq");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="pyq">
            Pyq
          </Link>
          {menu === "pyq" ? <hr /> : <></>}
        </li>
       
      </ul>
      </div>
      
    </div>
  );
};

export default Navbar;
