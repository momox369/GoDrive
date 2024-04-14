import React, { useState } from "react";
import { Button, ButtonGroup, Dropdown, ToggleButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "./filterbar.scss";
import { File, Check } from "@phosphor-icons/react/dist/ssr";
import { CirclesThree, Folder, HardDrives } from "@phosphor-icons/react";
import { FileText } from "react-bootstrap-icons";

const FilterBar = () => {
  // State for toggle buttons (Files/Folders)
  const [activeFilter, setActiveFilter] = useState("Files");

  // Function to handle the toggle button click
  const handleToggle = (value) => {
    setActiveFilter(value);
  };
  const handleDropdownToggle = (isOpen) => {
    if (!isOpen) {
      // Apply the styles directly after the dropdown is closed
      document.querySelector(
        ".dropdown.dropdown-toggle"
      ).style.backgroundColor = "white";
    }
  };
  const activeClass = "active-toggle";
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
      Suggested
      <ButtonGroup style={{ width: "20%", marginLeft: "1rem" }}>
        {/* Toggle buttons for Files and Folders */}
        <ToggleButton
          type="checkbox"
          variant={activeFilter === "Files" ? "primary" : "outline-primary"}
          checked={activeFilter === "Files"}
          value="Files"
          className={`custom-pill ${
            activeFilter === "Files" ? activeClass : ""
          }`}
          onClick={() => handleToggle("Files")}
        >
          {activeFilter === "Files" ? (
            <span>&#10003; </span>
          ) : (
            <FileText size={18} />
          )}{" "}
          Files
        </ToggleButton>

        <ToggleButton
          type="checkbox"
          variant={activeFilter === "Folders" ? "primary" : "outline-primary"}
          checked={activeFilter === "Folders"}
          value="Folders"
          className={`custom-pill ${
            activeFilter === "Folders" ? activeClass : ""
          }`}
          onClick={() => handleToggle("Folders")}
        >
          {activeFilter === "Folders" ? (
            <span>&#10003; </span>
          ) : (
            <Folder size={18} />
          )}{" "}
          Folders
        </ToggleButton>
      </ButtonGroup>
      <div
        className="vr"
        style={{ height: "auto", marginLeft: "1rem", marginRight: "1rem" }}
      ></div>
      <Dropdown className="d-inline mx-2" onToggle={handleDropdownToggle}>
        <Dropdown.Toggle
          variant="outline-primary"
          id="dropdown-type"
          className="dropdown"
        >
          Type
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">Type 1</Dropdown.Item>
          <Dropdown.Item eventKey="2">Type 2</Dropdown.Item>
          <Dropdown.Item eventKey="3">Type 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className="d-inline mx-2" onToggle={handleDropdownToggle}>
        <Dropdown.Toggle
          variant="outline-primary"
          id="dropdown-people"
          className="dropdown"
        >
          People
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">Person 1</Dropdown.Item>
          <Dropdown.Item eventKey="2">Person 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className="d-inline mx-2" onToggle={handleDropdownToggle}>
        <Dropdown.Toggle
          variant="outline-primary"
          id="dropdown-modified"
          className="dropdown"
        >
          Modified
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">Date 1</Dropdown.Item>
          <Dropdown.Item eventKey="2">Date 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className="d-inline mx-2" onToggle={handleDropdownToggle}>
        <Dropdown.Toggle
          variant="outline-primary"
          id="dropdown-location"
          className="dropdown"
        >
          Location
        </Dropdown.Toggle>
        <Dropdown.Menu className="drop-location">
          <Dropdown.Item eventKey="1" className="drop-item">
            <Check size={22} weight="bold" className="drop-icon" />
            Anywhere in Drive
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" className="drop-item">
            <HardDrives size={22} weight="bold" className="drop-icon" />
            My Drive
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" className="drop-item">
            <CirclesThree size={22} weight="bold" className="drop-icon" />
            Shared With Me
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default FilterBar;
