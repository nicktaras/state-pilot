const settingsStore = {
  initialise: (statePilot) => {
    statePilot.createStore(
      "settingsStore",
      {darkMode: true, accountName: "state-pilot"},
      true
    );
    // If a single action is to be defined, the following code can be used.
    // statePilot.createAction(
    //   "TOGGLE_DARK_MODE",
    //   "settingsStore",
    //   "darkMode",
    //   function (s) {
    //     return !s;
    //   }
    // );
    // if multiple actions are to be defined, the following code can be used.
    statePilot.createActions([
      {
        name: "TOGGLE_DARK_MODE",
        fn: function (s) {
          return !s;
        },
        store: "settingsStore",
        subStoreKey: "darkMode"
      }
    ]);
  }
};

export default settingsStore;
