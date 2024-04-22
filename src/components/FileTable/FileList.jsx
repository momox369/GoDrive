import React, { useEffect } from "react";

import FileTable from "./FileTable";
import { useFiles } from "../FileController";

const FileList = ({ onFileSelect, selectedFiles, selectedFolders, onFolderSelect }) => {
  const { files, folders, fetchFilesAndFolders, filter } = useFiles();

  useEffect(() => {
    fetchFilesAndFolders();
    filter("files");
  }, [fetchFilesAndFolders, filter]);

  return (
    <FileTable
      onFileSelect={onFileSelect}
      onFolderSelect={onFolderSelect}
      selectedFiles={selectedFiles}
      selectedFolders={selectedFolders}
      files={files}
      folders={folders}
    />
  );
};

export default FileList;
