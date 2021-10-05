import ReactDOM from "react-dom";
import { ErrorBoundary } from "./ErrorBoundary/ErrorBoundary";
import { App } from "./App";

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
