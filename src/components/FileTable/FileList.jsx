import React, { useEffect } from "react";

import FileTable from "./FileTable";
import { useFiles } from "../FileController";

const FileList = ({ onFileSelect, selectedFiles }) => {
  const { files, fetchFiles } = useFiles();

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <FileTable
      onFileSelect={onFileSelect}
      selectedFiles={selectedFiles}
      files={files}
    />
  );
};

export default FileList;
