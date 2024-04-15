import {
  DotsThreeVertical,
  DownloadSimple,
  FolderSimple,
  LinkSimpleHorizontal,
  Trash,
  UserPlus,
  X,
} from "@phosphor-icons/react";
import React from "react";
import "./filemenu.scss";

const FileMenu = () => {
  return (
    <div className="file-menu-row">
      <X
        className="file-menu-icon"
        weight="bold"
        size={18}
        style={{ margin: "0 5px", color: "#444746" }}
      />
      <div className="part">
        <span style={{ marginRight: "10px", color: "#444746" }}>
          1 selected
        </span>
        <UserPlus
          className="file-menu-icon"
          weight="bold"
          size={18}
          style={{ margin: "0 5px", color: "#444746" }}
        />
        <DownloadSimple
          className="file-menu-icon"
          weight="bold"
          size={18}
          style={{ margin: "0 5px", color: "#444746" }}
        />
        <FolderSimple
          className="file-menu-icon"
          weight="bold"
          size={18}
          style={{ margin: "0 5px", color: "#444746" }}
        />
        <Trash
          className="file-menu-icon"
          weight="bold"
          size={18}
          style={{ margin: "0 5px", color: "#444746" }}
        />
        <LinkSimpleHorizontal
          className="file-menu-icon"
          weight="bold"
          size={20}
          style={{ margin: "0 5px", color: "#444746" }}
        />
        <DotsThreeVertical
          className="file-menu-icon"
          weight="bold"
          size={20}
          style={{ margin: "0 5px", color: "#444746" }}
        />
      </div>
    </div>
  );
};

export default FileMenu;
