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
import SignIn from './pages/SignIn/SignIn';
import SignUp from "./pages/SignUp/SignUp";

const App = () => (
  <BrowserRouter>
    <ViewModeProvider>
      <FileProvider>
        <div
          style={{
            backgroundColor: "#f7fafd",
            paddingTop: "0.5em",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="d-flex" style={{ flex: 1, overflow: "hidden" }}>
            <Sidebar style={{ flexShrink: 0, overflowY: "auto" }} />

            <main
              style={{
                flex: 4,
                overflowY: "hidden",
                marginRight: "1.3em",
                position: "relative",
              }}
            >
              <TopNavigationBar />
              <FullScreenDropzone>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/drive" element={<Drive />} />
                  <Route path="/shared" element={<Shared />} />
                  <Route path="/starred" element={<Starred />} />
                  <Route path="/trash" element={<Trash />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                </Routes>
              </FullScreenDropzone>
            </main>
          </div>
        </div>
      </FileProvider>
    </ViewModeProvider>
  </BrowserRouter>
);

export default App;
