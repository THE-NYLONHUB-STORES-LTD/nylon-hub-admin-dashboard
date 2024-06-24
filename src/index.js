// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"; // Import your CSS file here


ReactDOM.render(
  <BrowserRouter>

    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
