// import the trigger actions from stores
import {
  createBlogEntry,
  updateBlogEntry,
  deleteBlogEntry,
  readBlogEntries
} from "../statepilot/BlogStore";

function BlogUIView() {
  return (
    <div>
      <p style={{padding: "0 10px"}}>Blog Entry</p>
      <button
        onClick={(e) => {
          console.log(createBlogEntry());
        }}
      >
        Create Blog Entry
      </button>
      <button
        onClick={(e) => {
          console.log(readBlogEntries());
        }}
      >
        Read Blog Entry
      </button>
      <button
        onClick={(e) => {
          console.log(updateBlogEntry())
        }}
      >
        Update Blog Entry
      </button>
      <button
        onClick={(e) => {
          // FIX should return deleted entry
          console.log(deleteBlogEntry())
        }}
      >
        Delete Blog Entry
      </button>
    </div>
  );
}

export default BlogUIView;
