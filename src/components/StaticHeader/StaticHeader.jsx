import React, { useState } from "react";
import { ButtonGroup, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { List, Grid, InfoCircle } from "react-bootstrap-icons";
import "./staticheader.scss";

export default function StaticHeader({ title }) {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div id="container">
      <h4 style={{ fontWeight: "300" }}>{title}</h4>
      <div className="buttons">
        {" "}
        <ButtonGroup className="custom-toggle-btn">
          <Button
            variant={activeButton === "list" ? "primary" : "secondary"}
            onClick={() => handleButtonClick("list")}
            className={activeButton === "list" ? "active" : ""}
          >
            <List />
          </Button>

          <Button
            variant={activeButton === "grid" ? "primary" : "secondary"}
            onClick={() => handleButtonClick("grid")}
            className={activeButton === "grid" ? "active" : ""}
          >
            <Grid />
          </Button>
        </ButtonGroup>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>More information</Tooltip>}
        >
          <Button
            variant={activeButton === "info" ? "primary" : "light"}
            onClick={() => handleButtonClick("info")}
            className={activeButton === "info" ? "active" : ""}
          >
            <InfoCircle />
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  );
}
