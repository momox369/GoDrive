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
  const [starredItems, setStarredItems] = useState({ files: [], folders: [] });
  const [trashedItems, setTrashedItems] = useState([]);
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

  const fetchStarredItems = useCallback(async () => {
    try {
      const filesResponse = await axios.get("http://localhost:3001/starred", {
        params: { type: "files" },
      });
      const starredFiles = filesResponse.data;

      const foldersResponse = await axios.get("http://localhost:3001/starred", {
        params: { type: "folders" },
      });
      const starredFolders = foldersResponse.data;

      setStarredItems({ files: starredFiles, folders: starredFolders });
    } catch (error) {
      console.error("Error fetching starred items:", error);
      setStarredItems({ files: [], folders: [] });
    }
  }, [starredItems]);

  const filter = useCallback((type) => {
    setFilterType(type);
    setFileType(type);
  }, []);

  useEffect(() => {
    filter("files");
  }, [filter]);

  const handleFileSelect = (newSelectedFiles) => {
    setSelectedFiles(newSelectedFiles);
  };

  const handleFolderSelect = (newSelectedFolders) => {
    setSelectedFolders(newSelectedFolders);
  };

  const deleteFiles = useCallback(
    async (fileIds) => {
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

  const fetchTrashedItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/trash");
      setTrashedItems(response.data);
    } catch (error) {
      console.error("Error fetching trashed items:", error);
    }
  };
  const toggleTrash = useCallback(
    async (ids) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/toggle-trash",
          { ids }
        );
        console.log("Trash toggled:", response.data);
        fetchTrashedItems();
      } catch (error) {
        console.error("Error toggling trash status:", error);
      }
    },
    [fetchTrashedItems]
  );
  useEffect(() => {
    fetchFilesAndFolders();
    fetchTrashedItems();
    fetchStarredItems();
  }, []);

  const toggleStar = useCallback(
    async (item) => {
      try {
        const response = await axios.post("http://localhost:3001/toggle-star", {
          id: item.id,
        });

        console.log("Star toggled:", response.data);

        setStarredItems((prevItems) => {
          const updatedItems = { ...prevItems };
          const index = updatedItems[item.type].indexOf(item.id);

          if (response.data.starred) {
            if (index === -1) updatedItems[item.type].push(item.id);
          } else {
            if (index !== -1) updatedItems[item.type].splice(index, 1);
          }

          return updatedItems;
        });

        fetchStarredItems();
      } catch (error) {
        console.error("Error toggling star:", error);
      }
    },
    [fetchStarredItems]
  );
  const shareFile = useCallback(
    async (id, username) => {
      try {
        const response = await axios.post("http://localhost:3001/share", {
          id,
          username,
        });
        if (response.status === 200) {
          console.log("File shared successfully");
          // Optionally fetch updated file data or adjust state locally
          fetchFilesAndFolders(); // Refresh data if needed or handle state update locally
        } else {
          console.error("Error sharing file:", response.statusText);
        }
      } catch (error) {
        console.error("Error sharing file:", error);
      }
    },
    [fetchFilesAndFolders]
  );

  const uploadFile = useCallback((newFile) => {
    setFiles((prevFiles) => [...prevFiles, newFile]);
  }, []);

  useEffect(() => {
    fetchFilesAndFolders();
  }, [fetchFilesAndFolders, selectedFiles, selectedFolders, activeFilters]);
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
        starredItems,
        toggleStar,
        trashedItems,
        fetchTrashedItems,
        toggleTrash,
        deleteFiles,
        setStarredItems,
        shareFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
