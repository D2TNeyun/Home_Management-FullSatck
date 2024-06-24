import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalStyles from "./Components/GlobalStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css"
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "../src/Redux/Store/store.js";
import HomePage from "./Components/Home/Homepage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalStyles>
    <Provider store={store}>
      <App />
    </Provider>
  </GlobalStyles>
);
