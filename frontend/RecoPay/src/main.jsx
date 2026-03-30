import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoanProvider } from "./context/LoanContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoanProvider>
      <App />
    </LoanProvider>
  </BrowserRouter>
);