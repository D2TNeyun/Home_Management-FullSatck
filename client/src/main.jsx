import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalStyles from "./Components/GlobalStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/Store/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./Components/Loading/Loading.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalStyles>
    <Provider store={store}>
      {/* <App /> */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </GlobalStyles>
);
