import React, { useState } from "react";
import { Table } from "react-bootstrap";
import {
  Folder,
  Trash,
  Star,
  UserPlus,
  DownloadSimple,
  PencilSimpleLine,
} from "@phosphor-icons/react"; // Assuming these icons are correctly imported
import "./filetable.scss";
import { useFiles } from "../FileController";

const ListView = ({ items, isSelected, handleItemClick }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [toggleStar] = useFiles();

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
                <DownloadSimple className="action-icon" />
                <UserPlus className="action-icon" />
                <Star
                  className="action-icon"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the row onClick event
                    toggleStar(item.id);
                  }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListView;
