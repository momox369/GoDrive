import React from "react";
import GridView from "./GridView";
import GridFolderView from "./GridFolderView";
import ListView from "./ListView";
import { useViewMode } from "../ViewModeController";
import { useFiles } from "../FileController";

const FileTable = () => {
  const { viewMode } = useViewMode();
  const { filterType, itemsToDisplay, isSelected, handleItemClick } =
    useFiles();

  return (
    <div style={{ maxHeight: "70vh", overflowY: "auto", marginTop: "1rem" }}>
      {viewMode === "grid" ? (
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
          items={itemsToDisplay}
          isSelected={isSelected}
          handleItemClick={handleItemClick}
        />
      )}
    </div>
  );
};

export default FileTable;
