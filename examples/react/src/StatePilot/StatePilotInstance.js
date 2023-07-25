import {StatePilot} from "./../dist/index";
import SettingsStore from "./SetttingsStore";
import RestStore from "./RestStore";

const StatePilotSingleton = (function () {
  let instance;

  class StatePilotSingleton {
    constructor() {
      if (!instance) {
        instance = this;
        instance.statePilot = new StatePilot();
        SettingsStore.initialise(instance.statePilot);
        RestStore.initialise(instance.statePilot);
      }
      return instance;
    }
    instance() {
      window.statePilotSingleton = instance.statePilot;
      return instance.statePilot;
    }
  }
  return StatePilotSingleton;
})();

export default new StatePilotSingleton();
