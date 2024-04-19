import React, { useEffect, useState } from "react";

import "./home.scss";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import FilterBar from "../../components/FIlterBar/FilterBar";
import FileTable from "../../components/FileTable/FileTable";
import FileMenu from "../../components/FileMenu/FileMenu";
import FileList from "../../components/FileTable/FileList";

function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);
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
  const updateFilters = (newFilters) => {
    setActiveFilters(newFilters);
  };

  useEffect(() => {}, [selectedFiles, activeFilters]);

  const resetCounter = () => {
    setSelectedFiles([]);
  };

  useEffect(() => {}, [selectedFiles]);

  const fileIds = selectedFiles.map((file) => file.id);

  return (
    <div className="content">
      <StaticHeader title={"Welcome to GoDrive"} />
      {selectedFiles.length > 0 ? (
        <FileMenu
          selectedFileIds={fileIds}
          counter={selectedFiles.length}
          resetCounter={resetCounter}
        />
      ) : (
        <FilterBar
          activeFilters={activeFilters}
          setActiveFilters={updateFilters}
        />
      )}
      <FileList onFileSelect={setSelectedFiles} selectedFiles={selectedFiles} />
    </div>
  );
}

export default Home;
