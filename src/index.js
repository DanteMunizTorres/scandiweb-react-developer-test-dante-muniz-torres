import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

reportWebVitals();
