import React from "react";
import { Table } from "react-bootstrap";
import "./filetable.scss";

const FileTable = () => {
  const files = [
    {
      name: "Compatibilism Presentation",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Compatibilism Presentation",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Compatibilism Presentation",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Compatibilism Presentation",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Compatibilism Presentation",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Compatibilism Presentation",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Compatibilism Presentation",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Compatibilism Presentation",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Compatibilism Presentation",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Compatibilism Presentation",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },
    {
      name: "Compatibilism Presentation",
      reason: "You edited • Apr 7, 2024",
      owner: "user@gmail.com",
      location: "My Drive",
    },

    // ... other file objects
  ];

  return (
    <div style={{ maxHeight: "70vh", overflowY: "auto", marginTop: "1rem" }}>
      <Table hover className="file-table">
        <thead style={{ position: "sticky", top: "0" }}>
          <tr>
            <th>Name</th>
            <th>Reason Suggested</th>
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
    </div>
  );
};

export default FileTable;
