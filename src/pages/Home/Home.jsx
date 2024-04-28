import React, { useEffect, useState } from "react";

import "./home.scss";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import FilterBar from "../../components/FIlterBar/FilterBar";
import FileMenu from "../../components/FileMenu/FileMenu";
import FileList from "../../components/FileTable/FileList";
import { useFiles } from "../../components/FileController";
import DisplayPages from "../../DisplayPages";
import { useLocation } from "react-router-dom";
import { useViewMode } from "../../components/ViewModeController";
import GridFolderView from "../../components/FileTable/GridFolderView";
import ListView from "../../components/FileTable/ListView";
import GridView from "../../components/FileTable/GridView";

function Home() {
  const {
    selectedFiles,
    selectedFolders,
    fileIds,
    folderIds,
    resetCounter,
    isSelected,
    handleItemClick,
    activeFilters,
    filterType,
    fileCounter,
    folderCounter,
    setSelectedFiles,
    fetchFilesAndFolders,
    setSelectedFolders,
    folders,
    files,
    fileType,
  } = useFiles();

  const location = useLocation();
  const { viewMode, setViewMode } = useViewMode();

  useEffect(() => {
    setViewMode("list");
    resetCounter();
    setSelectedFiles([]);
    setSelectedFolders([]);
    fetchFilesAndFolders();
  }, [location.pathname, fetchFilesAndFolders]);

  return (
    <DisplayPages>
      <div className="content">
        <StaticHeader title={"Welcome to GoDrive"} />
        {(selectedFiles.length > 0 && filterType === "files") ||
        (selectedFolders.length > 0 && filterType === "folders") ? (
          <FileMenu selectedFileIds={fileIds} selectedFolderIds={folderIds} />
        ) : (
          <FilterBar activeFilters={activeFilters} />
        )}

        {viewMode === "grid" ? (
          <div className="all-items" style={{ marginTop: "2rem" }}>
            {fileType === "folders" ? (
              <GridFolderView
                items={folders}
                isSelected={isSelected}
                handleItemClick={handleItemClick}
              />
            ) : (
              <GridView
                items={files}
                isSelected={isSelected}
                handleItemClick={handleItemClick}
              />
            )}
          </div>
        ) : (
          <div className="all-items" style={{ marginTop: "2rem" }}>
            {fileType === "folders" ? (
              <ListView
                items={folders}
                isSelected={isSelected}
                handleItemClick={handleItemClick}
              />
            ) : (
              <ListView
                items={files}
                isSelected={isSelected}
                handleItemClick={handleItemClick}
              />
            )}
          </div>
        )}
      </div>
    </DisplayPages>
  );
}

export default Home;