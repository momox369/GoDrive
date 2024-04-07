import React, { useState } from "react";
import "./SearchBar.scss"; // Make sure this CSS file contains the necessary styles
import { Faders, MagnifyingGlass } from "@phosphor-icons/react";
import { Dropdown, Form, InputGroup, Button } from "react-bootstrap";
import AdvancedSearch from "./AdvancedFilter"; // This is your advanced filter form

function SearchBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <>
      {showDropdown && (
        <div className="backdrop" onClick={() => setShowDropdown(false)}></div>
      )}
      <div className="search-bar-container">
        <InputGroup className="search-input-group">
          <Button variant="outline-secondary" id="inputGroup-sizing-default">
            <MagnifyingGlass size={20} />
          </Button>

          <Form.Control
            className="search-input"
            aria-label="Default"
            placeholder="Search in Drive"
            aria-describedby="inputGroup-sizing-default"
          />

          <Dropdown show={showDropdown} onToggle={toggleDropdown}>
            <Dropdown.Toggle
              variant="outline-secondary"
              id="inputGroup-sizing-default"
            >
              <Faders size={20} />
            </Dropdown.Toggle>

            <Dropdown.Menu
              align="end"
              className="advanced-search-dropdown"
              style={{
                position: "absolute",
                left: 0,
                width: "100%", // Dropdown takes the full width
                transform: "translateX(0%)",
              }}
            >
              <AdvancedSearch />
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup>
      </div>
    </>
  );
}

export default SearchBar;
