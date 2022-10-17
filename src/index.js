import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import LogRocket from "logrocket";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

LogRocket.init("mqzgbz/my-app");
LogRocket.identify("mqzgbz/my-app", {
  name: "James",
  email: "jamesmorrison@example.com",

  // Add your own custom user variables here, ie:
  subscriptionType: "pro",
});
