import React from "react";
import { useLocation } from "react-router-dom"; // Import if using React Router
import GridView from "./GridView";
import GridFolderView from "./GridFolderView";
import ListView from "./ListView";
import { useViewMode } from "../ViewModeController";
import { useFiles } from "../FileController";

const FileTable = () => {
  const { pathname } = useLocation(); // Get current path using React Router
  const { viewMode } = useViewMode();
  const {
    filterType,
    itemsToDisplay,
    isSelected,
    handleItemClick,
    trashedItems,
  } = useFiles();

  // Check if the path is not 'home'
  const isTrash = pathname === "/trash";

  return (
    <div style={{ maxHeight: "70vh", overflowY: "auto", marginTop: "1rem" }}>
      {!isTrash && viewMode === "grid" ? (
        filterType === "files" ? (
          <GridView
            items={itemsToDisplay}
            isSelected={isSelected}
            handleItemClick={handleItemClick}
          />
        ) : (
          <GridFolderView
            items={itemsToDisplay}
            isSelected={isSelected}
            handleItemClick={handleItemClick}
          />
        )
      ) : (
        <ListView
          items={isTrash ? trashedItems : itemsToDisplay}
          isSelected={isSelected}
          handleItemClick={handleItemClick}
        />
      )}
    </div>
  );
};

export default FileTable;
