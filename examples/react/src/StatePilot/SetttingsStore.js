const settingsStore = {
  initialise: (statePilot) => {
    statePilot.createStore(
      "settingsStore",
      {darkMode: true, accountName: "state-pilot"},
      true
    );
    statePilot.createAction(
      "TOGGLE_DARK_MODE",
      "settingsStore",
      "darkMode",
      function (s) {
        return !s;
      }
    );
  }
};

export default settingsStore;
