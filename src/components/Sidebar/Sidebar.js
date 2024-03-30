import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";
import {
  CirclesThree,
  ClockCounterClockwise,
  HardDrives,
  House,
  Star,
  Trash,
} from "@phosphor-icons/react";

const Sidebar = () => (
  <div
    className="d-flex flex-column flex-shrink-0 p-3 bg-light"
    style={{ width: "280px", height: "100vh" }}
  >
    <a
      href="/"
      className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
    >
      <span className="fs-4">Logo</span>
    </a>
    <hr />
    <ul className="nav nav-pills flex-column mb-auto custom-nav-pills">
      <li className="nav-item">
        <NavLink
          to="/home"
          className="nav-link d-flex align-items-center"
          aria-current="page"
        >
          <House size={20} style={{ marginRight: "10px" }} />
          <span>Home</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/drive"
          className="nav-link d-flex align-items-center"
          aria-current="page"
        >
          <HardDrives size={20} style={{ marginRight: "10px" }} />
          <span>My Drive</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/shared"
          className="nav-link d-flex align-items-center"
          aria-current="page"
        >
          <CirclesThree size={20} style={{ marginRight: "10px" }} />
          <span>Shared With Me</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/recent"
          className="nav-link d-flex align-items-center"
          aria-current="page"
        >
          <ClockCounterClockwise size={20} style={{ marginRight: "10px" }} />
          <span>Recent</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/starred"
          className="nav-link d-flex align-items-center"
          aria-current="page"
        >
          <Star size={20} style={{ marginRight: "10px" }} />
          <span>Recent</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/trash"
          className="nav-link d-flex align-items-center"
          aria-current="page"
        >
          <Trash size={20} style={{ marginRight: "10px" }} />
          <span>Recent</span>
        </NavLink>
      </li>
      {/* Add more links as needed */}
    </ul>
  </div>
);

export default Sidebar;
