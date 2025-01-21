import React from "react";
import "./App.css";
import UserSettingsStateView from "./app/UserSettingsStateView";
import BlogStateViewSub from "./app/BlogStateViewSub";
import UserSettingsUIView from "./app/UserSettingsUIView";
import BlogUIView from "./app/BlogUIView";

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
