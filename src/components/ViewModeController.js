import React, { createContext, useState, useContext } from "react";

const ViewModeContext = createContext({
  viewMode: "list", // default view mode
  setViewMode: () => {}, // placeholder function
});

export const useViewMode = () => useContext(ViewModeContext);

export const ViewModeProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState("list");

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};
