import React, { useEffect, useState } from "react";

import "./home.scss";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import FilterBar from "../../components/FIlterBar/FilterBar";
import FileMenu from "../../components/FileMenu/FileMenu";
import FileList from "../../components/FileTable/FileList";
import { useFiles } from "../../components/FileController";

function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const { fetchFilesAndFolders, filter, filterType, fileType } = useFiles();
  const [activeFilters, setActiveFilters] = useState({
    type: {
      lastSelectedTitle: "Type",
      isSelected: false,
      selectedTitle: "Type",
    },
    people: {
      lastSelectedTitle: "People",
      isSelected: false,
      selectedTitle: "People",
    },
    location: {
      lastSelectedTitle: "Location",
      isSelected: false,
      selectedTitle: "Location",
    },
    modified: {
      lastSelectedTitle: "Modified",
      isSelected: false,
      selectedTitle: "Modified",
    },
  });

  const resetCounter = () => {
    if (filterType === "files") {
      setSelectedFiles([]);
    } else {
      setSelectedFolders([]);
    }
  };

  useEffect(() => {
    fetchFilesAndFolders();
    filter("files");
  }, [fetchFilesAndFolders, filter]);

  const handleFileSelect = (newSelectedFiles) => {
    setSelectedFiles(newSelectedFiles);
  };

  const handleFolderSelect = (newSelectedFolders) => {
    setSelectedFolders(newSelectedFolders);
  };
  const fileCounter = selectedFiles.length;
  const folderCounter = selectedFolders.length;

  const fileIds = selectedFiles.map((file) => file.id);
  const folderIds = selectedFolders.map((folder) => folder.id);

  useEffect(() => {}, [selectedFiles, selectedFolders, activeFilters]);
  return (
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

      <FileList
        onFileSelect={handleFileSelect}
        onFolderSelect={handleFolderSelect}
        selectedFiles={selectedFiles}
        selectedFolders={selectedFolders}
      />
    </div>
  );
}

export default Home;
