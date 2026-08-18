import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(
    "# Welcome to BlogAI\n\nStart writing your blog here..."
  );
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const savedTitle = localStorage.getItem("blog_title");
    const savedContent = localStorage.getItem("blog_content");
    const savedBlogs = JSON.parse(
      localStorage.getItem("publishedBlogs") || "[]"
    );

    if (savedTitle) setTitle(savedTitle);
    if (savedContent) setContent(savedContent);

    setBlogs(savedBlogs);
  }, []);

  const saveDraft = () => {
    localStorage.setItem("blog_title", title);
    localStorage.setItem("blog_content", content);

    setMessage("Draft saved successfully!");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const publishBlog = () => {
    if (!title.trim()) {
      setMessage("Please enter a blog title.");
      return;
    }

    const oldBlogs = JSON.parse(
      localStorage.getItem("publishedBlogs") || "[]"
    );

    const newBlog = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleString(),
    };

    const updatedBlogs = [...oldBlogs, newBlog];

    localStorage.setItem(
      "publishedBlogs",
      JSON.stringify(updatedBlogs)
    );

    setBlogs(updatedBlogs);
    setMessage("Blog published successfully!");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const openCreateBlog = () => {
    setPage("dashboard");
    setMessage("");
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">✦ BlogAI</div>

        <div className="menu">
          <button
            type="button"
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            📊 Dashboard
          </button>

          <Link
            type="button"
            onClick={openCreateBlog}
           to="/create">✍️ Create Blog</Link>

          <button
            type="button"
            className={page === "blogs" ? "active" : ""}
            onClick={() => setPage("blogs")}
          >
            📝 My Blogs
          </button>

          <Link type="button" to="/ai">✨ AI Assistant</Link>
          <Link type="button" to="/seo">🔍 SEO Analyzer</Link>
          <button type="button">📈 Analytics</button>
          <Link type="button" to="/subscription">💳 Subscription</Link>
        </div>

        <div className="bottom-menu">
          <Link type="button" to="/settings">⚙️ Settings</Link>
          <button type="button">🚪 Logout</button>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <h1>
              {page === "blogs" ? "My Blogs" : "Create New Blog"}
            </h1>

            <p>
              {page === "blogs"
                ? "Manage your published blog posts."
                : "Write, optimize and publish your content with AI."}
            </p>
          </div>

          <div className="user">
            <div className="avatar">A</div>
            <span>Abhishek</span>
          </div>
        </header>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        {page === "dashboard" ? (
          <section className="card">
            <input
              className="title"
              type="text"
              placeholder="Enter your blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="toolbar">
              <button type="button">H1</button>
              <button type="button">H2</button>
              <button type="button">B</button>
              <button type="button">I</button>
              <button type="button">🔗</button>
              <button type="button">• List</button>

              <div className="space"></div>

              <button type="button" className="ai">
                ✨ AI Suggestions
              </button>

              <button type="button" className="seo">
                🔍 SEO Check
              </button>
            </div>

            <div className="workspace">
              <div className="editor-side">
                <div className="panel-title">
                  Markdown Editor
                </div>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog using Markdown..."
                />
              </div>

              <div className="preview-side">
                <div className="panel-title">
                  Live Preview
                </div>

                <article>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </article>
              </div>
            </div>

            <div className="footer">
              <span>{content.length} characters</span>

              <div className="footer-actions">
                <button
                  type="button"
                  className="draft"
                  onClick={saveDraft}
                >
                  💾 Save Draft
                </button>

                <button
                  type="button"
                  className="publish"
                  onClick={publishBlog}
                >
                  🚀 Publish Blog
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="blogs-page">
            <div className="blogs-header">
              <div>
                <h2>Your Published Blogs</h2>
                <p>{blogs.length} blog(s) published</p>
              </div>

              <button
                type="button"
                className="new-blog"
                onClick={openCreateBlog}
              >
                + New Blog
              </button>
            </div>

            {blogs.length === 0 ? (
              <div className="empty-blogs">
                <div className="empty-icon">📝</div>
                <h2>No blogs yet</h2>
                <p>
                  Publish your first blog and it will appear here.
                </p>

                <button
                  type="button"
                  className="publish"
                  onClick={openCreateBlog}
                >
                  Create Your First Blog
                </button>
              </div>
            ) : (
              <div className="blog-grid">
                {blogs
                  .slice()
                  .reverse()
                  .map((blog) => (
                    <article className="blog-item" key={blog.id}>
                      <div className="blog-item-top">
                        <span>Published</span>
                        <small>{blog.date}</small>
                      </div>

                      <h2>{blog.title}</h2>

                      <div className="blog-content">
                        <ReactMarkdown>
                          {blog.content}
                        </ReactMarkdown>
                      </div>
                    </article>
                  ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

