import {StatePilot} from "./../dist/index";
import SettingsStore from "./SetttingsStore";

const StatePilotSingleton = (function () {
  let instance;

  class StatePilotSingleton {
    constructor() {
      if (!instance) {
        instance = this;
        instance.statePilot = new StatePilot();
        SettingsStore.initialise(instance.statePilot);
      }
      return instance;
    }
    instance() {
      return instance.statePilot;
    }
  }
  return StatePilotSingleton;
})();

export default new StatePilotSingleton();
