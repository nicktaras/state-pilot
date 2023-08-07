function BlogStateView({blogEntries}) {
  return (
    <div>
      <div className="">
        {blogEntries &&
          blogEntries.map((item, index) => {
            return (
              <div className="blog-entry" key={index}>
                <p>{item.title}</p>
                <p>{item.description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default BlogStateView;
