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

const App = () => (
  <BrowserRouter>
    <ViewModeProvider>
      <div
        style={{
          backgroundColor: "#f7fafd",
          paddingTop: "0.5em",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="d-flex" style={{ overflow: "hidden" }}>
          <Sidebar style={{ flexShrink: 0, overflowY: "auto" }} />

          <main
            style={{
              flex: 4,
              overflowY: "auto",
              marginRight: "1.3em",
            }}
          >
            <TopNavigationBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/drive" element={<Drive />} />
              <Route path="/shared" element={<Shared />} />
              <Route path="/starred" element={<Starred />} />
              <Route path="/trash" element={<Trash />} />
            </Routes>
          </main>
        </div>
      </div>
    </ViewModeProvider>
  </BrowserRouter>
);

export default App;
