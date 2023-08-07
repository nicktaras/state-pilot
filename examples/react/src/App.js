import React from "react";
import "./App.css";
import UserSettingsStateView from "./UserSettingsStateView";
import BlogStateViewSub from "./BlogStateViewSub";
import UserSettingsUIView from "./UserSettingsUIView";
import BlogUIView from "./BlogUIView";

function App() {
  return (
    <UserSettingsStateView>
      <UserSettingsUIView />
      <BlogUIView />
      <BlogStateViewSub />
    </UserSettingsStateView>
  );
}

export default App;
