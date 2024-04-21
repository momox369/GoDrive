import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";

const FileContext = createContext();

export const useFiles = () => useContext(FileContext);

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  const fetchFiles = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
      setFiles([]);
    }
  }, []);

  const deleteFiles = useCallback(
    async (fileIds) => {
      try {
        const response = await axios.delete("http://localhost:3001/delete", {
          data: { ids: fileIds },
        });
        const updatedFiles = files.filter((file) => !fileIds.includes(file.id));
        setFiles(updatedFiles);
      } catch (error) {
        console.error("Error deleting files:", error);
      }
    },
    [files]
  );
  const uploadFile = useCallback((newFile) => {
    setFiles((prevFiles) => [...prevFiles, newFile]);
  }, []);

  return (
    <FileContext.Provider
      value={{ files, fetchFiles, deleteFiles, uploadFile }}
    >
      {children}
    </FileContext.Provider>
  );
};
