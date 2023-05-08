import React, {useState} from "react";
import statePilotSingleton from "./StatePilot/StatePilotInstance";

let unsubscribeUserSettings = null;

function Subscribe(props) {
  const statePilotInstance = statePilotSingleton.instance();

  const [darkMode, setDarkMode] = useState(
    statePilotInstance.getStoreState("settingsStore").darkMode.toString()
  );

  const formatDarkMode = (data) => {
    if (data !== undefined) return data.toString();
  };

  if (unsubscribeUserSettings !== null) unsubscribeUserSettings();

  unsubscribeUserSettings = statePilotInstance.subscribe(
    "settingsStore",
    (data) => {
      if (data.state) {
        setDarkMode(formatDarkMode(data.state.darkMode));
      }
    }
  );

  return (
    <div>
      <div className="dark-mode-title">Dark Mode setting is: {darkMode}</div>
      <button
        style={{marginTop: "20px"}}
        onClick={(e) => {
          unsubscribeUserSettings();
        }}
      >
        Unsuscribe from Settings Store Subcription to show status
      </button>
      {props.children}
    </div>
  );
}

export default Subscribe;
