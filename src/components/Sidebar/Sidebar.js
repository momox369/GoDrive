import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";
import { navItems } from "../../config/lists";
import logo from "../../assets/logo.png";
const Sidebar = () => (
  <div
    className="d-flex flex-column flex-shrink-0 container"
    style={{ width: "280px", height: "100vh" }}
  >
    <a
      href="/"
      className="d-flex align-items-center mb-4 me-md-auto link-dark text-decoration-none"
    >
      <img src={logo}></img>
      <h3>GoDrive</h3>
    </a>
    <ul className="nav nav-pills flex-column mb-auto custom-nav-pills">
      {navItems.map((navItem, index) => (
        <li className="nav-item" key={index}>
          {navItem.item}
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
