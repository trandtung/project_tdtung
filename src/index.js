import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GlobalStyle from "./component/GlobalStyle";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import React from "react";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { persist, store } from "./stores";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      <BrowserRouter>
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
