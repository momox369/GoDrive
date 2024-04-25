import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useFiles } from "../../components/FileController";
import DisplayPages from "../../DisplayPages";
import { useLocation } from "react-router-dom";
import ListView from "../../components/FileTable/ListView";
import GridView from "../../components/FileTable/GridView";
import { useViewMode } from "../../components/ViewModeController";
import StaticHeader from "../../components/StaticHeader/StaticHeader";

function FolderContents() {
  const { folderName, folderFiles, isSelected, handleItemClick } = useFiles();
  const { viewMode } = useViewMode();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/folder-contents/${folderName}`)
      .then((response) => {
        setContents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching folder contents:", error);
        setLoading(false);
      });
  }, [folderName]);

  return (
    // <div>
    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : (
    //     <ul>
    //       {contents.map((item) => (
    //         <li key={item.name}>
    //           {item.type === "folder" ? (
    //             <strong>{item.name}</strong>
    //           ) : (
    //             item.name
    //           )}
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
    <DisplayPages>
      <div className="content">
        <StaticHeader title={folderName} />
        {/* {(selectedFiles.length > 0 && filterType === "files") ||
      (selectedFolders.length > 0 && filterType === "folders") ? (
        <FileMenu
          selectedFileIds={fileIds}
          selectedFolderIds={folderIds}
          fileCounter={fileCounter}
          folderCounter={folderCounter}
          resetCounter={resetCounter}
          selectedFolders={selectedFolders}
          selectedFiles={selectedFiles}
        />
      ) : (
        <FilterBar activeFilters={activeFilters} />
      )} */}

        {viewMode === "list" ? (
          <ListView
            items={contents}
            isSelected={isSelected}
            handleItemClick={handleItemClick}
          />
        ) : (
          <GridView
            items={contents}
            isSelected={isSelected}
            handleItemClick={handleItemClick}
          />
        )}
      </div>
    </DisplayPages>
  );
}

export default FolderContents;
