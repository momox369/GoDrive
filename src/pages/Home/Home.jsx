import React, { useEffect, useState } from "react";

import "./home.scss";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import FilterBar from "../../components/FIlterBar/FilterBar";
import FileTable from "../../components/FileTable/FileTable";
import FileMenu from "../../components/FileMenu/FileMenu";

function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const resetCounter = () => {
    setSelectedFiles([]);
  };

  useEffect(() => {}, [selectedFiles]);
  return (
    <div className="content">
      <StaticHeader title={"Welcome to GoDrive"} />
      {selectedFiles.length > 0 ? (
        <FileMenu counter={selectedFiles.length} resetCounter={resetCounter} />
      ) : (
        <FilterBar />
      )}
      <FileTable
        onFileSelect={setSelectedFiles}
        selectedFiles={selectedFiles}
      />
    </div>
  );
}

export default Home;
