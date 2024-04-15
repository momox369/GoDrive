import React from "react";
import { Table } from "react-bootstrap";
import "./filetable.scss"; // Ensure your CSS is correctly linked
import { useViewMode } from "../ViewModeController";
// Update the import path as needed

const FileTable = () => {
  const { viewMode } = useViewMode();
  const files = [
    {
      name: "Document.pdf",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Presentation.pptx",
      reason: "You edited • Mar 3, 2024",
      owner: "user2@gmail.com",
      location: "My Drive",
    },
    {
      name: "Spreadsheet.xlsx",
      reason: "You edited • Feb 1, 2024",
      owner: "user3@gmail.com",
      location: "My Drive",
    },
    {
      name: "Image.png",
      reason: "You edited • Jan 12, 2024",
      owner: "user4@gmail.com",
      location: "My Drive",
    },
    {
      name: "Document.pdf",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Presentation.pptx",
      reason: "You edited • Mar 3, 2024",
      owner: "user2@gmail.com",
      location: "My Drive",
    },
    {
      name: "Spreadsheet.xlsx",
      reason: "You edited • Feb 1, 2024",
      owner: "user3@gmail.com",
      location: "My Drive",
    },
    {
      name: "Image.png",
      reason: "You edited • Jan 12, 2024",
      owner: "user4@gmail.com",
      location: "My Drive",
    },
    {
      name: "Document.pdf",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Presentation.pptx",
      reason: "You edited • Mar 3, 2024",
      owner: "user2@gmail.com",
      location: "My Drive",
    },
    {
      name: "Spreadsheet.xlsx",
      reason: "You edited • Feb 1, 2024",
      owner: "user3@gmail.com",
      location: "My Drive",
    },
    {
      name: "Image.png",
      reason: "You edited • Jan 12, 2024",
      owner: "user4@gmail.com",
      location: "My Drive",
    },
    {
      name: "Document.pdf",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Presentation.pptx",
      reason: "You edited • Mar 3, 2024",
      owner: "user2@gmail.com",
      location: "My Drive",
    },
    {
      name: "Spreadsheet.xlsx",
      reason: "You edited • Feb 1, 2024",
      owner: "user3@gmail.com",
      location: "My Drive",
    },
    {
      name: "Image.png",
      reason: "You edited • Jan 12, 2024",
      owner: "user4@gmail.com",
      location: "My Drive",
    },
  ];

  // Render Grid View
  const renderGridView = () => (
    <div className="grid-container">
      {files.map((file, index) => (
        <div key={index} className="grid-item">
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

  // Render List View
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
          <tr key={index}>
            <td id="name" className="row-data">
              {file.name}
            </td>
            <td className="row-data">{file.reason}</td>
            <td className="row-data">{file.owner}</td>
            <td className="row-data">{file.location}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div style={{ maxHeight: "70vh", overflowY: "auto", marginTop: "1rem" }}>
      {viewMode === "grid" ? renderGridView() : renderListView()}
    </div>
  );
};

export default FileTable;
