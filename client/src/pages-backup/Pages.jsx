function PageLayout({ title, description, children }) {
  return (
    <div style={{
      minHeight: "100vh",
      padding: "40px",
      background: "#f6f7fb",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "16px",
        padding: "30px",
        boxShadow: "0 5px 25px rgba(0,0,0,.06)"
      }}>
        <h1>{title}</h1>
        <p style={{ color: "#667085" }}>{description}</p>
        {children}
      </div>
    </div>
  );
}

export function CreateBlog() {
  return (
    <PageLayout
      title="✍️ Create Blog"
      description="Create and manage your blog content."
    >
      <p>Your Markdown editor is available on the Dashboard.</p>
    </PageLayout>
  );
}

export function MyBlogs() {
  const blogs = JSON.parse(
    localStorage.getItem("publishedBlogs") || "[]"
  );

  return (
    <PageLayout
      title="📝 My Blogs"
      description="View your published blog posts."
    >
      {blogs.length === 0 ? (
        <p>No published blogs yet.</p>
      ) : (
        blogs.slice().reverse().map((blog) => (
          <div
            key={blog.id}
            style={{
              padding: "20px",
              marginTop: "15px",
              border: "1px solid #e5e7eb",
              borderRadius: "12px"
            }}
          >
            <h2>{blog.title}</h2>
            <small>{blog.date}</small>
          </div>
        ))
      )}
    </PageLayout>
  );
}

export function AIAssistant() {
  return (
    <PageLayout
      title="✨ AI Assistant"
      description="AI-powered writing assistance."
    >
      <div style={{
        padding: "20px",
        background: "#f5f3ff",
        borderRadius: "12px"
      }}>
        <h2>AI Content Assistant</h2>
        <p>
          AI suggestions, title ideas and content improvements
          will be available here.
        </p>
      </div>
    </PageLayout>
  );
}

export function SEOAnalyzer() {
  return (
    <PageLayout
      title="🔍 SEO Analyzer"
      description="Analyze and improve your blog SEO."
    >
      <div style={{
        padding: "25px",
        background: "#f8fafc",
        borderRadius: "12px"
      }}>
        <h2>SEO Score</h2>
        <div style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: "#4f46e5"
        }}>
          85/100
        </div>

        <p>✅ Title optimization</p>
        <p>✅ Content readability</p>
        <p>⚠️ Add relevant keywords</p>
        <p>⚠️ Add a meta description</p>
      </div>
    </PageLayout>
  );
}

export function Analytics() {
  return (
    <PageLayout
      title="📊 Analytics"
      description="Track your blog performance."
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "15px"
      }}>
        <div style={{ padding: "20px", background: "#f5f7ff", borderRadius: "12px" }}>
          <h3>Total Views</h3>
          <strong>1,248</strong>
        </div>

        <div style={{ padding: "20px", background: "#f5f7ff", borderRadius: "12px" }}>
          <h3>Published</h3>
          <strong>12</strong>
        </div>

        <div style={{ padding: "20px", background: "#f5f7ff", borderRadius: "12px" }}>
          <h3>Engagement</h3>
          <strong>78%</strong>
        </div>
      </div>
    </PageLayout>
  );
}

export function Subscription() {
  return (
    <PageLayout
      title="💳 Subscription"
      description="Manage your BlogAI subscription."
    >
      <div style={{
        padding: "25px",
        border: "2px solid #4f46e5",
        borderRadius: "15px"
      }}>
        <h2>Pro Plan</h2>
        <h3>₹499 / month</h3>
        <p>AI writing assistance</p>
        <p>SEO optimization</p>
        <p>Advanced analytics</p>
        <button style={{
          padding: "12px 22px",
          border: 0,
          borderRadius: "8px",
          background: "#4f46e5",
          color: "#fff",
          cursor: "pointer"
        }}>
          Upgrade Plan
        </button>
      </div>
    </PageLayout>
  );
}

export function Settings() {
  return (
    <PageLayout
      title="⚙️ Settings"
      description="Manage your BlogAI settings."
    >
      <p>Profile and application settings will appear here.</p>
    </PageLayout>
  );
}
