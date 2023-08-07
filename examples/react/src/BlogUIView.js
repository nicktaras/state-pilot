// import the trigger actions from stores
import {
  createBlogEntry,
  updateBlogEntry,
  deleteBlogEntry,
  readBlogEntries
} from "./StatePilot/BlogStore";

function BlogUIView() {
  return (
    <div>
      <p style={{padding: "0 10px"}}>Blog Entry</p>
      <button
        onClick={(e) => {
          createBlogEntry();
        }}
      >
        Add Blog Entry
      </button>
      <button
        onClick={(e) => {
          readBlogEntries();
        }}
      >
        Read Blog Entry
      </button>
      <button
        onClick={(e) => {
          updateBlogEntry();
        }}
      >
        Update Blog Entry
      </button>
      <button
        onClick={(e) => {
          deleteBlogEntry();
        }}
      >
        Delete Blog Entry
      </button>
    </div>
  );
}

export default BlogUIView;
