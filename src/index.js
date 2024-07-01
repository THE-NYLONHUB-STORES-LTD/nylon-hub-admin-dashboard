// src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; // Import your CSS file here

const container = document.getElementById("root");

// Ensure container is not null
if (container) {
  const root = createRoot(container); // createRoot(container!) if you prefer non-null assertion

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root container missing in index.html");
}
