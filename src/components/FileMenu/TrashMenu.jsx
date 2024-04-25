import {
  ClockCounterClockwise,
  DotsThreeVertical,
  DownloadSimple,
  FolderSimple,
  LinkSimpleHorizontal,
  Trash,
  UserPlus,
  X,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import "./filemenu.scss";
import { Button, Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import { useFiles } from "../FileController";

const TrashMenu = ({ selectedFileIds, selectedFolderIds }) => {
  const {
    fileType,
    selectedFiles,
    fileCounter,
    folderCounter,
    resetCounter,
    selectedFolders,
    trashedItems,
    toggleTrash,
    deleteFiles,
  } = useFiles();

  const handleRecover = async () => {
    const idsToToggle = (
      fileType === "files" ? selectedFiles : selectedFolders
    ).map((file) => file._id);
    await toggleTrash(idsToToggle);
  };
  const handleDelete = async () => {
    if (fileType === "files") {
      await deleteFiles(selectedFileIds);
      console.log(selectedFileIds);
    } else {
      await deleteFiles(selectedFolderIds);
    }
  };

  return (
    <div className="file-menu-row">
      <div className="part">
        <Button className="menu-icons" onClick={handleRecover}>
          <ClockCounterClockwise
            className="file-menu-icon"
            weight="bold"
            size={18}
            style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
          />
        </Button>

        <Button className="menu-icons">
          <Trash
            className="file-menu-icon"
            weight="bold"
            size={18}
            onClick={handleDelete}
            style={{ margin: "0 5px", color: "#444746", cursor: "pointer" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default TrashMenu;
