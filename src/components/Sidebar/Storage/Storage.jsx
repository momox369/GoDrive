import React, { useEffect, useState, useContext } from "react";
import { Cloud } from "@phosphor-icons/react";
import { ProgressBar } from "react-bootstrap";
import "./storage.scss";
import { useFiles } from "../../FileController";

export default function Storage() {
  const { files } = useFiles();
  const totalStorage = 15; // Total storage in GB
  const [usedStorage, setUsedStorage] = useState(0);

  useEffect(() => {
    // Calculate the total storage used by summing up the size of all files
    const totalUsed = files.reduce((total, file) => total + file.size, 0);
    console.log(totalUsed);
    const usedStorageGB = totalUsed /( 1024*1024*1024)
    console.log(usedStorageGB);
    setUsedStorage(usedStorageGB);
  }, [files]);

  // Calculate the percentage of storage used
  const storagePercentage = (usedStorage / totalStorage) * 100;

  return (
    <>
      <div className="nav-link d-flex align-items-center custom-storage">
        <Cloud size={20} style={{ marginRight: "1em" }} weight="bold" />
        <span>Storage</span>
      </div>
      <ProgressBar now={storagePercentage} className="storage-bar" />
      <p id="storage-caption">
        {usedStorage.toFixed(2)} GB of {totalStorage} GB used
      </p>
    </>
  );
}
