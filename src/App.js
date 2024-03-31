import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css"
/>;
const App = () => (
  <BrowserRouter>
    <div className="d-flex" style={{ backgroundColor: " rgb(249, 251, 255)" }}>
      <Sidebar />
      <main className="flex-grow-1 p-3">
        <Routes>
          <Route path="/home" element={<Home />} />

    
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);

export default App;
