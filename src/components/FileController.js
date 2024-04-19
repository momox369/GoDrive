import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";

const FileContext = createContext();

export const useFiles = () => useContext(FileContext);

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  const fetchFiles = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/files");
      setFiles([...response.data]);
    } catch (error) {
      console.error("Error fetching files:", error);
      setFiles([]);
    }
  }, []);

  return (
    <FileContext.Provider value={{ files, fetchFiles }}>
      {children}
    </FileContext.Provider>
  );
};
