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
    // This is cleaner :)
    // statePilot.createActions([
    // {
    //   actionName: "TOGGLE_DARK_MODE",
    //   actionFunction: function (s) {
    //     return !s;
    //   },
    //   store: "settingsStore",
    //   value: "darkMode",
    // },
    // {
    //   actionName: "TOGGLE_DARK_MODE",
    //   actionFunction: function (s) {
    //     return !s;
    //   },
    //   store: "settingsStore",
    //   value: "darkMode",
    // },
    // {
    //   actionName: "TOGGLE_DARK_MODE",
    //   actionFunction: function (s) {
    //     return !s;
    //   },
    //   store: "settingsStore",
    //   value: "darkMode",
    // },
    // ]);
  }
};

export default settingsStore;
