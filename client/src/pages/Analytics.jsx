import { useNavigate } from "react-router-dom";

function Analytics() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear(); window.location.href = "/";
  };

  return (
    <div style={{
      minHeight: "100vh",
      padding: "40px",
      background: "#f6f7fb",
      fontFamily: "Arial"
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto"
      }}>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}>
          <div>
            <h1>📊 Analytics</h1>
            <p style={{color:"#667085"}}>
              Track your blog performance.
            </p>
          </div>

          <button
            onClick={logout}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#dc2626",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            🚪 Logout
          </button>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px"
        }}>

          <div style={cardStyle}>
            <div style={{fontSize:"28px"}}>📝</div>
            <p>Published Blogs</p>
            <h2>
              {JSON.parse(
                localStorage.getItem("publishedBlogs") || "[]"
              ).length}
            </h2>
          </div>

          <div style={cardStyle}>
            <div style={{fontSize:"28px"}}>💾</div>
            <p>Drafts</p>
            <h2>
              {JSON.parse(
                localStorage.getItem("draftBlogs") || "[]"
              ).length}
            </h2>
          </div>

          <div style={cardStyle}>
            <div style={{fontSize:"28px"}}>👀</div>
            <p>Total Views</p>
            <h2>
              {localStorage.getItem("totalViews") || "0"}
            </h2>
          </div>

          <div style={cardStyle}>
            <div style={{fontSize:"28px"}}>📈</div>
            <p>Engagement</p>
            <h2>0%</h2>
          </div>

        </div>

        <div style={{
          marginTop: "25px",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 5px 25px rgba(0,0,0,.06)"
        }}>
          <h2>Blog Performance</h2>

          <p style={{color:"#667085"}}>
            Your blog analytics will appear here as you publish
            and track more content.
          </p>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "22px",
  borderRadius: "14px",
  boxShadow: "0 5px 25px rgba(0,0,0,.06)"
};

export default Analytics;

