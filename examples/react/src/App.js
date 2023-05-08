import React from "react";
import "./App.css";
import Subscribe from "./Subscribe";
import Publish from "./Publish";

function App() {
  return (
    <Subscribe>
      <Publish />
    </Subscribe>
  );
}

export default App;
