import React, { useState } from "react";
import "./SearchBar.scss"; // Make sure this CSS file contains the necessary styles
import { Faders, MagnifyingGlass } from "@phosphor-icons/react";
import {
  Dropdown,
  Form,
  InputGroup,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
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
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Search</Tooltip>}
          >
            <Button
              variant="outline-secondary"
              id="inputGroup-sizing-default"
              style={{
                borderTopLeftRadius: "30px",
                borderBottomLeftRadius: "30px",
              }}
            >
              <MagnifyingGlass size={20} weight="bold" />
            </Button>
          </OverlayTrigger>
          <Form.Control
            className="search-input"
            aria-label="Default"
            placeholder="Search in Drive"
            aria-describedby="inputGroup-sizing-default"
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
