import { useEffect, useState } from "react";
import { useFiles } from "../../components/FileController";
import { useViewMode } from "../../components/ViewModeController";
import axios from "axios";
import DisplayPages from "../../DisplayPages";
import ListView from "../../components/FileTable/ListView";
import GridView from "../../components/FileTable/GridView";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import FileMenu from "../../components/FileMenu/FileMenu";
import { useLocation } from "react-router-dom";

function FolderContents() {
  const {
    folderId,
    setFolderName,
    folderName,
    selectedFiles,
    selectedFolders,
    isSelected,
    handleItemClick,
    fetchFilesAndFolders,
    fileIds,
    folderIds,
    resetCounter,
    setSelectedFiles,
    setSelectedFolders,
  } = useFiles();
  const { viewMode } = useViewMode();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/folder-contents/${folderId}`)
      .then((response) => {
        // Set contents and folder name from the response
        if (response.data.folderName) {
          setFolderName(response.data.folderName);
        }
        setContents(response.data.contents || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching folder contents:", error);
        setLoading(true);
      });
  }, [folderId, fetchFilesAndFolders, setFolderName]);

  useEffect(() => {
    resetCounter();
    setSelectedFiles([]);
    setSelectedFolders([]);
  }, [location.pathname]);

  return (
    <DisplayPages>
      <div className="content">
        <StaticHeader title={folderName || "Folder"} />
        {selectedFiles.length > 0 || selectedFolders.length > 0 ? (
          <FileMenu selectedFileIds={fileIds} selectedFolderIds={folderIds} />
        ) : null}

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