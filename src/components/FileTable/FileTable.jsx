import React from "react";
import { Table } from "react-bootstrap";
import "./filetable.scss"; // Ensure your CSS is correctly linked
import { useViewMode } from "../ViewModeController";

const FileTable = ({ onFileSelect, selectedFiles }) => {
  const { viewMode } = useViewMode();
  const files = [
    {
      id: 1,
      name: "Document.pdf",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      id: 2,
      name: "Presentation.pptx",
      reason: "You edited • Mar 3, 2024",
      owner: "user2@gmail.com",
      location: "My Drive",
    },
    {
      id: 3,
      name: "Spreadsheet.xlsx",
      reason: "You edited • Feb 1, 2024",
      owner: "user3@gmail.com",
      location: "My Drive",
    },
    {
      id: 4,
      name: "Image.png",
      reason: "You edited • Jan 12, 2024",
      owner: "user4@gmail.com",
      location: "My Drive",
    },
    {
      id: 5,
      name: "Document.pdf",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      id: 6,
      name: "Presentation.pptx",
      reason: "You edited • Mar 3, 2024",
      owner: "user2@gmail.com",
      location: "My Drive",
    },
    {
      id: 7,
      name: "Spreadsheet.xlsx",
      reason: "You edited • Feb 1, 2024",
      owner: "user3@gmail.com",
      location: "My Drive",
    },
    {
      id: 8,
      name: "Image.png",
      reason: "You edited • Jan 12, 2024",
      owner: "user4@gmail.com",
      location: "My Drive",
    },
    {
      id: 9,
      name: "Document.pdf",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      id: 10,
      name: "Presentation.pptx",
      reason: "You edited • Mar 3, 2024",
      owner: "user2@gmail.com",
      location: "My Drive",
    },
    {
      id: 11,
      name: "Spreadsheet.xlsx",
      reason: "You edited • Feb 1, 2024",
      owner: "user3@gmail.com",
      location: "My Drive",
    },
    {
      id: 12,
      name: "Image.png",
      reason: "You edited • Jan 12, 2024",
      owner: "user4@gmail.com",
      location: "My Drive",
    },
    {
      id: 13,
      name: "Document.pdf",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      id: 14,
      name: "Presentation.pptx",
      reason: "You edited • Mar 3, 2024",
      owner: "user2@gmail.com",
      location: "My Drive",
    },
    {
      id: 15,
      name: "Spreadsheet.xlsx",
      reason: "You edited • Feb 1, 2024",
      owner: "user3@gmail.com",
      location: "My Drive",
    },
    {
      id: 16,
      name: "Image.png",
      reason: "You edited • Jan 12, 2024",
      owner: "user4@gmail.com",
      location: "My Drive",
    },
  ];
  const handleFileClick = (file) => {
    const fileSelected = selectedFiles.some((f) => f.id === file.id);
    if (fileSelected) {
      onFileSelect(selectedFiles.filter((f) => f.id != file.id));
    } else {
      onFileSelect([...selectedFiles, file]);
    }
  };
  const renderGridView = (handleFileClick, selectedFiles) => (
    <div className="grid-container">
      {files.map((file, index) => (
        <div
          key={index}
          className={`grid-item ${
            selectedFiles.some((f) => f.id === file.id) ? "selected-file" : ""
          }`}
          onClick={() => handleFileClick(file)}
        >
          <div className="file-name">
            <p>{file.name}</p>
          </div>
          <img
            src={`https://via.placeholder.com/150?text=${file.name}`}
            alt="File preview"
          />
          <div className="file-details">
            <p>{file.reason}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <Table hover className="file-table">
      <thead style={{ position: "sticky", top: "0" }}>
        <tr>
          <th>Name</th>
          <th>Reason</th>
          <th>Owner</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file, index) => (
          <tr key={index} onClick={() => handleFileClick(file)}>
            <td
              id="name"
              className={
                selectedFiles.some((f) => f.id === file.id)
                  ? "selected-file"
                  : ""
              }
            >
              {file.name}
            </td>
            <td
              className={
                selectedFiles.some((f) => f.id === file.id)
                  ? "selected-file"
                  : ""
              }
            >
              {file.reason}
            </td>
            <td
              className={
                selectedFiles.some((f) => f.id === file.id)
                  ? "selected-file"
                  : ""
              }
            >
              {file.owner}
            </td>
            <td
              className={
                selectedFiles.some((f) => f.id === file.id)
                  ? "selected-file"
                  : ""
              }
            >
              {file.location}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div style={{ maxHeight: "70vh", overflowY: "auto", marginTop: "1rem" }}>
      {viewMode === "grid"
        ? renderGridView(handleFileClick, selectedFiles)
        : renderListView(handleFileClick, selectedFiles)}
    </div>
  );
};

export default FileTable;
