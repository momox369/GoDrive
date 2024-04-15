import {
  DotsThreeVertical,
  DownloadSimple,
  FolderSimple,
  LinkSimpleHorizontal,
  Trash,
  UserPlus,
  X,
} from "@phosphor-icons/react";
import React from "react";
import "./filemenu.scss";
import { Dropdown } from "react-bootstrap";

const FileMenu = ({ counter, resetCounter }) => {
  return (
    <div className="file-menu-row">
      <X
        onClick={resetCounter}
        className="file-menu-icon"
        weight="bold"
        size={18}
        style={{ margin: "0 5px", color: "#444746" }}
      />
      <div className="part">
        <span style={{ marginRight: "10px", color: "#444746" }}>
          {counter} selected
        </span>
        <UserPlus
          className="file-menu-icon"
          weight="bold"
          size={18}
          style={{ margin: "0 5px", color: "#444746" }}
        />
        <DownloadSimple
          className="file-menu-icon"
          weight="bold"
          size={18}
          style={{ margin: "0 5px", color: "#444746" }}
        />
        <FolderSimple
          className="file-menu-icon"
          weight="bold"
          size={18}
          style={{ margin: "0 5px", color: "#444746" }}
        />
        <Trash
          className="file-menu-icon"
          weight="bold"
          size={18}
          style={{ margin: "0 5px", color: "#444746" }}
        />
        <LinkSimpleHorizontal
          className="file-menu-icon"
          weight="bold"
          size={20}
          style={{ margin: "0 5px", color: "#444746" }}
        />
        <Dropdown className="d-inline ">
          <Dropdown.Toggle className="dropdown-autoclose-true custom-kebab">
            <DotsThreeVertical
              className="file-menu-icon"
              weight="bold"
              size={20}
              style={{ margin: "0 5px", color: "#444746" }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default FileMenu;
