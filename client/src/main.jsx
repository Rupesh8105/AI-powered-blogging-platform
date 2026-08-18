import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouterApp from "./RouterApp";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <RouterApp />
  </StrictMode>
);
