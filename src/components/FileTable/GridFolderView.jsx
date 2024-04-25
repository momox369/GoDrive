import React from 'react';
import { Folder } from "@phosphor-icons/react";
import "./filetable.scss";


const GridFolderView = ({ items, isSelected, handleItemClick }) => (
  <div className="grid-container">
    {items.map((item) => (
      <div
        key={item._id}
        className={`grid-folder-item ${isSelected.some(f => f._id === item._id) ? "selected-file" : ""}`}
        onClick={() => handleItemClick(item)}
      >
        <Folder size={25} weight="fill" />
        <div className="file-name"><p>{item.name}</p></div>
      </div>
    ))}
  </div>
);

export default GridFolderView;
