import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApplicationBoundary } from "./components/ApplicationBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApplicationBoundary><App /></ApplicationBoundary>
  </StrictMode>
);
