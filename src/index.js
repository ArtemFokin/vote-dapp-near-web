import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import NearProvider from "./components/NearProvider/NearProvider";
import nearConfig from "./nearConfig";
import "antd/dist/antd.css";

ReactDOM.render(
  <React.StrictMode>
    <NearProvider config={nearConfig}>
      <App />
    </NearProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
