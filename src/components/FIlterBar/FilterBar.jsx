import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  Form,
  OverlayTrigger,
  ToggleButton,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./filterbar.scss";
import { File, Check } from "@phosphor-icons/react/dist/ssr";
import {
  CalendarBlank,
  CirclesThree,
  FileDoc,
  FilePdf,
  FileTxt,
  FileXls,
  FileZip,
  Folder,
  HardDrives,
  MicrosoftWordLogo,
  User,
  X,
} from "@phosphor-icons/react";
import { FileText } from "react-bootstrap-icons";
import { useFiles } from "../FileController";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import axios from "axios";

const FilterBar = ({ activeFilters }) => {
  const {
    fetchFiles,
    fileTypes,
    setSearchResults,
    filter,
    fileType,
    searchResults,
    files,
    folders,
    starredItems,
    sharedItems,
    trashedItems,
  } = useFiles();
  const { users } = useAuth();
  const AllItems = files.concat(folders);
  const [selectedDate, setSelectedDate] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    owner: "",
    date: "",
    location: "",
  });
  const navigate = useNavigate();
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

  const fetchFilteredFiles = async (currentFilters) => {
    const queryParams = {
      mimeType: currentFilters.type,
      owner: currentFilters.owner,
      date: currentFilters.date,
      location: currentFilters.location,
    };

    try {
      const response = await axios.get("http://localhost:3001/files/search", {
        params: queryParams,
      });
      console.log("Files fetched:", response.data);
      setSearchResults(response.data);
      navigate("/searchResults");
    } catch (error) {
      console.error("Error fetching filtered files:", error);
      setSearchResults([]);
    }
  };

  const handleFileTypeChange = (fileType) => {
    fetchFiles(fileType.mimeType);
    fetchFilteredFiles(fileType.mimeType);
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: fileType.mimeType,
    }));

    setSearchResults([]);
    fetchFilteredFiles({ ...filters, type: fileType.mimeType });
  };

  const personChange = (owner) => {
    fetchFilteredFiles(owner);
    setFilters((prevFilters) => ({
      ...prevFilters,
      owner: owner,
    }));
    setSearchResults([]);
    fetchFilteredFiles({ ...filters, owner: owner });
  };
  const locationChange = (locationType) => {
    let locationQuery;
    switch (locationType) {
      case "regular":
        locationQuery = "regular"; // No specific owner, possibly all files accessible by the user
        break;
      case "all":
        locationQuery = "owned"; // Files owned by the user
        break;
      case "starred":
        locationQuery = "starred"; // Files marked as starred by the user
        break;
      case "shared":
        locationQuery = "shared"; // Files that are shared with the user but not owned
        break;
      default:
        locationQuery = ""; // Default might include all files or however you wish to define it
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: locationQuery,
    }));
    fetchFilteredFiles({ ...filters, location: locationQuery });
  };

  const handleSelect = (key) => (eventKey, event) => {
    const newValue = event.currentTarget.textContent.trim();

    setDropdownState((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        isSelected: true,
        selectedTitle: newValue || prevState[key].selectedTitle,
      },
    }));
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setFilters((prevFilters) => ({
      ...prevFilters,
      date: newDate,
    }));

    setDropdownState((prevState) => ({
      ...prevState,
      modified: {
        ...prevState.modified,
        isSelected: true,
        selectedTitle: newDate,
      },
    }));
  };

  const handleCancel = (key) => () => {
    setDropdownState((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        isSelected: false,
        selectedTitle: key,
      },
    }));
  };

  const clearFilters = () => {
    const resetState = {
      type: { isSelected: false, selectedTitle: "Type" },
      people: { isSelected: false, selectedTitle: "People" },
      modified: { isSelected: false, selectedTitle: "Modified" },
      location: { isSelected: false, selectedTitle: "Location" },
    };
    setDropdownState(resetState);
    setFilters({ type: "", owner: "", date: "" });
  };

  const handleToggle = (value) => {
    filter(value.toLowerCase());
  };

  const activeClass = "active-toggle";
  const location = useLocation();

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
      {location.pathname == "/home" ? <p>Suggested</p> : ""}
      {location.pathname == "/home" ? (
        <ButtonGroup style={{ width: "20%", marginLeft: "1rem" }}>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Files</Tooltip>}>
            <ToggleButton
              type="checkbox"
              variant={fileType === "files" ? "primary" : "outline-primary"}
              checked={fileType === "files"}
              value="files"
              className={`custom-pill ${
                fileType === "files" ? activeClass : ""
              }`}
              onClick={() => handleToggle("files")}
            >
              {fileType === "files" ? (
                <Check size={20} />
              ) : (
                <FileText size={18} />
              )}{" "}
              Files
            </ToggleButton>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Folders</Tooltip>}
          >
            <ToggleButton
              type="checkbox"
              variant={fileType === "folders" ? "primary" : "outline-primary"}
              checked={fileType === "folders"}
              value="folders"
              className={`custom-pill ${
                fileType === "folders" ? activeClass : ""
              }`}
              onClick={() => handleToggle("folders")}
            >
              {fileType === "folders" ? (
                <Check size={20} />
              ) : (
                <Folder size={18} />
              )}{" "}
              Folders
            </ToggleButton>
          </OverlayTrigger>
        </ButtonGroup>
      ) : (
        ""
      )}
      {location.pathname == "/home" ? (
        <div
          className="vr"
          style={{ height: "auto", marginLeft: "1rem", marginRight: "1rem" }}
        ></div>
      ) : (
        ""
      )}
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
          {fileTypes.map((type, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => handleFileTypeChange(type)}
            >
              {type.label}
            </Dropdown.Item>
          ))}
          {/* <Dropdown.Item
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
              <span>Word Document</span>
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
              <span>Excel Sheet</span>
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
              <span>Text File</span>
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
              <span>Zip and Rar Files</span>
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
              <span>PDF</span>
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
              <span>Video</span>
            </Dropdown.Item> */}
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
            {dropdownState.people.icon}
            {dropdownState.people.selectedTitle}
          </Dropdown.Toggle>
        )}
        <Dropdown.Menu>
          {users.map((user, index) => (
            <Dropdown.Item
              eventKey={index}
              value={user.username}
              onClick={() => personChange(user.username)}
            >
              <span>{user.username}</span>
            </Dropdown.Item>
          ))}
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
            {dropdownState.modified.icon}
            {dropdownState.modified.selectedTitle}
          </Dropdown.Toggle>
        )}
        <Dropdown.Menu>
          <Dropdown.Item className="date-types" eventKey="1">
            Today
          </Dropdown.Item>
          <Dropdown.Item className="date-types" eventKey="2">
            Last 7 Days
          </Dropdown.Item>
          <Dropdown.Item className="date-types" eventKey="3">
            Last 30 Days
          </Dropdown.Item>
          <Dropdown.Item className="date-types" eventKey="4">
            This Year (2024)
          </Dropdown.Item>
          <Dropdown.Item className="date-types" eventKey="5">
            Last Year (2023)
          </Dropdown.Item>
          <Dropdown.Item className="date-types" eventKey="6">
            <Form.Group>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                onClick={(e) => e.stopPropagation()}
                placeholder="Select a date"
              />
            </Form.Group>
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
            {dropdownState.location.icon}
            {dropdownState.location.selectedTitle}
          </Dropdown.Toggle>
        )}
        <Dropdown.Menu className="drop-location">
          <Dropdown.Item
            eventKey="1"
            className="location-item"
            onClick={() => locationChange("regular")}
          >
            <Check size={22} weight="bold" className="drop-icon" />
            <span> Anywhere in Drive</span>
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="2"
            className="location-item"
            onClick={() => locationChange("all")}
          >
            <HardDrives size={22} weight="bold" className="drop-icon" />
            <span>My Drive</span>
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="3"
            className="location-item"
            onClick={() => locationChange("starred")}
          >
            <CirclesThree size={22} weight="bold" className="drop-icon" />
            <span>Shared With Me</span>
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