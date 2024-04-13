import React, { useState } from "react";
import profileIcon from "../../assets/default-profile-picture.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./profileicon.css";
function ProfileIcon() {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <p id="username">Hi, username!</p>
      Ramzi Zeineddine
      <br />
      rzeineddine200382@gmail.com
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
      style={{ backgroundColor: "lightgray" }}
    >
      <img
        src={profileIcon} // Replace with path to your avatar image
        alt="Profile"
        style={{ width: 30, height: 30, borderRadius: "50%" }} // Styles the image as a circular avatar
      />
    </OverlayTrigger>
  );
}

export default ProfileIcon;
