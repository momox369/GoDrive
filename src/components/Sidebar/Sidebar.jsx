import React, { useState, useEffect } from "react";
import "./sidebar.scss";
import { navItems } from "../../config/lists";
import logo from "../../assets/logo.png";
import Storage from "./Storage/Storage";
import { List } from "@phosphor-icons/react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 container ${
        isOpen ? "" : "collapsed"
      }`}
      style={{ width: isOpen ? "280px" : "50px", height: "100vh" }}
    >
      <a
        href="/"
        className="brand d-flex link-dark align-items-center mb-2"
        style={{ minWidth: "50px" }}
      >
        <img src={logo} alt="GoDrive logo" className="logo" />
        <h3 className="m-0" style={{ display: isOpen ? "block" : "none" }}>
          GoDrive
        </h3>
      </a>
      {!isOpen && (
        <button className="btn toggle-btn mb-4" onClick={toggleSidebar}>
          <List size={25} style={{ width: "24px", height: "24px" }} />
        </button>
      )}
      <ul
        className="nav nav-pills flex-column mb-auto custom-nav-pills"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {navItems.map((navItem, index) => (
          <li className="nav-item" key={index}>
            {navItem}
          </li>
        ))}
        <Storage />
      </ul>
    </div>
  );
};

export default Sidebar;
