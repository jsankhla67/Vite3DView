import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { LoadingProvider } from "./LoadingContextProvider";

createRoot(document.getElementById("root")!).render(
  <LoadingProvider>
    <App />
  </LoadingProvider>
);
