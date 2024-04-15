import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";
import { navItems } from "../../config/lists";
import logo from "../../assets/logo.png";
import Storage from "./Storage/Storage";
const Sidebar = () => (
  <div
    className="d-flex flex-column flex-shrink-0 container"
    style={{ width: "280px", height: "100vh" }}
  >
    <a href="/" className="brand d-flex link-dark align-items-center mb-4">
      <img src={logo} alt="GoDrive logo" className="logo"></img>
      <h3 className="m-0">GoDrive</h3>
    </a>
    <ul className="nav nav-pills flex-column mb-auto custom-nav-pills">
      {navItems.map((navItem, index) => (
        <li className="nav-item" key={index}>
          {navItem}
        </li>
      ))}
      <Storage />
    </ul>
  </div>
);

export default Sidebar;
