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
import axios from "axios";
import { useFiles } from "../FileController";

const FileMenu = ({ selectedFileIds, counter, resetCounter }) => {
  const { deleteFiles } = useFiles();

  const handleDelete = async () => {
    try {
      await deleteFiles(selectedFileIds);
      resetCounter();
    } catch (error) {
      console.error("Error deleting files:", error);
    }
  };

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
          style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
        />
        <DownloadSimple
          className="file-menu-icon"
          weight="bold"
          size={18}
          style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
        />
        <FolderSimple
          className="file-menu-icon"
          weight="bold"
          size={18}
          style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
        />
        <Trash
          className="file-menu-icon"
          weight="bold"
          size={18}
          onClick={handleDelete}
          style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
        />
        <LinkSimpleHorizontal
          className="file-menu-icon"
          weight="bold"
          size={20}
          style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
        />
        <Dropdown className="d-inline ">
          <Dropdown.Toggle className="dropdown-autoclose-true custom-kebab">
            <DotsThreeVertical
              className="file-menu-icon"
              weight="bold"
              size={20}
              style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
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
