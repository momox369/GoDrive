import { CloudArrowUp } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useFiles } from "./FileController";

const FullScreenDropzone = ({ children, onFilesUploaded }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const { uploadFile, folderId } = useFiles();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      setIsDragActive(false);
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("files", file);
      formData.append("parentId", folderId);

      try {
        const response = await axios.post(
          "http://localhost:3001/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.data.files.length > 0) {
          uploadFile(response.data.files);
        } else {
          console.error("No files data returned from server");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    onDragOver: (event) => {
      event.preventDefault();
      setIsDragActive(true);
    },
    onDragLeave: () => setIsDragActive(false),
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div {...getRootProps()} style={{ width: "100%", height: "100%" }}>
      <input {...getInputProps()} style={{ display: "none" }} />
      {isDragActive && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255,255,255,0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CloudArrowUp size={150} color="blue" />
          <h3>Drop the files here...</h3>
        </div>
      )}
      {children}
    </div>
  );
};

export default FullScreenDropzone;
