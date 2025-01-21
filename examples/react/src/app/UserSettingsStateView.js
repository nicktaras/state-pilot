import React from "react";
import useUserSettings from "./../components/hooks/useUserSettings";

function UserSettingsStateView(props) {
  const { darkMode, unsubscribe } = useUserSettings();

  return (
    <div>
      <div className="dark-mode-title">Dark Mode setting is: {darkMode}</div>
      <button
        style={{ marginTop: "20px" }}
        onClick={unsubscribe}
      >
        Unsubscribe from Settings Store Subscription to show status
      </button>
      {props.children}
    </div>
  );
}

export default UserSettingsStateView;
