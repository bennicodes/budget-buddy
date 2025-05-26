import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { initializeFirebase } from "./firebaseConfig.js";
import "./index.css";
import { router } from "./routes/routes.jsx";

initializeFirebase().then(() => {
  createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    // </StrictMode>
  );
});
