import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown, ToggleButton, OverlayTrigger, Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./filterbar.scss";
import { File, Check, X } from "@phosphor-icons/react/dist/ssr";
import { CalendarBlank, CirclesThree, FileDoc, FilePdf, FileTxt, FileXls, FileZip, Folder, HardDrives, User } from "@phosphor-icons/react";
import { FileText } from "react-bootstrap-icons";
import { useFiles } from "../FileController";
import { useLocation } from "react-router-dom";

const FilterBar = ({ activeFilters }) => {
  const { filter, fileType } = useFiles();
  const [dropdownState, setDropdownState] = useState({
    type: {
      isSelected: false,
      icon: <File size={15} />,
      selectedTitle: "Type",
    },
    people: {
      isSelected: false,
      icon: <User size={15} />,
      selectedTitle: "People",
    },
    modified: {
      isSelected: false,
      icon: <CalendarBlank size={15} />,
      selectedTitle: "Modified",
    },
    location: {
      isSelected: false,
      icon: <Folder size={15} />,
      selectedTitle: "Location",
    },
  });

  const handleSelect = (key) => (eventKey, event) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        isSelected: true,
        selectedTitle: event.currentTarget.textContent.trim(),
      },
    }));
  };

  const handleCancel = (key) => () => {
    setDropdownState((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        isSelected: false,
        selectedTitle: activeFilters[key].lastSelectedTitle || key,
      },
    }));
  };

  const clearFilters = () => {
    const clearedState = {};
    Object.keys(dropdownState).forEach((key) => {
      clearedState[key] = {
        isSelected: false,
        selectedTitle: activeFilters[key].lastSelectedTitle || key,
      };
    });
    setDropdownState(clearedState);
  };

  const handleToggle = (value) => {
    filter(value.toLowerCase());
  };

  const activeClass = "active-toggle";
  const location = useLocation();

  return (
    <div className="filter-bar">
      <div className="d-flex align-items-center">
        <div className="flex-grow-1">
          {location.pathname === "/home" && (
            <ButtonGroup>
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Files</Tooltip>}>
                <ToggleButton
                  type="checkbox"
                  variant={fileType === "files" ? "primary" : "outline-primary"}
                  checked={fileType === "files"}
                  value="files"
                  className={`custom-pill ${fileType === "files" ? activeClass : ""}`}
                  onClick={() => handleToggle("files")}
                >
                  {fileType === "files" ? <Check size={20} /> : <FileText size={18} />} Files
                </ToggleButton>
              </OverlayTrigger>
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Folders</Tooltip>}>
                <ToggleButton
                  type="checkbox"
                  variant={fileType === "folders" ? "primary" : "outline-primary"}
                  checked={fileType === "folders"}
                  value="folders"
                  className={`custom-pill ${fileType === "folders" ? activeClass : ""}`}
                  onClick={() => handleToggle("folders")}
                >
                  {fileType === "folders" ? <Check size={20} /> : <Folder size={18} />} Folders
                </ToggleButton>
              </OverlayTrigger>
            </ButtonGroup>
          )}
        </div>
        <div className="flex-shrink-0">
          <Button
            variant="secondary"
            onClick={clearFilters}
            className={`clear-filter ${Object.values(dropdownState).some(item => item.isSelected) ? 'visible' : 'invisible'}`}
          >
            Clear Filters
          </Button>
        </div>
      </div>
      <div className="dropdown-container">
        {Object.entries(dropdownState).map(([key, dropdown]) => (
          <Dropdown key={key} as={ButtonGroup} onSelect={handleSelect(key)}>
            {dropdown.isSelected ? (
              <>
                <Dropdown.Toggle
                  split
                  variant="outline-primary"
                  id={`dropdown-${key}`}
                  className="dropdown-btn active"
                >
                  <Check size={15} className="selected-check" />{" "}
                  {dropdown.selectedTitle}
                </Dropdown.Toggle>
                <Button className="cancel" onClick={handleCancel(key)}>
                  <X size={15} />
                </Button>
              </>
            ) : (
              <Dropdown.Toggle
                variant="outline-primary"
                id={`dropdown-${key}`}
                className="dropdown d-inline mx-2"
              >
                {dropdown.icon}
                {dropdown.selectedTitle}
              </Dropdown.Toggle>
            )}
            <Dropdown.Menu>
              {/* Dropdown items */}
            </Dropdown.Menu>
          </Dropdown>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
