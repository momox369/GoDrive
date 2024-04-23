import { Cloud } from "@phosphor-icons/react";
import React from "react";
import { NavLink, ProgressBar } from "react-bootstrap";
import "./storage.scss";

export default function Storage() {
  return (
    <>
      <div className="nav-link d-flex align-items-center custom-storage">
        <Cloud size={20} style={{ marginRight: "1em" }} weight="bold" />
        <span>Storage</span>
      </div>{" "}
      <ProgressBar now={60} className="storage-bar" />
      <p id="storage-caption">9.71 GB of 15 GB used</p>
    </>
  );
}
