import React from "react";
import {
  DotsThreeVertical,
  FileDoc,
  FileXls,
  Folder,
} from "@phosphor-icons/react";
import "./filetable.scss";

const GridView = ({ items, isSelected, handleItemClick }) => (
  <div className="grid-container">
    {items.map((item) => (
      <div
        key={item._id}
        className={`grid-item ${
          isSelected.some((f) => f._id === item._id) ? "selected-file" : ""
        }`}
        onClick={() => handleItemClick(item)}
      >
        <div className="file-name">
          <p>{item.name}</p>
          <DotsThreeVertical size={20} />
        </div>
        {item.type === "folders" ? (
          <div className="file-name">
            <Folder size={20} />
            <p>{item.name}</p>
          </div>
        ) : item.name.endsWith(".pdf") ? (
          <embed
            src={item.url}
            type="application/pdf"
            width="100%"
            height="100px"
          />
        ) : item.name.endsWith(".doc") || item.name.endsWith(".docx") ? (
          <div className="file-preview">
            <FileDoc className="file-preview-icon" />
          </div>
        ) : item.name.endsWith(".xls") || item.name.endsWith(".xlsx") ? (
          <div className="file-preview">
            <FileXls className="file-preview-icon" />
          </div>
        ) : (
          <img src={item.url} alt="File preview" />
        )}
        <div className="file-details">
          <p>{item.reason}</p>
        </div>
      </div>
    ))}
  </div>
);

export default GridView;
