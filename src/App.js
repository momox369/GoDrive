import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home";

const App = () => (
  <BrowserRouter>
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1 p-3">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Define more routes as needed */}
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);

export default App;
