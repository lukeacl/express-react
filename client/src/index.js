import { createRoot } from "react-dom/client";

import App from "./app";

const container = document.getElementById("root");

if (!container.root) {
  container.root = createRoot(container);
}

container.root.render(<App />);

if (module.hot) {
  module.hot.accept();
}
