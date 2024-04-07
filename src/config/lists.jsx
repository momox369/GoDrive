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
        end // Use `end` for exact path matching in React Router v6
        className={({ isActive }) =>
          isActive
            ? "nav-link d-flex align-items-center active"
            : "nav-link d-flex align-items-center"
        }
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
  <New />,
  <NavItem to="/" icon={House}>
    Home
  </NavItem>,
  <NavItem icon={HardDrives} to="/drive">
    My Drive
  </NavItem>,
  <NavItem to="/shared" icon={CirclesThree}>
    Shared With Me
  </NavItem>,
  <NavItem to="/starred" icon={Star}>
    Starred
  </NavItem>,
  <NavItem to="/trash" icon={Trash}>
    Trash
  </NavItem>,
];
