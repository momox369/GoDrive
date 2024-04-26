import React, { useCallback, useEffect, useState } from "react";
import { Button, Dropdown, Modal, Table } from "react-bootstrap";
import {
  Folder,
  Star,
  UserPlus,
  DownloadSimple,
  PencilSimpleLine,
  DotsThreeVertical,
} from "@phosphor-icons/react";
import "./filetable.scss";
import { useFiles } from "../FileController";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShareModal from "../ShareModal";
import { ThreeDotsVertical } from "react-bootstrap-icons";

const ListView = ({ items, isSelected, handleItemClick }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const {
    toggleStar,
    starredItems,
    fetchFilesAndFolders,
    shareItemWithUser,
    handleFolderDoubleClick,
  } = useFiles();
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShareShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newName, setNewName] = useState("");

  const handleOpenModal = (file) => {
    console.log(file);
    setSelectedFile(file);
    setNewName(file.name);
    setShowModal(true);
  };
  const handleOpenShareModal = (file) => {
    setSelectedFile(file);
    setShareShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseShareModal = () => setShareShowModal(false);

  const handleSaveNameChange = useCallback(async () => {
    if (selectedFile) {
      try {
        console.log(selectedFile._id);
        const response = await axios.post(
          "http://localhost:3001/update-filename",
          {
            id: selectedFile._id,
            newName: newName,
          }
        );
        if (response.status === 200) {
          console.log("Name updated successfully", response.data);
          handleCloseModal();
          fetchFilesAndFolders();
        }
      } catch (error) {
        console.error("Error updating file name:", error);
      }
    }
  }, [selectedFile, newName, fetchFilesAndFolders]);

  const handleStarClick = (event, item) => {
    event.preventDefault(); // Stop the browser from following the href in the anchor.
    event.stopPropagation(); // Prevent the event from bubbling up to parent elements.

    toggleStar(item);
  };
  const handlePenClick = (event, item) => {
    event.preventDefault(); // Stop the browser from following the href in the anchor.
    event.stopPropagation(); // Prevent the event from bubbling up to parent elements.

    handleOpenModal(item);
  };
  const handleDownloadClick = (event, item) => {
    event.preventDefault(); // Stop the browser from following the href in the anchor.
    event.stopPropagation(); // Prevent the event from bubbling up to parent elements.

    handleDownload(item);
  };
  const handleShareClick = (event, item) => {
    event.preventDefault(); // Stop the browser from following the href in the anchor.
    event.stopPropagation(); // Prevent the event from bubbling up to parent elements.

    handleOpenShareModal(item);
  };
  const isItemStarred = useCallback(
    (item) => {
      return starredItems[item.type]?.includes(item._id);
    },
    [starredItems]
  );

  const handleDownload = async (file) => {
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
  };
  return (
    <Table hover className="file-table">
      <thead style={{ position: "sticky", top: "0" }}>
        <tr>
          <th>Name</th>
          <th>Reason</th>
          <th>Owner</th>
          <th>Location</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item._id}
            onMouseEnter={() => setHoveredId(item._id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleItemClick(item)}
            onDoubleClick={() => {
              if (item.type === "folders") {
                handleFolderDoubleClick(item); // Call the function on double-click
              }
            }}
            className={
              isSelected.some((f) => f._id === item._id) ? "selected-file" : ""
            }
          >
            <td
              className={
                isSelected.some((f) => f._id === item._id)
                  ? "selected-file"
                  : ""
              }
              id="name"
            >
              {item.name}
            </td>
            <td
              className={
                isSelected.some((f) => f._id === item._id)
                  ? "selected-file"
                  : ""
              }
              id="reason"
            >
              {item.reason}
            </td>
            <td
              className={
                isSelected.some((f) => f._id === item._id)
                  ? "selected-file"
                  : ""
              }
              id="owner"
            >
              {item.owner}
            </td>
            <td
              className={
                isSelected.some((f) => f._id === item._id)
                  ? "selected-file"
                  : ""
              }
              id="location"
            >
              {item.location}
            </td>
            <td
              id="buttons-list"
              className={
                isSelected.some((f) => f._id === item._id)
                  ? "selected-file"
                  : ""
              }
            >
              <div
                className={
                  isSelected.some((f) => f._id === item._id)
                    ? "selected-file action-icons"
                    : ""
                }
                style={{
                  visibility: hoveredId === item._id ? "visible" : "hidden",
                }}
              >
                <UserPlus
                  size={20}
                  className="action-icon"
                  onClick={(e) => handleShareClick(e, item)}
                />
                <DownloadSimple
                  className="action-icon"
                  size={20}
                  onClick={(e) => handleDownloadClick(e, item)}
                />
                <PencilSimpleLine
                  className="action-icon"
                  size={20}
                  onClick={(e) => handlePenClick(e, item)}
                />
                <Star
                  size={20}
                  className="action-icon"
                  weight={isItemStarred(item) ? "fill" : "regular"}
                  onClick={(event) => handleStarClick(event, item)}
                />
                <ThreeDotsVertical
                  size={20}
                  className="action-icon"
                  weight={isItemStarred(item) ? "fill" : "regular"}
                  onClick={(event) => handleStarClick(event, item)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rename File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveNameChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ShareModal
        show={showShareModal}
        onHide={handleCloseShareModal}
        onShare={shareItemWithUser}
        fileId={selectedFile ? selectedFile._id : null}
      />
    </Table>
  );
};

export default ListView;
