let statePilot = null;

const restStore = {
  initialise: (statePilotInstance) => {
    statePilot = statePilotInstance;
    statePilot.createStore(
      "restStore",
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
          let blogArr = statePilot.getStoreState("restStore").blogPosts;
          blogArr.push(post);
          return blogArr;
        },
        store: "restStore",
        subStoreKey: "blogPosts"
      },
      {
        name: "READ_BLOG_POSTS",
        fn: function () {
          return statePilot.getStoreState("restStore").blogPosts || [];
        },
        store: "restStore",
        subStoreKey: "blogPosts"
      },
      {
        name: "UPDATE_BLOG_POST",
        fn: function (params) {
          const {index, data} = params;
          let blogArr = statePilot.getStoreState("restStore").blogPosts;
          blogArr[index] = data;
          return blogArr;
        },
        store: "restStore",
        subStoreKey: "blogPosts"
      },
      {
        name: "DELETE_BLOG_POST",
        fn: function (postIndex) {
          let blogArr = statePilot.getStoreState("restStore").blogPosts;
          blogArr.splice(postIndex, 1);
          return blogArr;
        },
        store: "restStore",
        subStoreKey: "blogPosts"
      }
    ]);
  }
};

export function createBlogEntry() {
  statePilot.triggerStoreAction.CREATE_BLOG_POST({
    title: "new blog entry",
    description: "new blog entry description"
  });
}

export function readBlogEntries() {
  statePilot.triggerStoreAction.READ_BLOG_POSTS();
}

export function updateBlogEntry() {
  const l = statePilot.getStoreState("restStore")?.blogPosts.length;
  statePilot.triggerStoreAction.UPDATE_BLOG_POST({
    index: l - 1,
    data: {
      title: "new blog entry updated",
      description: "new blog entry description updated"
    }
  });
}

export function deleteBlogEntry() {
  statePilot.triggerStoreAction.DELETE_BLOG_POST(0);
}

export default restStore;
