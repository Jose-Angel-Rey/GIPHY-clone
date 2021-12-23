import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Router DOM
import { BrowserRouter } from "react-router-dom";

// Redux
import store from "./redux/store";
import { Provider } from "react-redux";

// Axios for API calls
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:4000";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
