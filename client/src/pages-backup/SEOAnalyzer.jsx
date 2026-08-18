import { useState } from "react";

function SEOAnalyzer() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keyword, setKeyword] = useState("");
  const [meta, setMeta] = useState("");
  const [result, setResult] = useState(null);

  const analyzeSEO = () => {
    const text = content.trim();
    const words = text ? text.split(/\s+/).length : 0;
    const titleLength = title.trim().length;
    const metaLength = meta.trim().length;

    const keywordLower = keyword.trim().toLowerCase();
    const titleHasKeyword =
      keywordLower && title.toLowerCase().includes(keywordLower);
    const contentHasKeyword =
      keywordLower && text.toLowerCase().includes(keywordLower);

    const checks = [
      {
        name: "Title Length",
        good: titleLength >= 30 && titleLength <= 65,
        message:
          titleLength >= 30 && titleLength <= 65
            ? "Title length is good."
            : "Keep your title between 30 and 65 characters."
      },
      {
        name: "Content Length",
        good: words >= 300,
        message:
          words >= 300
            ? `${words} words found. Good content length.`
            : `Only ${words} words found. Try to reach at least 300 words.`
      },
      {
        name: "Keyword in Title",
        good: Boolean(titleHasKeyword),
        message: titleHasKeyword
          ? "Target keyword is present in the title."
          : "Add your target keyword to the title."
      },
      {
        name: "Keyword in Content",
        good: Boolean(contentHasKeyword),
        message: contentHasKeyword
          ? "Target keyword appears in the content."
          : "Use the target keyword naturally in your content."
      },
      {
        name: "Headings",
        good: /(^|\n)#{1,3}\s/.test(text),
        message: /(^|\n)#{1,3}\s/.test(text)
          ? "Headings detected."
          : "Add H2/H3 headings to structure your article."
      },
      {
        name: "Meta Description",
        good: metaLength >= 120 && metaLength <= 160,
        message:
          metaLength >= 120 && metaLength <= 160
            ? "Meta description length is good."
            : "Keep your meta description between 120 and 160 characters."
      }
    ];

    const passed = checks.filter((item) => item.good).length;
    const score = Math.round((passed / checks.length) * 100);

    setResult({
      score,
      words,
      checks
    });
  };

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
        <h1>🔍 SEO Analyzer</h1>
        <p style={{ color: "#667085" }}>
          Analyze your blog content and improve its search-engine optimization.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "25px"
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 5px 25px rgba(0,0,0,.06)"
            }}
          >
            <h2>Blog Details</h2>

            <label>Blog Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              style={inputStyle}
            />

            <label>Target Keyword</label>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Example: artificial intelligence"
              style={inputStyle}
            />

            <label>Meta Description</label>
            <textarea
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              placeholder="Write your meta description..."
              rows="4"
              style={inputStyle}
            />

            <label>Blog Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"Write Markdown content...\n\n## Introduction"}
              rows="12"
              style={inputStyle}
            />

            <button
              type="button"
              onClick={analyzeSEO}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "14px",
                border: 0,
                borderRadius: "9px",
                background: "#4f46e5",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              🔍 Analyze SEO
            </button>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 5px 25px rgba(0,0,0,.06)"
            }}
          >
            <h2>SEO Result</h2>

            {!result ? (
              <div
                style={{
                  minHeight: "450px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#667085"
                }}
              >
                <div>
                  <div style={{ fontSize: "50px" }}>📈</div>
                  <h3>Ready to analyze</h3>
                  <p>
                    Enter your blog details and click Analyze SEO.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    textAlign: "center",
                    padding: "25px",
                    background:
                      result.score >= 80
                        ? "#ecfdf3"
                        : result.score >= 50
                        ? "#fffbeb"
                        : "#fef2f2",
                    borderRadius: "14px"
                  }}
                >
                  <div
                    style={{
                      fontSize: "58px",
                      fontWeight: "800",
                      color:
                        result.score >= 80
                          ? "#16a34a"
                          : result.score >= 50
                          ? "#d97706"
                          : "#dc2626"
                    }}
                  >
                    {result.score}
                  </div>

                  <strong>SEO Score / 100</strong>

                  <p>{result.words} words analyzed</p>
                </div>

                <div style={{ marginTop: "20px" }}>
                  {result.checks.map((check) => (
                    <div
                      key={check.name}
                      style={{
                        display: "flex",
                        gap: "12px",
                        padding: "14px 0",
                        borderBottom: "1px solid #eee"
                      }}
                    >
                      <span>{check.good ? "✅" : "⚠️"}</span>

                      <div>
                        <strong>{check.name}</strong>
                        <p
                          style={{
                            margin: "5px 0 0",
                            color: "#667085"
                          }}
                        >
                          {check.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "15px",
  border: "1px solid #d9dce3",
  borderRadius: "9px",
  fontSize: "15px",
  fontFamily: "Arial, sans-serif"
};

export default SEOAnalyzer;
