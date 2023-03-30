import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AlertTemplate from "react-alert-template-basic";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import store from "./store";
import { ChakraProvider } from '@chakra-ui/react'
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  transition: transitions.SCALE,
};
root.render(
  <Provider store={store}>

      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>

            <App />

        </AlertProvider>
      </BrowserRouter>

  </Provider>
);
