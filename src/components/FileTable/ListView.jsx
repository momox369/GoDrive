<<<<<<< HEAD
import React from "react";
import { Table } from "react-bootstrap";
=======
import React, { useCallback, useEffect, useState } from "react";
import { Button, Dropdown, Modal, Table } from "react-bootstrap";
import {
  Folder,
  Star,
  UserPlus,
  DownloadSimple,
  PencilSimpleLine,
  DotsThreeVertical,
  ArrowDown,
  ArrowUp,
} from "@phosphor-icons/react";
>>>>>>> main
import "./filetable.scss";
import { useFiles } from "../FileController";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShareModal from "../ShareModal";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";

<<<<<<< HEAD
const ListView = ({ items, isSelected, handleItemClick }) => (
    <Table hover className="file-table">
        <thead style={{ position: "sticky", top: "0" }}>
        <tr>
            <th>Name</th>
            <th>Reason</th>
            <th>Owner(s)</th>
            <th>Location</th>
        </tr>
        </thead>
        <tbody>
        {items.map((item) => (
            <tr
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={
                    isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
                }
            >
                <td
                    className={
                        isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
                    }
                >
                    {item.name}
                </td>
                <td
                    className={
                        isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
                    }
                >
                    {item.reason}
                </td>
                <td
                    className={
                        isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
                    }
                >
                    {(item.owner.length === 1)? "Owner: " + item.owner : "Owners: " + item.owner.join(", ") }
                </td>
                <td
                    className={
                        isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
                    }
                >
                    {item.location}
                </td>
            </tr>
        ))}
        </tbody>
    </Table>
);
=======
const ListView = ({ items, isSelected, handleItemClick }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const {
    toggleStar,
    starredItems,
    fetchFilesAndFolders,
    shareItemWithUser,
    handleFolderDoubleClick,
    files,
    folders,
    updateFileTypes,
    filterType,
    FileIcon,
  } = useFiles();
  useEffect(() => {
    updateFileTypes(items);
  }, [items, updateFileTypes]);
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShareShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newName, setNewName] = useState("");
  const [extension, setExtension] = useState("");

  const handleOpenModal = (file) => {
    console.log(file);
    setSelectedFile(file);
    const lastDotIndex = file.name.lastIndexOf(".");
    if (lastDotIndex > 0 && lastDotIndex < file.name.length - 1) {
      setNewName(file.name.substring(0, lastDotIndex));
      setExtension("." + file.name.substring(lastDotIndex + 1));
    } else {
      // Handle filenames without an extension
      setNewName(file.name); // Use the full name if no valid extension exists
      setExtension(""); // No extension found
    }
    setShowModal(true);
  };
  const handleOpenShareModal = (file) => {
    setSelectedFile(file);
    setShareShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseShareModal = () => setShareShowModal(false);
  const directoryLocation = useLocation();
  const handleSaveNameChange = useCallback(async () => {
    if (selectedFile) {
      try {
        const response = await axios.post(
          "http://localhost:3001/update-filename",
          {
            id: selectedFile._id,
            newName: newName + extension,
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
  }, [selectedFile, newName, fetchFilesAndFolders, files, folders]);
>>>>>>> main

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
  const sortedItems = useCallback(() => {
    let sortableItems = [...items]; // Create a copy of items to sort
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [items, sortConfig]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const sortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ArrowUp size={20} />
    ) : (
      <ArrowDown size={20} />
    );
  };
  return (
    <Table hover className="file-table">
      <thead style={{ position: "sticky", top: "0" }}>
        <tr>
          <th onClick={() => handleSort("name")}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                justifyContent: "space-between",
              }}
            >
              Name {sortArrow("name")}
            </div>
          </th>
          <th onClick={() => handleSort("reason")}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                justifyContent: "space-between",
              }}
            >
              Reason {sortArrow("reason")}
            </div>
          </th>
          <th>Owner</th>
          <th>Location</th>
          {directoryLocation.pathname === "/drive" && (
            <th onClick={() => handleSort("size")}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                  justifyContent: "space-between",
                }}
              >
                File Size {sortArrow("size")}
              </div>
            </th>
          )}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedItems().map((item) => (
          <tr
            key={item._id}
            onMouseEnter={() => setHoveredId(item._id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleItemClick(item)}
            onDoubleClick={() => {
              if (item.type === "folders") {
                handleFolderDoubleClick(item);
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
              <span>
                {" "}
                {filterType === "folders" ? (
                  <Folder size={20} weight="fill" />
                ) : (
                  <FileIcon mimeType={item.mimeType} />
                )}{" "}
              </span>
              {item.name.length > 50
                ? item.name.substring(0, 49) + "..."
                : item.name}
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
              {item.location.length > 20
                ? item.location.substring(0, 19) + "..."
                : item.location}
            </td>
            {directoryLocation.pathname === "/drive" && (
              <td
                className={
                  isSelected.some((f) => f._id === item._id)
                    ? "selected-file"
                    : ""
                }
                id="location"
              >
                {item.size} Bytes
              </td>
            )}
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