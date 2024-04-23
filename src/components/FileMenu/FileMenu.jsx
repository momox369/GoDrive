import {
  DotsThreeVertical,
  DownloadSimple,
  FolderSimple,
  LinkSimpleHorizontal,
  Trash,
  UserPlus,
  X,
} from "@phosphor-icons/react";
import React, {useState} from "react";
import "./filemenu.scss";
import {Button, Dropdown, Form} from "react-bootstrap";
import { useFiles } from "../FileController";
import Modal from "react-bootstrap/Modal";

const FileMenu = () => {
  const {
    deleteFiles,
    fileType,
    selectedFiles,
    fileCounter,
    folderCounter,
    resetCounter,
    selectedFolders,
      shareFile
  } = useFiles();

  const selectedFileIds = selectedFiles.map(file => file.id);
  const selectedFolderIds = selectedFolders.map(folder => folder.id);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleShare = () => {
    setShowModal(true);
  };

  const handleShareConfirm = () => {
    // Call the shareFile function with the entered email
    shareFile(selectedFileIds[0], email);
    // Close the modal and reset the email state
    setShowModal(false);
    setEmail("");
  };

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
        <Button className="menu-icons" onClick={handleShare}>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Share File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShareConfirm}>
            Share File
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default FileMenu;
