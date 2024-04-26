import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  ToggleButton
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./filterbar.scss";
import { File, Check, X, User, CalendarBlank, Folder, FileDoc, FilePdf, FileTxt, FileXls, FileZip, HardDrives, CirclesThree } from "@phosphor-icons/react";
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
      options: [
        { icon: <FileDoc size={25} color="#2a5599" />, title: "Word Document" },
        { icon: <FileXls size={25} color="#28754c" />, title: "Excel Sheets" },
        { icon: <FileTxt size={25} color="#828282" />, title: "Text Files" },
        { icon: <FileZip size={25} color="#050505" />, title: "Zip and Rar Files" },
        { icon: <FilePdf size={25} color="#ea4335" />, title: "PDF" }
      ]
    },
    people: {
      isSelected: false,
      icon: <User size={15} />,
      selectedTitle: "People",
      options: [
        { title: "Person 1" },
        { title: "Person 2" }
      ]
    },
    modified: {
      isSelected: false,
      icon: <CalendarBlank size={15} />,
      selectedTitle: "Modified",
      options: [
        { title: "Date 1" },
        { title: "Date 2" }
      ]
    },
    location: {
      isSelected: false,
      icon: <Folder size={15} />,
      selectedTitle: "Location",
      options: [
        { icon: <HardDrives size={22} />, title: "My Drive" },
        { icon: <CirclesThree size={22} />, title: "Shared With Me" }
      ]
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
              {dropdown.options.map((option, index) => (
                <Dropdown.Item eventKey={index} key={index}>
                  {option.icon}{option.title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
