import React, { useEffect } from "react";

import FileTable from "./FileTable";
import { useFiles } from "../FileController";

const FileList = ({ onFileSelect, selectedFiles }) => {
  const { files, fetchFiles } = useFiles();

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleFileSelect = (selected) => {
    onFileSelect(selected);
  };

  return (
    <FileTable
      onFileSelect={handleFileSelect}
      selectedFiles={selectedFiles}
      files={files}
    />
  );
};

export default FileList;
