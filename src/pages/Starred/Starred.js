import React from "react";
import "./starred.scss";
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

function Starred() {
  const {
    filterType,
    itemsToDisplay,
    isSelected,
    handleItemClick,
    folders,
    files,
    activeFilters,
    selectedFiles,
    selectedFolders,
    fileIds,
    folderIds,
    setSelectedFiles,
    setSelectedFolders,
    resetCounter,
    starredItems,
  } = useFiles();
  const location = useLocation();
  const { viewMode, setViewMode } = useViewMode();

  useEffect(() => {
    resetCounter();
    setViewMode("grid");
    setSelectedFiles([]);
    setSelectedFolders([]);
  }, [location.pathname]);
  const allItems = starredItems.files.concat(starredItems.folders);
  return (
    <DisplayPages>
      <div className="content drive">
        <StaticHeader title={"Starred"} />
        {selectedFiles.length > 0 || selectedFolders.length > 0 ? (
          <FileMenu selectedFileIds={fileIds} selectedFolderIds={folderIds} />
        ) : (
          <FilterBar activeFilters={activeFilters} />
        )}
        {viewMode === "grid" ? (
          <div className="all-items">
            <div className="all-items-folders">
              {" "}
              <p>Folders</p>
              <GridFolderView
                items={starredItems.folders}
                isSelected={isSelected}
                handleItemClick={handleItemClick}
              />
            </div>
            <div className="all-items-files">
              <p>Files</p>
              <GridView
                items={starredItems.files}
                isSelected={isSelected}
                handleItemClick={handleItemClick}
              />
            </div>
          </div>
        ) : (
          <div className="all-items">
            <div className="all-items-files">
              <ListView
                items={allItems}
                isSelected={isSelected}
                handleItemClick={handleItemClick}
              />
            </div>
          </div>
        )}
      </div>
    </DisplayPages>
  );
}

export default Starred;
