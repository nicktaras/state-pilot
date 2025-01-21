import {toggleSettings, previousSettings} from "../statepilot/SetttingsStore";

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
