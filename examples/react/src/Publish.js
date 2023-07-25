// import the trigger actions from stores
import {toggleSettings, previousSettings} from "./StatePilot/SetttingsStore";
import {
  createBlogEntry,
  updateBlogEntry,
  deleteBlogEntry,
  readBlogEntries
} from "./StatePilot/RestStore";

function Publish() {
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
    </div>
  );
}

export default Publish;
