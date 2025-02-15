import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import "./index.scss";
import App from "./App.jsx";
import Init from "./Init.jsx";
import Toasts from "./components/Toasts.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <Toasts />
        <Init>
          <App />
        </Init>
      </Provider>
    </Router>
  </StrictMode>
);
