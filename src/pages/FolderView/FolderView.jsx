import { useEffect, useState } from "react";
import { useFiles } from "../../components/FileController";
import { useViewMode } from "../../components/ViewModeController";
import axios from "axios";
import DisplayPages from "../../DisplayPages";

import ListView from "../../components/FileTable/ListView";
import GridView from "../../components/FileTable/GridView";

import StaticHeader from "../../components/StaticHeader/StaticHeader";
import FileMenu from "../../components/FileMenu/FileMenu";
import FilterBar from "../../components/FIlterBar/FilterBar";
import { useLocation } from "react-router-dom";
function FolderContents() {
  const {
    folderId,
    folderFiles,
    selectedFiles,
    selectedFolders,
    isSelected,
    handleItemClick,
    fetchFilesAndFolders,
    files,
    folders,
    filterType,
    fileIds,
    folderIds,
    activeFilters,
    setSelectedFiles,
    setSelectedFolders,
    resetCounter,
  } = useFiles();
  const { viewMode } = useViewMode();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/folder-contents/${folderId}`)
      .then((response) => {
        setContents(response.data);
        setLoading(false);
        fetchFilesAndFolders();
      })
      .catch((error) => {
        console.error("Error fetching folder contents:", error);
        setLoading(true);
      });
  }, [folderId, files, folders, contents]);
  useEffect(() => {
    resetCounter();
    setSelectedFiles([]);
    setSelectedFolders([]);
  }, [location.pathname]);
  console.log(folderFiles);
  return (
    <DisplayPages>
      <div className="content">
        <StaticHeader title={folderId} />
        {selectedFiles.length > 0 || selectedFolders.length > 0 ? (
          <FileMenu selectedFileIds={fileIds} selectedFolderIds={folderIds} />
        ) : (
          <FilterBar activeFilters={activeFilters} />
        )}

        {viewMode === "list" ? (
          <ListView
            items={contents}
            isSelected={isSelected}
            handleItemClick={handleItemClick}
          />
        ) : (
          <GridView
            items={contents}
            isSelected={isSelected}
            handleItemClick={handleItemClick}
          />
        )}
      </div>
    </DisplayPages>
  );
}

export default FolderContents;
