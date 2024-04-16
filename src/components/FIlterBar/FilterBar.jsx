import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  OverlayTrigger,
  ToggleButton,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "./filterbar.scss";
import { File, Check } from "@phosphor-icons/react/dist/ssr";
import {
  CirclesThree,
  FileDoc,
  FilePdf,
  FileTxt,
  FileXls,
  FileZip,
  Folder,
  HardDrives,
  MicrosoftWordLogo,
  X,
} from "@phosphor-icons/react";
import { FileText } from "react-bootstrap-icons";

const FilterBar = ({ activeFilters, setActiveFilters }) => {
  const [activeFilter, setActiveFilter] = useState("Files");
  const [dropdownState, setDropdownState] = useState({
    type: {
      isSelected: false,
      icon: <File size={15} />,
      selectedTitle: "Type",
    },
    people: {
      isSelected: false,
      selectedTitle: "People",
    },
    location: {
      isSelected: false,
      selectedTitle: "Location",
    },
    modified: {
      isSelected: false,
      selectedTitle: "Modified",
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
    Object.keys(dropdownState).forEach((key) => {
      dropdownState[key].isSelected = false;
      dropdownState[key].selectedTitle =
        activeFilters[key].lastSelectedTitle || key;
    });
    setDropdownState({ ...dropdownState });
  };
  const handleToggle = (value) => {
    setActiveFilter(value);
  };

  const activeClass = "active-toggle";
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
      Suggested
      <ButtonGroup style={{ width: "20%", marginLeft: "1rem" }}>
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Files</Tooltip>}>
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
        </OverlayTrigger>

        <OverlayTrigger placement="bottom" overlay={<Tooltip>Folders</Tooltip>}>
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
        </OverlayTrigger>
      </ButtonGroup>
      <div
        className="vr"
        style={{ height: "auto", marginLeft: "1rem", marginRight: "1rem" }}
      ></div>
      <Dropdown as={ButtonGroup} onSelect={handleSelect("type")}>
        {dropdownState.type.isSelected ? (
          <>
            <Dropdown.Toggle
              split
              variant="outline-primary"
              id="dropdown-type"
              className="dropdown-btn active"
            >
              <Check size={15} className="selected-check" />{" "}
              {dropdownState.type.selectedTitle}
            </Dropdown.Toggle>
            <Button className="cancel" onClick={handleCancel("type")}>
              <X size={15} />
            </Button>
          </>
        ) : (
          <Dropdown.Toggle
            variant="outline-primary"
            id="dropdown-type"
            className="dropdown d-inline mx-2"
          >
            {dropdownState.type.icon}
            {dropdownState.type.selectedTitle}
          </Dropdown.Toggle>
        )}

        <Dropdown.Menu>
          <Dropdown.Item
            eventKey="1"
            className="file-types"
            style={{ fontWeight: "300" }}
          >
            <FileDoc
              size={25}
              color="#2a5599"
              weight="fill"
              style={{ marginRight: "1rem" }}
            />
            Word Document
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="2"
            className="file-types"
            style={{ fontWeight: "300" }}
          >
            <FileXls
              size={25}
              color="#28754c"
              weight="fill"
              style={{ marginRight: "1rem" }}
            />
            Excel Sheets
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="3"
            className="file-types"
            style={{ fontWeight: "300" }}
          >
            <FileTxt
              size={25}
              color="#828282"
              weight="fill"
              style={{ marginRight: "1rem" }}
            />
            Text Files
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="4"
            className="file-types"
            style={{ fontWeight: "300" }}
          >
            <FileZip
              size={25}
              color="#050505"
              weight="fill"
              style={{ marginRight: "1rem" }}
            />
            Zip and Rar Files
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="5"
            className="file-types"
            style={{ fontWeight: "300" }}
          >
            <FilePdf
              size={25}
              color="#ea4335"
              weight="fill"
              style={{ marginRight: "1rem" }}
            />
            PDF
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="6"
            className="file-types"
            style={{ fontWeight: "300" }}
          >
            <FilePdf
              size={25}
              color="#ea4335"
              weight="fill"
              style={{ marginRight: "1rem" }}
            />
            Video
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown as={ButtonGroup} onSelect={handleSelect("people")}>
        {dropdownState.people.isSelected ? (
          <>
            <Dropdown.Toggle
              split
              variant="outline-primary"
              id="dropdown-people"
              className="dropdown-btn active"
            >
              <Check size={15} className="selected-check" />{" "}
              {dropdownState.people.selectedTitle}
            </Dropdown.Toggle>
            <Button className="cancel" onClick={handleCancel("people")}>
              <X size={15} />
            </Button>
          </>
        ) : (
          <Dropdown.Toggle
            variant="outline-primary"
            id="dropdown-people"
            className="dropdown d-inline mx-2"
          >
            {dropdownState.people.selectedTitle}
          </Dropdown.Toggle>
        )}
        <Dropdown.Menu>
          <Dropdown.Item className="person-types" eventKey="1">
            Person 1
          </Dropdown.Item>
          <Dropdown.Item className="person-types" eventKey="2">
            Person 2
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown as={ButtonGroup} onSelect={handleSelect("modified")}>
        {dropdownState.modified.isSelected ? (
          <>
            <Dropdown.Toggle
              split
              variant="outline-primary"
              id="dropdown-modified"
              className="dropdown-btn active"
            >
              <Check size={15} className="selected-check" />{" "}
              {dropdownState.modified.selectedTitle}
            </Dropdown.Toggle>
            <Button className="cancel" onClick={handleCancel("modified")}>
              <X size={15} />
            </Button>
          </>
        ) : (
          <Dropdown.Toggle
            variant="outline-primary"
            id="dropdown-modified"
            className="dropdown d-inline mx-2"
          >
            {dropdownState.modified.selectedTitle}
          </Dropdown.Toggle>
        )}
        <Dropdown.Menu>
          <Dropdown.Item className="date-types" eventKey="1">
            Date 1
          </Dropdown.Item>
          <Dropdown.Item className="date-types" eventKey="2">
            Date 2
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown as={ButtonGroup} onSelect={handleSelect("location")}>
        {dropdownState.location.isSelected ? (
          <>
            <Dropdown.Toggle
              split
              variant="outline-primary"
              id="dropdown-location"
              className="dropdown-btn active"
            >
              <Check size={15} className="selected-check" />{" "}
              {dropdownState.location.selectedTitle}
            </Dropdown.Toggle>
            <Button className="cancel" onClick={handleCancel("location")}>
              <X size={15} />
            </Button>
          </>
        ) : (
          <Dropdown.Toggle
            variant="outline-primary"
            id="dropdown-location"
            className="dropdown d-inline mx-2"
          >
            {dropdownState.location.selectedTitle}
          </Dropdown.Toggle>
        )}
        <Dropdown.Menu className="drop-location">
          <Dropdown.Item eventKey="1" className="location-item">
            <Check size={22} weight="bold" className="drop-icon" />
            Anywhere in Drive
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" className="location-item">
            <HardDrives size={22} weight="bold" className="drop-icon" />
            My Drive
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" className="location-item">
            <CirclesThree size={22} weight="bold" className="drop-icon" />
            Shared With Me
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {dropdownState.type.isSelected ||
      dropdownState.people.isSelected ||
      dropdownState.modified.isSelected ||
      dropdownState.location.isSelected ? (
        <button
          onClick={clearFilters}
          className="clear-filter btn btn-secondary"
        >
          Clear Filters
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default FilterBar;
