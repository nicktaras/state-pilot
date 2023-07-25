let statePilot = null;

const settingsStore = {
  initialise: (statePilotInstance) => {
    statePilot = statePilotInstance;
    statePilot.createStore(
      "settingsStore",
      {darkMode: true, accountName: "state-pilot-user-123"},
      true
    );
    statePilot.createStoreActions([
      {
        name: "TOGGLE_DARK_MODE",
        fn: function () {
          const nextState = statePilot.getStoreState("settingsStore")
            ? statePilot.getStoreState("settingsStore").darkMode
            : false;
          return !nextState;
        },
        store: "settingsStore",
        subStoreKey: "darkMode"
      }
    ]);
  }
};

export function toggleSettings() {
  statePilot.triggerStoreAction.TOGGLE_DARK_MODE();
}

export function previousSettings() {
  statePilot.applyPreviousState("settingsStore");
}

export default settingsStore;
