import React from "react";
import useBlogEntries from './../components/hooks/useBlogEntries';
import BlogStateView from "./BlogStateView";

function BlogStateViewSub() {
  const blogEntries = useBlogEntries();

  return <BlogStateView blogEntries={blogEntries} />;
}

export default BlogStateViewSub;
