import React, {useState} from "react";
import statePilotSingleton from "./StatePilot/StatePilotInstance";

let unsubscribeUserSettings1 = null;
let unsubscribeUserSettings2 = null;

function Subscribe(props) {
  const statePilotInstance = statePilotSingleton.instance();

  const [darkMode, setDarkMode] = useState(
    statePilotInstance.getStoreState("settingsStore")?.darkMode.toString()
  );

  const [blogEntries, setBlogEntries] = useState(
    statePilotInstance.getStoreState("restStore")?.blogPosts
  );

  const formatDarkMode = (data) => {
    if (data !== undefined) return data.toString();
  };

  if (unsubscribeUserSettings1 !== null) unsubscribeUserSettings1();

  unsubscribeUserSettings1 = statePilotInstance.subscribe(
    "settingsStore",
    function (state) {
      if (state.actionName === "TOGGLE_DARK_MODE") {
        setDarkMode(formatDarkMode(state.actionData));
      } else {
        setDarkMode(formatDarkMode(state.data.darkMode));
      }
    }
  );

  if (unsubscribeUserSettings2 !== null) unsubscribeUserSettings2();

  unsubscribeUserSettings2 = statePilotInstance.subscribe(
    "restStore",
    function ({actionData}) {
      setBlogEntries(() => {
        return [actionData.map((item) => item.title)];
      });
    }
  );

  return (
    <div>
      <div className="dark-mode-title">Dark Mode setting is: {darkMode}</div>
      <button
        style={{marginTop: "20px"}}
        onClick={(e) => {
          unsubscribeUserSettings1();
        }}
      >
        Unsuscribe from Settings Store Subcription to show status
      </button>
      <div className="">
        {blogEntries &&
          blogEntries.map((blogTitle, index) => {
            return <div key={index}>{blogTitle}</div>;
          })}
      </div>
      {props.children}
    </div>
  );
}

export default Subscribe;
