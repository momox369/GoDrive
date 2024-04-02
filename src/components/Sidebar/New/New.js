import React, { useEffect, useRef, useState } from "react";
import { FolderPlus, Plus } from "@phosphor-icons/react";
import "./new.scss";

const New = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        console.log(setIsOpen);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className="dropdown-container">
      <button onClick={toggleDropdown} className="dropdown-button">
        <Plus size={20} style={{ marginRight: ".9rem" }} weight="bold" />
        New
      </button>

      <ul className={`dropdown-menu ${isOpen ? "show" : ""}`} ref={dropdownRef}>
        <li>
          <button onClick={() => alert("New folder")}>
            <FolderPlus size={20} className="menuIcon" />
            New folder
          </button>
        </li>
        <hr />
        <li>
          <button onClick={() => alert("File upload")}>
            <FolderPlus size={20} className="menuIcon" />
            File upload
          </button>
        </li>
        <li>
          <button onClick={() => alert("Folder upload")}>
            <FolderPlus size={20} className="menuIcon" />
            Folder upload
          </button>
        </li>
      </ul>
    </div>
  );
};

export default New;
