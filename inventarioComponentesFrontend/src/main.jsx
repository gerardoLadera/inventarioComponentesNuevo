import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from './contexts/UserContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  </UserProvider>
  
);
