import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* BrowserRouter的作用是可以让你使用router跳转页面 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
