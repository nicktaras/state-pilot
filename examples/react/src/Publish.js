import React, {useState, useEffect} from "react";

import statePilotSingleton from "./StatePilot/StatePilotInstance";

function Publish() {
  const statePilotInstance = statePilotSingleton.instance();

  function toggleSettings() {
    const nextState = statePilotSingleton
      .instance()
      .getStoreState("settingsStore")
      ? statePilotInstance.getStoreState("settingsStore").darkMode
      : false;
    statePilotInstance.triggerAction.TOGGLE_DARK_MODE(nextState);
  }

  function previousSettings() {
    statePilotInstance.applyPreviousState("settingsStore");
  }

  return (
    <div>
      {statePilotSingleton && (
        <div>
          <button
            onClick={(e) => {
              toggleSettings();
            }}
          >
            Toggle Dark Mode
          </button>
          <button
            onClick={(e) => {
              previousSettings();
            }}
          >
            Undo Dark Mode Step
          </button>
        </div>
      )}
    </div>
  );
}

export default Publish;
