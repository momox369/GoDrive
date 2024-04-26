import {
  DotsThreeVertical,
  DownloadSimple,
  FolderSimple,
  LinkSimpleHorizontal,
  Trash,
  UserPlus,
  X,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import "./filemenu.scss";
import { Button, Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import { useFiles } from "../FileController";
import ShareModal from "../ShareModal";
import Directory from "../Directory";

const FileMenu = ({ selectedFileIds, selectedFolderIds }) => {
  const [showModal, setShowModal] = useState(false);
  const [showNested, setShowNested] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleToggleNested = () => setShowNested(!showNested);
  const handleCloseModal = () => setShowModal(false);

  const [key, setKey] = useState("starred");
  const [showShareModal, setShareShowModal] = useState(false);
  const {
    fileType,
    selectedFiles,
    fileCounter,
    folderCounter,
    resetCounter,
    selectedFolders,
    trashedItems,
    toggleTrash,
    shareItemWithUser,
  } = useFiles();

  const handleOpenShareModal = () => {
    setShareShowModal(true);
  };
  const handleCloseShareModal = () => setShareShowModal(false);
  const handleDelete = async () => {
    if (fileType === "files") {
      await toggleTrash(selectedFileIds);
      console.log(selectedFileIds);
    } else {
      await toggleTrash(selectedFolderIds);
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
        window.URL.revokeObjectURL(downloadUrl);
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
        <Button
          className="menu-icons"
          disabled={selectedFiles.length > 1 ? true : false}
        >
          <UserPlus
            className="file-menu-icon"
            weight="bold"
            size={18}
            onClick={() => handleOpenShareModal()}
            style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
          />
          <ShareModal
            show={showShareModal}
            onHide={handleCloseShareModal}
            onShare={shareItemWithUser}
            fileId={selectedFiles}
            name={selectedFiles.map((file) => file.name)}
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
            onClick={handleOpenModal}
            weight="bold"
            size={18}
            style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
          />
          <Modal size="lg" show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Move Item</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: "50vh" }}>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="starred" title="Starred">
                  <Directory filter="starred" />
                </Tab>
                <Tab eventKey="allLocations" title="All Locations">
                  <Directory filter="all" />
                </Tab>
              </Tabs>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCloseModal}>
                Move
              </Button>
            </Modal.Footer>
          </Modal>
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
              <Dropdown.Item
                href="#/action-1"
                className="kebab-items"
                disabled
                style={{ color: "black" }}
              >
                Name:
              </Dropdown.Item>{" "}
              <Dropdown.Item
                href="#/action-1"
                className="kebab-items"
                disabled
                style={{ color: "black" }}
              >
                Owner:
              </Dropdown.Item>{" "}
              <Dropdown.Item
                href="#/action-1"
                className="kebab-items"
                disabled
                style={{ color: "black" }}
              >
                Uploaded Date:
              </Dropdown.Item>{" "}
              <Dropdown.Item
                href="#/action-1"
                className="kebab-items"
                disabled
                style={{ color: "black" }}
              >
                Location:
              </Dropdown.Item>
              <Dropdown
                as="span"
                className="nested-dropdown"
                onMouseOver={(e) => e.currentTarget.classList.add("show")}
                onMouseOut={(e) => e.currentTarget.classList.remove("show")}
              >
                <Dropdown.Toggle as="span" className="nested-dropdown-toggle">
                  View Details
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="nested-dropdown-menu">
                  <Dropdown.Item className="kebab-items" href="#/action-2">
                    Type
                  </Dropdown.Item>
                  <Dropdown.Item className="kebab-items" href="#/action-3">
                    Size
                  </Dropdown.Item>
                  <Dropdown.Item className="kebab-items" href="#/action-3">
                    Owner
                  </Dropdown.Item>
                  <Dropdown.Item className="kebab-items" href="#/action-3">
                    Location
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown.Item href="#/action-1" className="kebab-items">
                <Trash
                  className="file-menu-icon"
                  weight="bold"
                  size={18}
                  style={{
                    margin: "0 5px",
                    color: "#444746",
                    cursor: "pointer",
                  }}
                />
                Move to Trash
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Button>
      </div>
    </div>
  );
};

export default FileMenu;
