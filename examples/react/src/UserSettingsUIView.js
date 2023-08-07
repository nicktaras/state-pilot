// import the trigger actions from stores
import {toggleSettings, previousSettings} from "./StatePilot/SetttingsStore";

function UserSettingsUIView() {
  return (
    <div>
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
    </div>
  );
}

export default UserSettingsUIView;
