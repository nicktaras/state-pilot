import { useState, useEffect } from "react";
import statePilotSingleton from "../../statepilot/StatePilotInstance";

function useUserSettings() {
  const [darkMode, setDarkMode] = useState(
    statePilotSingleton.instance().getStoreState("settingsStore")?.darkMode.toString()
  );

  const formatDarkMode = (data) => {
    if (data !== undefined) return data.toString();
  };

  useEffect(() => {
    const statePilotInstance = statePilotSingleton.instance();
    const unsubscribe = statePilotInstance.subscribe("settingsStore", function (state) {
      if (state.actionName === "TOGGLE_DARK_MODE") {
        setDarkMode(formatDarkMode(state.actionData));
      } else {
        setDarkMode(formatDarkMode(state.data.darkMode));
      }
    });


    return () => {
      unsubscribe();
    };
  }, []);

  return { darkMode, unsubscribe: () => setDarkMode(null) };
}

export default useUserSettings;
