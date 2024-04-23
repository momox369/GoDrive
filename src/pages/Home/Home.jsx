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

function Home() {
  const {
    selectedFiles,
    selectedFolders,
    fileIds,
    folderIds,
    resetCounter,
    activeFilters,
    filterType,
    fileCounter,
    folderCounter,
    setSelectedFiles,
    setSelectedFolders,
  } = useFiles();

  const location = useLocation();
  const { viewMode, setViewMode } = useViewMode();

  useEffect(() => {
    setViewMode("list");
    resetCounter();
    setSelectedFiles([]);
    setSelectedFolders([]);
  }, [location.pathname]);
  return (
    <DisplayPages>
      <div className="content">
        <StaticHeader title={"Welcome to GoDrive"} />
        {(selectedFiles.length > 0 && filterType === "files") ||
        (selectedFolders.length > 0 && filterType === "folders") ? (
          <FileMenu
            selectedFileIds={fileIds}
            selectedFolderIds={folderIds}
            fileCounter={fileCounter}
            folderCounter={folderCounter}
            resetCounter={resetCounter}
            selectedFolders={selectedFolders}
            selectedFiles={selectedFiles}
          />
        ) : (
          <FilterBar activeFilters={activeFilters} />
        )}

        <FileList />
      </div>
    </DisplayPages>
  );
}

export default Home;
