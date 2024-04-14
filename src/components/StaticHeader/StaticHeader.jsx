import React from "react";
import { ButtonGroup, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { List, Grid, InfoCircle } from "react-bootstrap-icons";
import "./staticheader.scss";
import { useViewMode } from "../ViewModeController"; // Adjust path as necessary

export default function StaticHeader({ title }) {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <div id="container">
      <h4 style={{ fontWeight: "300" }}>{title}</h4>
      <div className="buttons">
        <ButtonGroup className="custom-toggle-btn">
          <Button
            variant={viewMode === "list" ? "primary" : "secondary"}
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "active" : ""}
          >
            <List />
          </Button>
          <Button
            variant={viewMode === "grid" ? "primary" : "secondary"}
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "active" : ""}
          >
            <Grid />
          </Button>
        </ButtonGroup>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>More information</Tooltip>}
        >
          <Button
            variant={viewMode === "info" ? "primary" : "light"}
            onClick={() => setViewMode("info")}
            className={viewMode === "info" ? "active" : ""}
          >
            <InfoCircle />
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  );
}
