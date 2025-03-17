import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn-explore").addEventListener("click", function () {
    window.location.href = "Pages/Explore/search.html?query=all";
  });
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
