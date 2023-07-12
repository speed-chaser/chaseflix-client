import { createRoot } from "react-dom/client";

import MainView from "./components/main-view/main-view";

import "./index.scss";

const ChaseflixApplication = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<ChaseflixApplication />);
