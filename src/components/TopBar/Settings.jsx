import { useState } from "react";
import { Gear } from "@phosphor-icons/react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./settings.scss";

export default function Settings() {
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const settingsOptions = ["Edit Profile", "Contact Us"];

  return (
    <div>
      <Dropdown>
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Settings</Tooltip>}>
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-settings"
            className="settings-dropdown"
          >
            <Gear size={25} />
          </Dropdown.Toggle>
        </OverlayTrigger>

        <Dropdown.Menu>
          {settingsOptions.map((option, index) => (
            <Dropdown.Item
              key={option}
              active={selectedIdx === index}
              onClick={() => setSelectedIdx(index)}
            >
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
