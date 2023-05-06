import React, {useContext} from "react";
import {StatePilotContext} from "./StatePilot/Store";

function SubscribeTwo() {
  const statePilotContext = useContext(StatePilotContext);
  const darkMode = statePilotContext
    .getStoreState("settingsStore")
    .darkMode.toString();
  console.log("hello");
  return <div>dark Mode setting is: {darkMode}</div>;
}

export default SubscribeTwo;
