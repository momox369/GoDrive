import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
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
  const [searchResults, setSearchResults] = useState([]);
  const [searchFilterResults, setSearchFilterResults] = useState([]);
  const navigate = useNavigate();
  const [folderFiles, setFolderFiles] = useState([]);
  const [folderId, setFolderId] = useState(null);
  const [tab, setTab] = useState("starred");

  const [fileTypes, setFileExtensions] = useState([]);
  const mimeTypeToExtension = {
    "application/pdf": ".pdf",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template":
      ".dotx",
    "application/vnd.ms-word.document.macroEnabled.12": ".docm",
    "application/vnd.ms-word.template.macroEnabled.12": ".dotm",
    "application/vnd.ms-excel": ".xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      ".xlsx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template":
      ".xltx",
    "application/vnd.ms-excel.sheet.macroEnabled.12": ".xlsm",
    "application/vnd.ms-excel.template.macroEnabled.12": ".xltm",
    "application/vnd.ms-excel.addin.macroEnabled.12": ".xlam",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12": ".xlsb",
    "application/vnd.ms-powerpoint": ".ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      ".pptx",
    "application/vnd.openxmlformats-officedocument.presentationml.template":
      ".potx",
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
      ".ppsx",
    "application/vnd.ms-powerpoint.addin.macroEnabled.12": ".ppam",
    "application/vnd.ms-powerpoint.presentation.macroEnabled.12": ".pptm",
    "application/vnd.ms-powerpoint.template.macroEnabled.12": ".potm",
    "application/vnd.ms-powerpoint.slideshow.macroEnabled.12": ".ppsm",
    "application/vnd.ms-access": ".mdb",
    "application/pdf": ".pdf",
    "application/msword": ".doc",
    // More existing types...

    // Image types
    "image/apng": "APNG",
    "image/avif": "AVIF",
    "image/gif": "GIF",
    "image/jpeg": "JPEG",
    "image/png": "PNG",
    "image/svg+xml": "SVG",
    "image/webp": "WEBP",

    // Compressed files
    "application/zip": "ZIP",
    "application/x-rar-compressed": "RAR",

    // PDF (already included, added for completeness)
    "application/pdf": "PDF",

    // Video formats
    "video/mp4": "MP4 Video",
    "video/x-matroska": "MKV Video",
    "video/webm": "WebM Video",
    "video/avi": "AVI Video",
    "video/mpeg": "MPEG Video",
  };

  const updateFileTypes = (files) => {
    // Create a map to ensure unique types based on MIME type
    const newTypesMap = new Map();

    // Populate the map, thus deduplicating by mimeType
    files.forEach((file) => {
      const mimeType = file.mimeType;
      if (!newTypesMap.has(mimeType) && filterType === "files") {
        newTypesMap.set(mimeType, {
          label: mimeTypeToExtension[mimeType],
          mimeType: mimeType,
        });
      }
    });

    // Convert the map values to an array of unique types
    const uniqueNewTypes = Array.from(newTypesMap.values());

    // Use functional update form of setState
    setFileExtensions((currentTypes) => {
      const currentMimeTypes = new Set(
        currentTypes.map((type) => type.mimeType)
      );
      const filteredNewTypes = uniqueNewTypes.filter(
        (type) => !currentMimeTypes.has(type.mimeType)
      );

      return filteredNewTypes.length > 0
        ? [...currentTypes, ...filteredNewTypes]
        : currentTypes;
    });
  };

  const handleFolderDoubleClick = (folder) => {
    setFolderId(folder._id);
    navigate(`/folders/${folder._id}`);
  };

  const handleSearchComplete = (results) => {};
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
      // Fetch personal files and folders
      const endpoint = folderId ? `folder-contents/${folderId}` : "files";
      const personalFilesResponse = await axios.get(
        `http://localhost:3001/${endpoint}`
      );

      const sharedFilesResponse = await axios.get(
        "http://localhost:3001/files-shared-with-me",
        {
          params: { type: "files" },
          withCredentials: true,
        }
      );

      const personalFiles = personalFilesResponse.data.filter(
        (item) => item.type === "files"
      );
      const sharedFiles = sharedFilesResponse.data; // Assuming all are files

      const combinedFiles = [...personalFiles, ...sharedFiles];

      setFiles(combinedFiles);
      const foldersResponse = personalFilesResponse.data.filter(
        (item) => item.type === "folders"
      );
      setFolders(foldersResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFiles([]);
      setFolders([]);
    }
  }, [folderId]); // Make sure this depends on all relevant dependencies

  const fetchFiles = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/files");
      console.log("fetch files response: ", response.data);

      updateFileTypes(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, [searchResults, fileTypes]);

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
  }, [folderId]);

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

  const uploadFile = useCallback((newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
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

        setSelectedFiles(newSelection);
        console.log(isSelected);
      } else {
        const newSelection = [...selectedFiles, item];

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

        setSelectedFolders(newSelection);
      } else {
        const newSelection = [...selectedFolders, item];

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
        searchResults,
        setSearchResults,
        handleSearchComplete,
        folderFiles,
        setFolderFiles,
        folderId,
        handleFolderDoubleClick,
        setFolderId,
        tab,
        setTab,
        fetchStarredItems,
        fileTypes,
        updateFileTypes,
        fetchFiles,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
