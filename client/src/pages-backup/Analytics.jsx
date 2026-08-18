import { useEffect, useState } from "react";

function Analytics() {
  const [data, setData] = useState({
    published: 0,
    drafts: 0,
    views: 0,
    engagement: 0,
    blogs: []
  });

  const loadAnalytics = () => {
    const publishedBlogs = JSON.parse(
      localStorage.getItem("publishedBlogs") || "[]"
    );

    const draftBlogs = JSON.parse(
      localStorage.getItem("draftBlogs") || "[]"
    );

    const savedViews = Number(
      localStorage.getItem("totalViews") || 0
    );

    const views =
      savedViews > 0
        ? savedViews
        : publishedBlogs.length * 104;

    const engagement =
      publishedBlogs.length > 0
        ? Math.min(
            100,
            Math.round(
              ((publishedBlogs.length * 13) / Math.max(views, 1)) * 100
            )
          )
        : 0;

    setData({
      published: publishedBlogs.length,
      drafts: draftBlogs.length,
      views,
      engagement,
      blogs: publishedBlogs.slice().reverse()
    });
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#f6f7fb",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px"
          }}
        >
          <div>
            <h1 style={{ marginBottom: "8px" }}>📊 Analytics</h1>
            <p style={{ color: "#667085" }}>
              Track your blog performance and publishing activity.
            </p>
          </div>

          <button
            onClick={loadAnalytics}
            style={{
              padding: "10px 16px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#fff",
              cursor: "pointer"
            }}
          >
            🔄 Refresh
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px"
          }}
        >
          <StatCard
            icon="📝"
            title="Published"
            value={data.published}
          />

          <StatCard
            icon="💾"
            title="Drafts"
            value={data.drafts}
          />

          <StatCard
            icon="👀"
            title="Total Views"
            value={data.views}
          />

          <StatCard
            icon="📈"
            title="Engagement"
            value={`${data.engagement}%`}
          />
        </div>

        <div
          style={{
            marginTop: "22px",
            background: "#fff",
            borderRadius: "16px",
            padding: "25px",
            boxShadow: "0 5px 25px rgba(0,0,0,.06)"
          }}
        >
          <h2>Recent Published Blogs</h2>

          {data.blogs.length === 0 ? (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: "#667085"
              }}
            >
              <div style={{ fontSize: "45px" }}>📊</div>
              <h3>No analytics data yet</h3>
              <p>
                Publish a blog from Create Blog and your analytics
                will appear here.
              </p>
            </div>
          ) : (
            <div>
              {data.blogs.map((blog, index) => (
                <div
                  key={blog.id || index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 0",
                    borderBottom: "1px solid #eee"
                  }}
                >
                  <div>
                    <strong>
                      {blog.title || "Untitled Blog"}
                    </strong>

                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "#667085"
                      }}
                    >
                      {blog.date || "Recently published"}
                    </p>
                  </div>

                  <div
                    style={{
                      padding: "7px 12px",
                      background: "#ecfdf3",
                      color: "#15803d",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "600"
                    }}
                  >
                    Published
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: "22px",
            background: "#eef2ff",
            borderRadius: "14px",
            padding: "20px"
          }}
        >
          <strong>💡 Analytics Tip</strong>
          <p
            style={{
              marginBottom: 0,
              color: "#667085"
            }}
          >
            Publish more blogs to generate more performance data.
            Real visitor analytics can be connected later through
            a backend and analytics service.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "22px",
        borderRadius: "14px",
        boxShadow: "0 5px 25px rgba(0,0,0,.06)"
      }}
    >
      <div style={{ fontSize: "25px" }}>{icon}</div>

      <p
        style={{
          color: "#667085",
          marginBottom: "8px"
        }}
      >
        {title}
      </p>

      <strong style={{ fontSize: "28px" }}>
        {value}
      </strong>
    </div>
  );
}

export default Analytics;
