import React from "react";
import "./App.css";
import {StoreProvider} from "./StatePilot/Store";
import Subscribe from "./Subscribe";
import Publish from "./Publish";

function App() {
  return (
    <StoreProvider>
      <Publish />
      <Subscribe />
    </StoreProvider>
  );
}

export default App;
