import { useState } from "react";

import "./css/app.css";

const App = () => {
  const [thing, setThing] = useState("nothing loaded yet :(");

  const load = async () => {
    const response = await fetch("/info");
    const json = await response.json();
    setThing(JSON.stringify(json));
  };

  return (
    <>
      <h1 className="text-primary text-4xl font-bold text-blue-500">
        Hello, World!
      </h1>
      <p className="test">{thing}</p>
      <p>{process.env.PUBLIC_SECRET}</p>
      <button className="button" onClick={load}>
        Click Me!
      </button>
    </>
  );
};

export default App;
