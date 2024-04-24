import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DisplayPages from "../DisplayPages";

const FolderContents = () => {
  const { folderId } = useParams();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFolderContents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/files?folderId=${folderId}`
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };

    fetchFolderContents();
  }, [folderId]);

  return (
    <DisplayPages>
      <div>
        <h2>Folder Contents</h2>
        <ul>
          {files.map((file) => (
            <li key={file.id}>{file.name}</li>
          ))}
        </ul>
      </div>
    </DisplayPages>
  );
};

export default FolderContents;
