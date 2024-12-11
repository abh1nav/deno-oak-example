import { useState } from "react";
import ArbitraryElement from "./components/ArbitraryElement.tsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src="/react.svg" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <ArbitraryElement galleryName="My Amazing Gallery" />
      <div className="card">
        <button onClick={() => setCount((count: number) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;