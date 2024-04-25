import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import TopNavigationBar from "./components/TopBar/TopNavigationBar";
import Shared from "./pages/Shared/Shared";
import Starred from "./pages/Starred/Starred";
import Trash from "./pages/Trash/Trash";
import Drive from "./pages/Drive/Drive";
import { ViewModeProvider } from "./components/ViewModeController";
import FullScreenDropzone from "./components/FileUpload";
import { FileProvider } from "./components/FileController";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignIn/SignUp";
import "../src/app.css";
import DisplayPages from "./DisplayPages";
import SignInPass from "./pages/SignIn/SignInpass";
import { AuthProvider } from "./components/AuthProvider";
import SearchResult from "./pages/SearchResult/SearchResult";
import AdvancedSearch from "./components/TopBar/AdvancedFilter";
import FolderContent from "./pages/FolderView/FolderView";

const App = () => (
  <BrowserRouter>
    <FileProvider>
      <ViewModeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/loginpass" element={<SignInPass />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/drive" element={<Drive />} />
            <Route path="/shared" element={<Shared />} />
            <Route path="/starred" element={<Starred />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/display" element={<DisplayPages />} />
            <Route path="/searchResults" element={<SearchResult />} />{" "}
            <Route path="/folders/:folderName" element={<FolderContent />} />
          </Routes>
        </AuthProvider>
      </ViewModeProvider>
    </FileProvider>
  </BrowserRouter>
);

export default App;
