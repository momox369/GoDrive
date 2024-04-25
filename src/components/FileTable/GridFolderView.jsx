import { Folder } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useFiles } from "../FileController";

const GridFolderView = ({ items, isSelected, handleItemClick }) => {
  const { handleFolderDoubleClick } = useFiles();
  return (
    <div className="grid-container">
      {items.map((item) => (
        <div
          key={item._id}
          className={`grid-folder-item ${
            isSelected.some((f) => f._id === item._id) ? "selected-file" : ""
          }`}
          onClick={() => handleItemClick(item)}
          onDoubleClick={() => {
            if (item.type === "folders") {
              handleFolderDoubleClick(item); // Call the function on double-click
            }
          }} // Handle double-click here
        >
          <Folder size={25} weight="fill" />
          <div className="file-name">
            <p>{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridFolderView;
