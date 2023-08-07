import React, {useState} from "react";
import statePilotSingleton from "./StatePilot/StatePilotInstance";

let unsubscribeUserSettings1 = null;

function UserSettingsStateView(props) {
  const statePilotInstance = statePilotSingleton.instance();

  const [darkMode, setDarkMode] = useState(
    statePilotInstance.getStoreState("settingsStore")?.darkMode.toString()
  );

  const formatDarkMode = (data) => {
    if (data !== undefined) return data.toString();
  };

  // this is really ugly. Meaning the React developer must keep track of
  // their subscriptions or reset them like so each time.
  console.log("un sub user settings view");

  if (unsubscribeUserSettings1 !== null) unsubscribeUserSettings1();

  unsubscribeUserSettings1 = statePilotInstance.subscribe(
    "settingsStore",
    function (state) {
      if (state.actionName === "TOGGLE_DARK_MODE") {
        setDarkMode(formatDarkMode(state.actionData));
      } else {
        setDarkMode(formatDarkMode(state.data.darkMode));
      }
    }
  );

  return (
    <div>
      <div className="dark-mode-title">Dark Mode setting is: {darkMode}</div>
      <button
        style={{marginTop: "20px"}}
        onClick={(e) => {
          unsubscribeUserSettings1();
        }}
      >
        Unsuscribe from Settings Store Subcription to show status
      </button>
      {props.children}
    </div>
  );
}

export default UserSettingsStateView;
