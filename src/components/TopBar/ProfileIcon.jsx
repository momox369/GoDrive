import React, { useState } from "react";
import profileIcon from "../../assets/default-profile-picture.png";
function ProfileIcon() {
  const [isHovering, setIsHovering] = useState(false);
  const userName = "Go Drive";
  const userEmail = "godrive@example.com";

  return (
    <div
      className="profile-icon"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={profileIcon} alt="avatar" width="40" height="50" />
      {isHovering && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            padding: "1px",
            border: "1px solid #ddd",
            marginTop: "5px",
            right: "30px",
          }}
        >
          <div>{userName}</div>
          <div>{userEmail}</div>
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;
