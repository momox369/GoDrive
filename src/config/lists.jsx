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
        end
        className={({ isActive }) =>
          isActive
            ? "nav-link d-flex align-items-center active"
            : "nav-link d-flex align-items-center"
        }
        onClick={handleToggle}
      >
        {({ isActive }) => (
          <>
            <Icon
              size={20}
              weight={isActive ? "fill" : "bold"}
              style={{ marginRight: "1em" }}
            />
            <span>{children}</span>
          </>
        )}
      </NavLink>
      {isExpanded && to === "/drive"}
    </>
  );
};

export const navItems = [
  <New />,
  <NavItem to="/home" icon={House}>
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
