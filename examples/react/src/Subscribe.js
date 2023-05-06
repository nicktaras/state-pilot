import React, {useState, useContext} from "react";
import {StatePilotContext} from "./StatePilot/Store";

let unsubscribeUserSettings = null;

function Subscribe() {
  const statePilotContext = useContext(StatePilotContext);
  const [darkMode, setDarkMode] = useState(undefined);

  const formatDarkMode = (data) => {
    if (data !== undefined) return data.toString();
  };

  if (unsubscribeUserSettings !== null) unsubscribeUserSettings();

  unsubscribeUserSettings = statePilotContext.subscribe(
    "settingsStore",
    (data) => {
      if (data.state) {
        setDarkMode(formatDarkMode(data.state.darkMode));
      }
    }
  );

  if (darkMode === undefined)
    setDarkMode(
      formatDarkMode(statePilotContext.getStoreState("settingsStore").darkMode)
    );

  return (
    <div>
      <div>dark Mode setting is: {darkMode}</div>
      <button
        style={{marginTop: "20px"}}
        onClick={(e) => {
          unsubscribeUserSettings();
        }}
      >
        Unsuscribe from Settings Store Subcription to show status
      </button>
    </div>
  );
}

export default Subscribe;
