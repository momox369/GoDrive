import React, { useEffect, useState } from "react";
import "./SearchBar.scss"; // Make sure this CSS file contains the necessary styles
import { Faders, MagnifyingGlass } from "@phosphor-icons/react";
import {
  Dropdown,
  Form,
  InputGroup,
  Button,
  OverlayTrigger,
  Tooltip,
  ListGroup,
} from "react-bootstrap";
import AdvancedSearch from "./AdvancedFilter";
import axios from "axios";
import { useFiles } from "../FileController";
import { useNavigate } from "react-router-dom";
function SearchBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const { setSearchResults } = useFiles();
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    if (selectedFile) {
      navigate("/searchResults");
    }
  }, [selectedFile, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from causing a page refresh
    try {
      const response = await axios.get(
        `http://localhost:3001/files/basic-search`,
        {
          params: { query: searchQuery },
        }
      );
      setFiles(response.data);
    } catch (error) {
      console.error("Failed to fetch files:", error);
      setError("Failed to fetch files");
    }
  };

  const fileSelect = (file) => {
    setSelectedFile(file);
    setSearchResults([file]); // Update search results context/state
  };
  return (
    <>
      {showDropdown && (
        <div className="backdrop" onClick={() => setShowDropdown(false)}></div>
      )}
      <div className="search-bar-container">
        <form onSubmit={handleSubmit}>
          <InputGroup className="search-input-group">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Search</Tooltip>}
            >
              <Button
                variant="outline-secondary"
                type="submit"
                id="inputGroup-sizing-default"
                style={{
                  borderTopLeftRadius: "30px",
                  borderBottomLeftRadius: "30px",
                }}
              >
                <MagnifyingGlass size={20} weight="bold" />
              </Button>
            </OverlayTrigger>
            {error && <div className="text-danger">{error}</div>}
            <Form.Control
              className="search-input"
              placeholder="Search in Drive"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Dropdown show={showDropdown} onToggle={toggleDropdown}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Advanced Search</Tooltip>}
              >
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="inputGroup-sizing-default"
                  style={{
                    borderTopRightRadius: "30px",
                    borderBottomRightRadius: "30px",
                  }}
                >
                  <Faders size={20} weight="bold" />
                </Dropdown.Toggle>
              </OverlayTrigger>
              <Dropdown.Menu
                align="end"
                className="advanced-search-dropdown"
                style={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  transform: "translateX(0%)",
                }}
              >
                <AdvancedSearch />
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
          {files.length > 0 && (
            <ListGroup variant="flush">
              {files.map((file) => (
                <ListGroup.Item
                  key={file._id}
                  action
                  onClick={() => fileSelect(file)}
                  active={selectedFile && selectedFile._id === file._id}
                >
                  {file.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </form>
      </div>
    </>
  );
}

export default SearchBar;
