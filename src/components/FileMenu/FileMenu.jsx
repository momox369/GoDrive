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
import { Button, Dropdown } from "react-bootstrap";
import { useFiles } from "../FileController";

const FileMenu = ({
  selectedFileIds,
  counter,
  resetCounter,
  selectedFiles,
}) => {
  const { deleteFiles } = useFiles();

  const handleDelete = async () => {
    try {
      await deleteFiles(selectedFileIds);
      resetCounter();
    } catch (error) {
      console.error("Error deleting files:", error);
    }
  };
  const handleDownload = () => {
    selectedFiles.forEach((file) => {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  const copyToClipboard = async () => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available");
      return;
    }
    try {
      await selectedFiles.forEach((file) => {
        navigator.clipboard.writeText(file.url);
        console.log("URL copied to clipboard:", file.url);
      });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <div className="file-menu-row">
      <Button className="menu-icons">
        {" "}
        <X
          onClick={resetCounter}
          className="file-menu-icon"
          weight="bold"
          size={18}
          style={{ margin: "0 5px", color: "#444746" }}
        />
      </Button>
      <div className="part">
        <span style={{ marginRight: "10px", color: "#444746" }}>
          {counter} selected
        </span>
        <Button className="menu-icons">
          <UserPlus
            className="file-menu-icon"
            weight="bold"
            size={18}
            style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
          />
        </Button>
        <Button className="menu-icons" onClick={handleDownload}>
          <DownloadSimple
            className="file-menu-icon"
            weight="bold"
            size={18}
            style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
          />
        </Button>
        <Button className="menu-icons">
          {" "}
          <FolderSimple
            className="file-menu-icon"
            weight="bold"
            size={18}
            style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
          />
        </Button>
        <Button className="menu-icons">
          <Trash
            className="file-menu-icon"
            weight="bold"
            size={18}
            onClick={handleDelete}
            style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
          />
        </Button>
        <Button className="menu-icons" onClick={copyToClipboard}>
          <LinkSimpleHorizontal
            className="file-menu-icon"
            weight="bold"
            size={20}
            style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
          />
        </Button>
        <Button className="menu-icons">
          <Dropdown className="d-inline file-menu-icon">
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
        </Button>
      </div>
    </div>
  );
};

export default FileMenu;
