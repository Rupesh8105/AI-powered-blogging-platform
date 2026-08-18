import { useMemo, useState } from "react";

function MyBlogs() {
  const [tab, setTab] = useState("published");
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);

  const published = JSON.parse(
    localStorage.getItem("publishedBlogs") || "[]"
  );

  const drafts = JSON.parse(
    localStorage.getItem("draftBlogs") || "[]"
  );

  const currentBlogs = tab === "published" ? published : drafts;

  const filteredBlogs = useMemo(() => {
    return currentBlogs
      .filter((blog) =>
        (blog.title || "Untitled")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .slice()
      .reverse();
  }, [currentBlogs.length, search, tab, refresh]);

  const deleteBlog = (id) => {
    const key = tab === "published" ? "publishedBlogs" : "draftBlogs";

    const blogs = JSON.parse(localStorage.getItem(key) || "[]");

    const updated = blogs.filter((blog) => blog.id !== id);

    localStorage.setItem(key, JSON.stringify(updated));

    setRefresh((value) => value + 1);
  };

  return (
    <div className="page-shell">
      <div className="page-container">

        <div className="page-header">
          <div>
            <h1>📝 My Blogs</h1>
            <p>Manage your published blogs and drafts.</p>
          </div>
        </div>

        <div className="blog-toolbar">

          <div className="blog-tabs">
            <button
              className={tab === "published" ? "active-tab" : ""}
              onClick={() => setTab("published")}
            >
              Published ({published.length})
            </button>

            <button
              className={tab === "drafts" ? "active-tab" : ""}
              onClick={() => setTab("drafts")}
            >
              Drafts ({drafts.length})
            </button>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            className="blog-search"
          />
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="empty-state">
            <div>📝</div>
            <h2>No blogs found</h2>
            <p>
              {search
                ? "Try a different search."
                : "Create or publish a blog to see it here."}
            </p>
          </div>
        ) : (
          <div className="blogs-list">
            {filteredBlogs.map((blog) => (
              <article className="blog-item" key={blog.id}>
                <div>
                  <h2>{blog.title || "Untitled Blog"}</h2>

                  <p>
                    {blog.date || "Recently created"}
                  </p>

                  <span className="blog-status">
                    {tab === "published" ? "Published" : "Draft"}
                  </span>
                </div>

                <button
                  className="delete-blog"
                  onClick={() => deleteBlog(blog.id)}
                >
                  🗑️ Delete
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
