import React, { useEffect, useRef, useState } from "react";
import { FolderPlus, Plus } from "@phosphor-icons/react";
import "./new.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { BoxArrowUp, FileArrowUp } from "react-bootstrap-icons";

const New = () => {
  return (
    <Dropdown className="d-inline">
      <Dropdown.Toggle id="dropdown-autoclose-true">
        <Plus weight="bold" size={20} />
        New
      </Dropdown.Toggle>

      <Dropdown.Menu id="dropdown-menu">
        <Dropdown.Item href="#" id="dropdown-item">
          {" "}
          <FolderPlus size={20} className="menuIcon" />
          New folder
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#" id="dropdown-item">
          <FileArrowUp size={20} className="menuIcon" />
          File upload
        </Dropdown.Item>
        <Dropdown.Item href="#" id="dropdown-item">
          <BoxArrowUp size={20} className="menuIcon" />
          Folder upload
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default New;
// <div className="dropdown-container">
//   <button onClick={toggleDropdown} className="dropdown-button">
//     <Plus size={20} style={{ marginRight: ".9rem" }} weight="bold" />
//     New
//   </button>

//   <ul className={`dropdown-menu ${isOpen ? "show" : ""}`} ref={dropdownRef}>
//     <li>
//       <button onClick={() => alert("New folder")}>
//         <FolderPlus size={20} className="menuIcon" />
//         New folder
//       </button>
//     </li>
//     <hr />
//     <li>
//       <button onClick={() => alert("File upload")}>
//         <FolderPlus size={20} className="menuIcon" />
//         File upload
//       </button>
//     </li>
//     <li>
//       <button onClick={() => alert("Folder upload")}>
//         <FolderPlus size={20} className="menuIcon" />
//         Folder upload
//       </button>
//     </li>
//   </ul>
// </div>
