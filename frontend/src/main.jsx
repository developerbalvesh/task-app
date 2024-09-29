import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "animate.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
