import { useState } from "react";
import settingsIcon from "../../assets/settings.png";
import { Gear } from "@phosphor-icons/react";

export default function Settings() {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const settingsOptions = ["Edit Profile", "Contact Us"];

  const togglePopup = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div>
      <button className="btn" type="button" onClick={togglePopup}>
        <Gear size={25} />
      </button>
      {showSettings && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            right: "100px",
            padding: "10px",
            width: "20%",
            backgroundColor: "white", // Ensure it's visible against any background
            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)", // Optional: adds a shadow for better visibility
            zIndex: 1000, // High enough to be above most elements
          }}
        >
          <ul className="list-group">
            {settingsOptions.map((option, index) => (
              <li
                key={option}
                className={
                  selectedIdx === index
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => setSelectedIdx(index)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
