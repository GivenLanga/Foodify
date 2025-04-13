import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import App from "./App";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn-explore").addEventListener("click", function () {
    window.location.href = "Pages/Explore/search.html?query=all";
  });
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
