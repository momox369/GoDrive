import React from "react";
import "./drive.scss";
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

function Drive() {
  const {
    filterType,
    itemsToDisplay,
    isSelected,
    handleItemClick,
    folders,
    files,
    selectedFiles,
    selectedFolders,
    setSelectedFiles,
    setSelectedFolders,
    resetCounter,
  } = useFiles();
  const location = useLocation();
  const { viewMode } = useViewMode();
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    if (viewMode === "list") {
      setAllFiles([...files, ...folders]);
    }
  }, [files, folders, viewMode]);

  useEffect(() => {
    resetCounter();
    setSelectedFiles([]);
    setSelectedFolders([]);
  }, [location.pathname, resetCounter, setSelectedFiles, setSelectedFolders]);

  return (
    <DisplayPages>
      <div className="content drive">
        <StaticHeader title={"Drive"} />
        {selectedFiles.length > 0 || selectedFolders.length > 0 ? (
          <FileMenu />
        ) : (
          <FilterBar />
        )}
        <div className="all-items">
          {viewMode === "grid" ? (
            <>
              <div className="all-items-folders">
                <p>Folders</p>
                <GridFolderView
                  items={folders}
                  isSelected={isSelected}
                  handleItemClick={handleItemClick}
                />
              </div>
              <div className="all-items-files">
                <p>Files</p>
                <GridView
                  items={files}
                  isSelected={isSelected}
                  handleItemClick={handleItemClick}
                />
              </div>
            </>
          ) : (
            <ListView
              items={allFiles}
              isSelected={isSelected}
              handleItemClick={handleItemClick}
            />
          )}
        </div>
      </div>
    </DisplayPages>
  );
}

export default Drive;
