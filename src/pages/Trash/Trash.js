import React from "react";
import "./trash.scss";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import FilterBar from "../../components/FIlterBar/FilterBar";
import DisplayPages from "../../DisplayPages";
import GridFolderView from "../../components/FileTable/GridFolderView";
import { useFiles } from "../../components/FileController";
import GridView from "../../components/FileTable/GridView";
import FileMenu from "../../components/FileMenu/FileMenu";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useViewMode } from "../../components/ViewModeController";
import { useState } from "react";
import ListView from "../../components/FileTable/ListView";
import TrashMenu from "../../components/FileMenu/TrashMenu";
import TrashList from "../../components/FileTable/TrashList";

function Trash() {
  const {
    filterType,
    itemsToDisplay,
    isSelected,
    handleItemClick,
    folders,
    files,
    selectedFiles,
    selectedFolders,
    fileIds,
    activeFilters,
    folderIds,
    setSelectedFiles,
    setSelectedFolders,
    resetCounter,
    trashedItems,
    fetchTrashedItems,
  } = useFiles();
  const { viewMode } = useViewMode();
  const location = useLocation();

  useEffect(() => {
    resetCounter();
    setSelectedFiles([]);
    setSelectedFolders([]);
    fetchTrashedItems();
  }, [location.pathname]);
  console.log(trashedItems);
  return (
    <DisplayPages>
      <div className="content drive">
        <StaticHeader title={"Trash"} />
        {selectedFiles.length > 0 || selectedFolders.length > 0 ? (
          <TrashMenu selectedFileIds={fileIds} selectedFolderIds={folderIds} />
        ) : (
          ""
        )}
        <div className="all-items">
          <div className="all-items-folders">
            {" "}
            {viewMode === "list" ? (
              <ListView
                items={trashedItems}
                isSelected={isSelected}
                handleItemClick={handleItemClick}
              ></ListView>
            ) : (
              <GridView
                items={trashedItems}
                isSelected={isSelected}
                handleItemClick={handleItemClick}
              ></GridView>
            )}
          </div>
        </div>
      </div>
    </DisplayPages>
  );
}

export default Trash;
