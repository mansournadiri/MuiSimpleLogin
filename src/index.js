import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/baseClass.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SwDev from "./SWDev";

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} future={{ v7_startTransition: true }} />
);

SwDev();
