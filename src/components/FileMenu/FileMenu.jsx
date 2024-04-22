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
  selectedFolderIds,
  fileCounter,
  folderCounter,
  resetCounter,
  selectedFiles,
  selectedFolders,
}) => {
  const { deleteFiles, fileType } = useFiles();

  const handleDelete = async () => {
    if (fileType === "files") {
      await deleteFiles(selectedFileIds);
    } else {
      await deleteFiles(selectedFolderIds);
    }
    resetCounter();
  };

  const handleDownload = async () => {
    selectedFiles.forEach(async (file) => {
      try {
        const response = await fetch(file.url);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(downloadUrl); // Clean up the URL object
        document.body.removeChild(link);
      } catch (error) {
        console.error("Failed to download file:", error);
      }
    });
  };
  const copyToClipboard = async () => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available");
      return;
    }
    if (fileType == "files") {
      try {
        await selectedFiles.forEach((file) => {
          navigator.clipboard.writeText(file.url);
          console.log("URL copied to clipboard:", file.url);
        });
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    } else {
      try {
        await selectedFolders.forEach((folder) => {
          navigator.clipboard.writeText(folder.url);
          console.log("URL copied to clipboard:", folder.url);
        });
      } catch (err) {
        console.error("Failed to copy:", err);
      }
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
        {fileType === "files" && (
          <span style={{ marginRight: "10px", color: "#444746" }}>
            {fileCounter} selected
          </span>
        )}
        {fileType === "folders" && (
          <span style={{ marginRight: "10px", color: "#444746" }}>
            {folderCounter} selected
          </span>
        )}
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
