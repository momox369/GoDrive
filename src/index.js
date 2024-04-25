import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.withCredentials = true;
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
