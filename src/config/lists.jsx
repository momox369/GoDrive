import {
  CirclesThree,
  ClockCounterClockwise,
  HardDrives,
  House,
  Plus,
  Star,
  Trash,
} from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "../components/Sidebar/sidebar.scss";
import Drive from "../components/Sidebar/Drive/Drive";
import New from "../components/Sidebar/New/New";

export const NavItem = ({ children, to, icon: Icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (to === "/drive") {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      <NavLink
        to={to}
        className="nav-link d-flex align-items-center"
        aria-current="page"
        onClick={handleToggle}
      >
        <Icon size={20} style={{ marginRight: "1em" }} weight="bold" />
        <span>{children}</span>
      </NavLink>
      {isExpanded && to === "/drive"}
    </>
  );
};

export const navItems = [
  {
    item: <New />,
  },
  {
    item: (
      <NavLink
        to="/home"
        className="nav-link d-flex align-items-center"
        aria-current="page"
      >
        <House size={18} style={{ marginRight: "1em" }} weight="bold" />
        <span style={{ fontSize: "smaller" }}>Home</span>
      </NavLink>
    ),
  },
  { item: <Drive icon={HardDrives} to="/drive" children="My Drive" /> },
  {
    item: (
      <NavLink
        to="/shared"
        className="nav-link d-flex align-items-center"
        aria-current="page"
      >
        <CirclesThree size={18} style={{ marginRight: "1em" }} weight="bold" />
        <span style={{ fontSize: "smaller" }}>Shared With Me</span>
      </NavLink>
    ),
  },
  {
    item: (
      <NavLink
        to="/recent"
        className="nav-link d-flex align-items-center"
        aria-current="page"
      >
        <ClockCounterClockwise
          size={18}
          style={{ marginRight: "1em" }}
          weight="bold"
        />
        <span style={{ fontSize: "smaller" }}>Recent</span>
      </NavLink>
    ),
  },

  {
    item: (
      <NavLink
        to="/starred"
        className="nav-link d-flex align-items-center"
        aria-current="page"
      >
        <Star size={18} style={{ marginRight: "1em" }} weight="bold" />
        <span style={{ fontSize: "smaller" }}>Recent</span>
      </NavLink>
    ),
  },
  {
    item: (
      <NavLink
        to="/trash"
        className="nav-link d-flex align-items-center"
        aria-current="page"
      >
        <Trash size={18} style={{ marginRight: "1em" }} weight="bold" />
        <span style={{ fontSize: "smaller" }}>Trash</span>
      </NavLink>
    ),
  },
];
