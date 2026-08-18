import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(
    "# Welcome to BlogAI\n\nStart writing your blog here..."
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedTitle = localStorage.getItem("blog_title");
    const savedContent = localStorage.getItem("blog_content");

    if (savedTitle) {
      setTitle(savedTitle);
    }

    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const saveDraft = () => {
    localStorage.setItem("blog_title", title);
    localStorage.setItem("blog_content", content);

    setMessage("✅ Draft saved successfully!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const publishBlog = () => {
    if (!title.trim()) {
      setMessage("⚠️ Please enter a blog title first.");
      return;
    }

    const blogs = JSON.parse(
      localStorage.getItem("publishedBlogs") || "[]"
    );

    blogs.push({
      id: Date.now(),
      title: title,
      content: content,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("publishedBlogs", JSON.stringify(blogs));

    setMessage("🚀 Blog published successfully!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="app">

      <aside className="sidebar">
        <div className="logo">✦ BlogAI</div>

        <div className="menu">
          <button className="active" type="button">
            📊 Dashboard
          </button>

          <button type="button">✍️ Create Blog</button>
          <button type="button">📝 My Blogs</button>
          <button type="button">✨ AI Assistant</button>
          <button type="button">🔍 SEO Analyzer</button>
          <button type="button">📈 Analytics</button>
          <button type="button">💳 Subscription</button>
        </div>

        <div className="bottom-menu">
          <button type="button">⚙️ Settings</button>
          <button type="button">🚪 Logout</button>
        </div>
      </aside>

      <main className="main">

        <header className="header">
          <div>
            <h1>Create New Blog</h1>
            <p>
              Write, optimize and publish your content with AI.
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
                <ReactMarkdown>
                  {content}
                </ReactMarkdown>
              </article>
            </div>

          </div>

          <div className="footer">

            <span>
              {content.length} characters
            </span>

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

      </main>
    </div>
  );
}

export default App;

