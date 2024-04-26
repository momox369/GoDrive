import React, { useRef, useState } from "react";
import { FolderPlus, Plus } from "@phosphor-icons/react";
import "./new.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { BoxArrowUp, FileArrowUp } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useFiles } from "../../FileController";
import axios from "axios";

const New = () => {
  const [showModal, setShowModal] = useState(false);
  const { uploadFile, fetchFilesAndFolders, folderId } = useFiles(); // Assume currentFolderId is managed at a higher level
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const [folderName, setFolderName] = useState("");

  const createFolder = async () => {
    try {
      const response = await axios.post("http://localhost:3001/create-folder", {
        folderName,
        parentId: folderId,
      });
      fetchFilesAndFolders();
      handleCloseModal();
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length) {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      formData.append("parentId", folderId);

      try {
        const response = await axios.post(
          "http://localhost:3001/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.data.files.length > 0) {
          uploadFile(response.data.files);
        } else {
          console.error("No files data returned from server");
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFolderUploadClick = () => {
    folderInputRef.current.setAttribute("webkitdirectory", true);
    folderInputRef.current.setAttribute("directory", true);
    folderInputRef.current.click();
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Dropdown className="d-inline">
      <Dropdown.Toggle
        id="dropdown-autoclose-true"
        className="settings-dropdown"
      >
        <Plus weight="bold" size={20} />
        New
      </Dropdown.Toggle>

      <Dropdown.Menu id="dropdown-menu">
        <Dropdown.Item onClick={handleOpenModal} id="dropdown-item">
          <FolderPlus size={20} className="menuIcon" />
          New folder
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleFileUploadClick} id="dropdown-item">
          <FileArrowUp size={20} className="menuIcon" />
          File upload
        </Dropdown.Item>
        <Dropdown.Item onClick={handleFolderUploadClick} id="dropdown-item">
          <BoxArrowUp size={20} className="menuIcon" />
          Folder upload
        </Dropdown.Item>
      </Dropdown.Menu>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header>
          <Modal.Title>Create New Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="folder-name"
            placeholder="Enter folder name"
            onChange={(e) => setFolderName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="new-folder-buttons"
            variant="secondary"
            onClick={handleCloseModal}
          >
            Close
          </Button>
          <Button
            className="new-folder-buttons"
            variant="primary"
            onClick={handleCloseModal && createFolder}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        multiple
      />
      <input
        type="file"
        ref={folderInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        webkitdirectory="true"
        directory="true"
        multiple
      />
    </Dropdown>
  );
};

export default New;
