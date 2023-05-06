import React, {createContext, useState} from "react";
import {StatePilot} from "./../dist/index";
import SettingsStore from "./SetttingsStore";

const StatePilotContext = createContext(undefined);
const StatePilotDispatchContext = createContext(undefined);

function StoreProvider({children}) {
  const statePilot = new StatePilot();
  // Set up stores and actions
  SettingsStore.initialise(statePilot);
  const [_statePilot, _setStatePilot] = useState(statePilot);
  return (
    <StatePilotContext.Provider value={_statePilot}>
      <StatePilotDispatchContext.Provider value={_setStatePilot}>
        {children}
      </StatePilotDispatchContext.Provider>
    </StatePilotContext.Provider>
  );
}

export {StoreProvider, StatePilotContext, StatePilotDispatchContext};
