import { CloudArrowUp } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const FullScreenDropzone = ({ children, onFilesUploaded }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setIsDragActive(false);
      uploadFiles(acceptedFiles);
    },
    onDragOver: (event) => {
      event.preventDefault();
      setIsDragActive(true);
    },
    onDragLeave: () => setIsDragActive(false),
    noClick: true,
    noKeyboard: true,
  });

  const uploadFiles = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("File uploaded successfully: ", response.data);
      if (onFilesUploaded) {
        onFilesUploaded(response.data); 
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

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
            backgroundColor: "rgba(255,255, 255, 0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CloudArrowUp size={150} color="blue"></CloudArrowUp>
          <h3>Drop the files here...</h3>
        </div>
      )}
      {children}
    </div>
  );
};

export default FullScreenDropzone;
