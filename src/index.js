import ReactDOM from "react-dom";
import { ErrorBoundary } from "./ErrorBoundary/ErrorBoundary";
import { MyWeatherComponentWithFetch } from "./MyWeatherComponent";

ReactDOM.render(
  <ErrorBoundary>
    <MyWeatherComponentWithFetch />
  </ErrorBoundary>,
  document.getElementById("root")
);
