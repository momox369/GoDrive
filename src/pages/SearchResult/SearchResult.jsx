import React, { useEffect } from "react";
import DisplayPages from "../../DisplayPages";
import { useFiles } from "../../components/FileController";
import { useLocation } from "react-router-dom";
import ListView from "../../components/FileTable/ListView";
import GridView from "../../components/FileTable/GridView";
import { useViewMode } from "../../components/ViewModeController";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
export default function SearchResult() {
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
    isSelected,
    handleItemClick,
    setSelectedFolders,
  } = useFiles();

  const location = useLocation();
  const { viewMode, setViewMode } = useViewMode();
  const { searchResults } = useFiles();

  useEffect(() => {
    setViewMode("list");
    resetCounter();
    setSelectedFiles([]);
    setSelectedFolders([]);
  }, [location.pathname]);
  return (
    <DisplayPages>
      <div className="content">
        <StaticHeader title={"Search Results"} />
        {/* {(selectedFiles.length > 0 && filterType === "files") ||
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
        )} */}

        {viewMode === "list" ? (
          <ListView
            items={searchResults}
            isSelected={isSelected}
            handleItemClick={handleItemClick}
          />
        ) : (
          <GridView
            items={searchResults}
            isSelected={isSelected}
            handleItemClick={handleItemClick}
          />
        )}
      </div>
    </DisplayPages>
  );
}
