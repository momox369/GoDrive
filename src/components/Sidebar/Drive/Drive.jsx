import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Folder } from "@phosphor-icons/react"; // Assuming you're using this for another purpose within Drive or its children
import "../sidebar.scss";

const DriveMenu = ({ children, to, icon: Icon }) => {
  const location = useLocation();
  const [isDriveExpanded, setDriveExpanded] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/drive") {
      setDriveExpanded(false);
    }
  }, [location]);

  const handleToggle = (e) => {
    if (to === "/drive") {
      setDriveExpanded(!isDriveExpanded);
      e.preventDefault();
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
        {Icon && (
          <Icon size={18} style={{ marginRight: "1em" }} weight="bold" />
        )}
        <span>{children}</span>
      </NavLink>
      {isDriveExpanded && to === "/drive" && (
        <ul
          className="list-unstyled"
          style={{ paddingLeft: "3rem", margin: "0.5rem 0rem" }}
        >
          <li>
            <NavLink to="/drive/folder1">
              <Folder size={14} style={{ marginRight: "1em" }} weight="bold" />
              <span style={{ fontSize: "smaller" }}> Folder 1</span>
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
};

export default DriveMenu;
