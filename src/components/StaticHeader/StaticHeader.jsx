import React from "react";
import { ButtonGroup, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { List, Grid, InfoCircle } from "react-bootstrap-icons";
import "./staticheader.scss";
import { useViewMode } from "../ViewModeController"; // Adjust path as necessary
import { Check } from "@phosphor-icons/react";

export default function StaticHeader({ title }) {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <div id="container">
      <h4 className="static-header-title">{title}</h4>
      <div className="buttons">
        <ButtonGroup className="custom-toggle-btn">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>List Layout</Tooltip>}
          >
            <Button
              variant={viewMode === "list" ? "primary" : "secondary"}
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "active" : ""}
            >
              {viewMode === "list" ? (
                <span>
                  <Check /> <List className="display-icons" />
                </span>
              ) : (
                <List className="display-icons" />
              )}{" "}
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Grid Layout</Tooltip>}
          >
            <Button
              variant={viewMode === "grid" ? "primary" : "secondary"}
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "active" : ""}
            >
              {viewMode === "grid" ? (
                <span>
                  <Check />
                  <Grid className="display-icons" />
                </span>
              ) : (
                <Grid className="display-icons" />
              )}{" "}
            </Button>
          </OverlayTrigger>
        </ButtonGroup>
      </div>
    </div>
  );
}
