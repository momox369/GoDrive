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

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const fileIds = selectedFiles.map((file) => file.id);
  const folderIds = selectedFolders.map((folder) => folder.id);
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

  const filter = useCallback((type) => {
    setFilterType(type);
    setFileType(type);
  }, []);

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

  const uploadFile = useCallback((newFile) => {
    setFiles((prevFiles) => [...prevFiles, newFile]);
  }, []);

    useEffect(() => {
        fetchFilesAndFolders();
    }, [files]); // Add files as a dependency

    const shareFile = useCallback(async (id, username) => {
        try {
            const response = await axios.post("http://localhost:3001/share", {
                id,
                username
            });
            if (response.status === 200) {
                console.log("File shared successfully");
                //print file owner list
                console.log("\nFile owner list:", response.data.owner);
                // Update the local state
                setFiles((prevFiles) =>
                    prevFiles.map((file) =>
                        file.id === id ? { ...file, owner: [...file.owner, username]} : file
                    )

                );
                fetchFilesAndFolders();
            } else {
                console.error("Error sharing file:", response.status);
            }
        } catch (error) {
            console.error("Error sharing file:", error);
        }
    }, [fetchFilesAndFolders]);


  useEffect(() => {}, [selectedFiles, selectedFolders, activeFilters]);
  const resetCounter = () => {
    if (filterType === "files") {
      setSelectedFiles([]);
    } else {
      setSelectedFolders([]);
    }
  };
  const fileCounter = selectedFiles.length;
  const folderCounter = selectedFolders.length;
  const itemsToDisplay = filterType === "folders" ? folders : files;
  const isSelected = filterType === "folders" ? selectedFolders : selectedFiles;
  const handleSelect =
    filterType === "folders" ? handleFolderSelect : handleFileSelect;

  const handleItemClick = (item) => {
    const isCurrentlySelected = isSelected.some((f) => f.id === item.id);
    if (isCurrentlySelected) {
      handleSelect(isSelected.filter((f) => f.id !== item.id));
    } else {
      handleSelect([...isSelected, item]);
    }
  };

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
        handleFileSelect,
        handleFolderSelect,
        selectedFiles,
        selectedFolders,
        fileIds,
        folderIds,
        resetCounter,
        activeFilters,
        fileCounter,
        folderCounter,
        itemsToDisplay,
        isSelected,
        handleSelect,
        handleItemClick,
        setSelectedFiles,
        setSelectedFolders,
        setActiveFilters,
        shareFile
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
