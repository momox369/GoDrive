import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";

const FileContext = createContext();

export const useFiles = () => useContext(FileContext);

export const FileProvider = ({ children }) => {
  const [filterType, setFilterType] = useState("files"); 
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [fileType, setFileType] = useState();

  const fetchFilesAndFolders = useCallback(async () => {
    try {
      const filesResponse = await axios.get("http://localhost:3001/files", {
        params: { type: "files" },
      });
      const foldersResponse = await axios.get("http://localhost:3001/files", {
        params: { type: "folders" },
      });
      setFiles(filesResponse.data);
      setFolders(foldersResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFiles([]);
      setFolders([]);
    }
  }, []);

  const deleteFiles = useCallback(
    async (fileIds) => {
      console.log("Sending delete request for IDs:", fileIds);
      try {
        await axios.delete("http://localhost:3001/delete", {
          data: { ids: fileIds },
        });
        fetchFilesAndFolders();
      } catch (error) {
        console.error("Error deleting files:", error);
      }
    },
    [fetchFilesAndFolders]
  );

  const filter = useCallback((type) => {
    setFilterType(type);
    setFileType(type);
  }, []);

  useEffect(() => {
    fetchFilesAndFolders();
  }, [fetchFilesAndFolders]);
  const uploadFile = useCallback((newFile) => {
    setFiles((prevFiles) => [...prevFiles, newFile]);
  }, []);

  return (
    <FileContext.Provider
      value={{
        files,
        folders,
        deleteFiles,
        filter,
        filterType,
        fetchFilesAndFolders,
        fileType,
        uploadFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
