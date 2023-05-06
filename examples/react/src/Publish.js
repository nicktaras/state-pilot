import React from "react";
import {StatePilotContext} from "./StatePilot/Store";

function Publish() {
  const statePilotContext = React.useContext(StatePilotContext);
  function toggleSettings() {
    const nextState = statePilotContext.getStoreState("settingsStore")
      ? statePilotContext.getStoreState("settingsStore").darkMode
      : false;
    statePilotContext.triggerAction.TOGGLE_DARK_MODE(nextState);
  }
  function previousSettings() {
    statePilotContext.applyPreviousState("settingsStore");
  }
  return (
    <p>
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
    </p>
  );
}

export default Publish;
