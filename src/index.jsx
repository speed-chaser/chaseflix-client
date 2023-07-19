import "./index.scss";
import Container from "react-bootstrap/Container";

import { createRoot } from "react-dom/client";

import { MainView } from "./components/main-view/main-view";

const ChaseflixApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<ChaseflixApplication />);
