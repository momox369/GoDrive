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
  const [sharedFiles, setSharedFiles] = useState({ files: [], folders: [] });
  const fileIds = selectedFiles.map((file) => file._id);
  const folderIds = selectedFolders.map((folder) => folder._id);
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
  const fetchSharedFiles = useCallback(async () => {
    try {
      const filesResponse = await axios.get(
        "http://localhost:3001/files-shared-with-me",
        {
          params: { type: "files" },
          withCredentials: true,
        }
      );
      const sharedFiles = filesResponse.data;

      // Fetch shared folders
      const foldersResponse = await axios.get(
        "http://localhost:3001/files-shared-with-me",
        {
          params: { type: "folders" },
          withCredentials: true,
        }
      );
      const sharedFolders = foldersResponse.data;

      // Set state with fetched data
      setSharedFiles({
        files: sharedFiles,
        folders: sharedFolders,
      });
    } catch (error) {
      console.error("Error fetching shared files and folders:", error);
      setSharedFiles({ files: [], folders: [] }); // Reset on error
    }
  }, []);
  const shareItemWithUser = useCallback(
    async (fileId, userId) => {
      try {
        await axios.post(
          "http://localhost:3001/share-file",
          { fileId, userId },
          {
            withCredentials: true,
          }
        );

        alert("File shared successfully!");
        fetchSharedFiles();
      } catch (error) {
        console.error("Error sharing file:", error);
        alert("Failed to share file");
      }
    },
    [sharedFiles]
  );

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
        console.log(fileIds);
        fetchFilesAndFolders();
        fetchTrashedItems();
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
          id: item._id,
        });

        console.log("Star toggled:", response.data);

        if (response.data && response.data.starred !== undefined) {
          setStarredItems((prevItems) => {
            const updatedItems = { ...prevItems };
            const type = item.type;

            if (
              response.data.starred &&
              !updatedItems[type].includes(item._id)
            ) {
              updatedItems[type].push(item._id);
            } else if (!response.data.starred) {
              updatedItems[type] = updatedItems[type].filter(
                (id) => id !== item._id
              );
            }

            return updatedItems;
          });
        }
        // Optionally, refresh the list of starred items from the server
        fetchStarredItems();
      } catch (error) {
        console.error("Error toggling star:", error);
      }
    },
    [fetchStarredItems]
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
    if (filterType === "files") {
      const isCurrentlySelected = selectedFiles.some(
        (selectedItem) => selectedItem._id === item._id
      );

      if (isCurrentlySelected) {
        const newSelection = selectedFiles.filter(
          (selectedItem) => selectedItem._id !== item._id
        );
        console.log(
          "Deselecting, new selection:",
          newSelection.map((f) => f._id)
        );
        setSelectedFiles(newSelection);
        console.log(isSelected);
      } else {
        const newSelection = [...selectedFiles, item];
        console.log(
          "Selecting, new selection:",
          newSelection.map((f) => f._id)
        );
        setSelectedFiles(newSelection);
      }
    } else {
      const isCurrentlySelected = selectedFolders.some(
        (selectedItem) => selectedItem._id === item._id
      );

      if (isCurrentlySelected) {
        const newSelection = selectedFolders.filter(
          (selectedItem) => selectedItem._id !== item._id
        );
        console.log(
          "Deselecting, new selection:",
          newSelection.map((f) => f._id)
        );
        setSelectedFolders(newSelection);
        console.log(isSelected);
      } else {
        // Select the item
        const newSelection = [...selectedFolders, item];
        console.log(
          "Selecting, new selection:",
          newSelection.map((f) => f._id)
        );
        setSelectedFolders(newSelection);
      }
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
        shareItemWithUser,
        sharedFiles,
        fetchSharedFiles,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
