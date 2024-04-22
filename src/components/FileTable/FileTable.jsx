import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import "./filetable.scss";
import { useViewMode } from "../ViewModeController";
import { useFiles } from "../FileController";
import { Folder } from "@phosphor-icons/react";

const FileTable = ({
  onFileSelect,
  onFolderSelect,
  selectedFiles,
  selectedFolders,
  files,
  folders,
}) => {
  const { viewMode } = useViewMode();
  const { filterType } = useFiles();

  const itemsToDisplay = filterType === "folders" ? folders : files;
  const isSelected = filterType === "folders" ? selectedFolders : selectedFiles;
  const handleSelect = filterType === "folders" ? onFolderSelect : onFileSelect;

  const handleItemClick = (item) => {
    const isCurrentlySelected = isSelected.some((f) => f.id === item.id);
    if (isCurrentlySelected) {
      handleSelect(isSelected.filter((f) => f.id !== item.id));
    } else {
      handleSelect([...isSelected, item]);
    }
  };

  const renderGridView = () => (
    <div className="grid-container">
      {itemsToDisplay.map((item) => (
        <div
          key={item.id}
          className={`grid-item ${
            isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
          }`}
          onClick={() => handleItemClick(item)}
        >
          <div className="file-name">
            <p>{item.name}</p>
          </div>
          {item.type === "folders" ? (
            <div className="file-name">
              <Folder size={20} />
              <p>{item.name}</p>
            </div>
          ) : item.name.endsWith(".pdf") ? (
            <embed
              src={item.url}
              type="application/pdf"
              width="100%"
              height="100px"
            />
          ) : (
            <img src={item.url} alt="File preview" />
          )}
          <div className="file-details">
            <p>{item.reason}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGridFolderView = () => (
    <div className="grid-container">
      {itemsToDisplay.map((item) => (
        <div
          key={item.id}
          className={`grid-folder-item ${
            isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
          }`}
          onClick={() => handleItemClick(item)}
        >
          <Folder size={25} weight="fill" />
          <div className="file-name">
            <p>{item.name}</p>
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
        {itemsToDisplay.map((item) => (
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
              {item.owner}
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

  return (
    <div style={{ maxHeight: "70vh", overflowY: "auto", marginTop: "1rem" }}>
      {viewMode === "grid"
        ? filterType === "files"
          ? renderGridView()
          : renderGridFolderView()
        : renderListView()}
    </div>
  );
};

export default FileTable;
