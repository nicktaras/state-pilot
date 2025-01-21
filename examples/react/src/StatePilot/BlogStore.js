let statePilot = null;

const blogStore = {
  initialise: (statePilotInstance) => {
    statePilot = statePilotInstance;
    statePilot.createStore(
      "blogStore",
      {
        blogPosts: [
          /*
            title: '',
            content: ''
          */
        ]
      },
      false
    );
    statePilot.createStoreActions([
      {
        name: "CREATE_BLOG_POST",
        fn: function (post) {
          let blogArr = statePilot.getStoreState("blogStore").blogPosts;
          blogArr.push(post);
          return blogArr;
        },
        store: "blogStore",
        subStoreKey: "blogPosts"
      },
      {
        name: "READ_BLOG_POSTS",
        fn: function () {
          return statePilot.getStoreState("blogStore").blogPosts || [];
        },
        store: "blogStore",
        subStoreKey: "blogPosts"
      },
      {
        name: "UPDATE_BLOG_POST",
        fn: function (params) {
          const {index, data} = params;
          let blogArr = statePilot.getStoreState("blogStore").blogPosts;
          blogArr[index] = data;
          return blogArr;
        },
        store: "blogStore",
        subStoreKey: "blogPosts"
      },
      {
        name: "DELETE_BLOG_POST",
        fn: function (postIndex) {
          let blogArr = statePilot.getStoreState("blogStore").blogPosts;
          blogArr.splice(postIndex, 1);
          return blogArr;
        },
        store: "blogStore",
        subStoreKey: "blogPosts"
      }
    ]);
  }
};

export function createBlogEntry() {
  return statePilot.triggerStoreAction.CREATE_BLOG_POST({
    title: "new blog entry",
    description: "new blog entry description"
  });
}

export function readBlogEntries() {
  return statePilot.triggerStoreAction.READ_BLOG_POSTS();
}

export function updateBlogEntry() {
  const l = statePilot.getStoreState("blogStore")?.blogPosts.length;
  return statePilot.triggerStoreAction.UPDATE_BLOG_POST({
    index: l - 1,
    data: {
      title: "new blog entry updated",
      description: "new blog entry description updated"
    }
  });
}

export function deleteBlogEntry() {
  return statePilot.triggerStoreAction.DELETE_BLOG_POST(0);
}

export default blogStore;
