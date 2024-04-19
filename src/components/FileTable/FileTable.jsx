import React from "react";
import { Table } from "react-bootstrap";
import "./filetable.scss";
import { useViewMode } from "../ViewModeController";

const FileTable = ({ onFileSelect, selectedFiles, files }) => {
  const { viewMode } = useViewMode();
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
      {files &&
        files.map((file, index) => (
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
            {file.name.endsWith(".pdf") ? (
              <embed src={file.url} type="application/pdf" />
            ) : (
              <img src={file.url} alt="File preview" />
            )}
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
        {files &&
          files.map((file, index) => (
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
                id="owner"
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
