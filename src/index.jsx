import { createRoot } from "react-dom/client";

import "./index.scss";

const ChaseflixApplication = () => {
  return (
    <div className="chaseflix">
      <div>Hello</div>
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<ChaseflixApplication />);
