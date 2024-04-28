import React, { useState, useEffect } from "react";
import { useFiles } from "./FileController";

export default function Directory({ filter }) {
  const {
    fetchFilesAndFolders,
    folders,
    folderFiles,
    fetchStarredItems,
    starredItems,
    fetchSharedFiles,
    sharedFiles,
    setFolderId,
  } = useFiles();

  const [currentFolderId, setCurrentFolderId] = useState(null);

  useEffect(() => {
    if (filter === "starred") {
      if (currentFolderId) {
        setFolderId(currentFolderId); // Assuming this function is properly integrated
        fetchStarredItems();
      } else {
        fetchStarredItems(); // This should fetch all top-level folders by default
      }
    } else if (filter === "shared") {
      fetchSharedFiles();
    } else {
      if (currentFolderId) {
        setFolderId(currentFolderId); // Assuming this function is properly integrated
        fetchFilesAndFolders();
      } else {
        fetchFilesAndFolders(); // This should fetch all top-level folders by default
      }
    }
  }, [
    currentFolderId,
    fetchFilesAndFolders,
    filter,
    fetchStarredItems,
    fetchSharedFiles,
  ]);

  const handleFolderClick = (folderId) => {
    setCurrentFolderId(folderId);
  };

  const getDisplayFolders = () => {
    if (filter === "starred") {
      return starredItems.folders;
    } else if (filter === "shared") {
      return sharedFiles.folders;
    }
    return currentFolderId ? folderFiles : folders;
  };

  const displayFolders = getDisplayFolders();
  return (
    <div>
      {currentFolderId && (
        <button onClick={() => setCurrentFolderId(null)}>Back to root</button>
      )}
      {displayFolders.map((folder) => (
        <div key={folder._id} onClick={() => handleFolderClick(folder._id)}>
          {folder.name}
        </div>
      ))}
    </div>
  );
}
