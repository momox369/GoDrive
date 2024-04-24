import React, { useCallback, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import {
  Folder,
  Star,
  UserPlus,
  DownloadSimple,
  PencilSimpleLine,
} from "@phosphor-icons/react";
import "./filetable.scss";
import { useFiles } from "../FileController";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListView = ({ items, isSelected, handleItemClick }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const { toggleStar, starredItems, filterType } = useFiles();
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();

  const handleDoubleClick = (item) => {
    if (item.type === "folders") {
      navigate(`/folder/${item.id}`);
    }
  };

  const handleOpenModal = (file) => {
    setSelectedFile(file);
    setNewName(file.name);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSaveNameChange = useCallback(async () => {
    if (selectedFile) {
      try {
        const response = await axios.post(
          "http://localhost:3001/update-filename",
          {
            id: selectedFile.id,
            newName: newName,
          }
        );
        if (response.status === 200) {
          console.log("Name updated successfully", response.data);
          handleCloseModal();
        }
      } catch (error) {
        console.error("Error updating file name:", error);
      }
    }
  }, [selectedFile, newName]);

  const isItemStarred = (item) => {
    return starredItems[item.type] && starredItems[item.type].includes(item.id);
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
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleItemClick(item)}
            onDoubleClick={() => handleDoubleClick(item)} // Corrected here
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
              {item.owner}
            </td>
            <td
              className={
                isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
              }
            >
              {item.location}
            </td>
            <td
              id="buttons-list"
              className={
                isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
              }
            >
              <div
                className={
                  isSelected.some((f) => f.id === item.id)
                    ? "selected-file action-icons"
                    : ""
                }
                style={{
                  visibility: hoveredId === item.id ? "visible" : "hidden",
                }}
              >
                <UserPlus size={20} className="action-icon" />
                <DownloadSimple className="action-icon" size={20} />
                <PencilSimpleLine
                  className="action-icon"
                  size={20}
                  onClick={() => handleOpenModal(item)}
                />
                <Star
                  size={20}
                  className="action-icon"
                  weight={isItemStarred(item) ? "fill" : "regular"}
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
    </Table>
  );
};

export default ListView;
