import React, { useEffect } from "react";

import FileTable from "./FileTable";
import { useFiles } from "../FileController";

const TrashList = () => {
  const { files, folders, fetchFilesAndFolders, filter } = useFiles();

  useEffect(() => {
    fetchFilesAndFolders();
    filter("files");
  }, [fetchFilesAndFolders, filter]);

  return <FileTable />;
};

export default TrashList;
