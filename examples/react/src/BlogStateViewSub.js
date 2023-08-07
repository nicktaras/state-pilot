import React, {useState} from "react";
import statePilotSingleton from "./StatePilot/StatePilotInstance";
import BlogStateView from "./BlogStateView";

let unsubscribe = null;

function BlogStateViewSub() {
  const statePilotInstance = statePilotSingleton.instance();

  const [blogEntries, setBlogEntries] = useState(
    statePilotInstance.getStoreState("blogStore")?.blogPosts
  );

  if (unsubscribe !== null) unsubscribe();

  unsubscribe = statePilotInstance.subscribe("blogStore", ({actionData}) =>
    setBlogEntries([...actionData])
  );

  return <BlogStateView blogEntries={blogEntries} />;
}

export default BlogStateViewSub;
