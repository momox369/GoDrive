import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import TopNavigationBar from "./components/TopBar/TopNavigationBar";
import Shared from "./pages/Shared/Shared";
import Starred from "./pages/Starred/Starred";
import Trash from "./pages/Trash/Trash";
import Drive from "./pages/Drive/Drive";

const App = () => (
  <BrowserRouter>
    <div
      style={{
        backgroundColor: "rgb(249, 251, 255)",
        paddingTop: "0.5em",
        height: "100vh", // Keeps the app filling the entire viewport height
        display: "flex",
        flexDirection: "column", // Stacks the navbar and content area vertically
      }}
    >
      <div className="d-flex" style={{ flexGrow: 1, overflow: "hidden" }}>
        <Sidebar style={{ width: "250px", flexShrink: 0, overflowY: "auto" }} />
        <main
          style={{
            flexGrow: 1,
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
  </BrowserRouter>
);

export default App;
