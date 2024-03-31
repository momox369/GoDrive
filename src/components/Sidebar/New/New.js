import React, { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import "./new.scss";

const New = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      <button onClick={toggleDropdown} className="dropdown-button">
        <Plus size={20} style={{ marginRight: ".9rem" }} weight="bold" />
        New
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            <button>New folder</button>
          </li>
          <li>
            <button>File upload</button>
          </li>
          <li>
            <button>Folder upload</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default New;
