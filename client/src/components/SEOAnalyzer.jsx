import { useState } from "react";

function SEOAnalyzer({ title, content }) {
  const [result, setResult] = useState(null);

  const analyzeSEO = () => {
    const cleanContent = content.replace(/[#*_>`]/g, " ");
    const words = cleanContent.trim().split(/\s+/).filter(Boolean).length;

    const checks = [
      {
        name: "Blog Title",
        good: title.trim().length >= 10,
        text:
          title.trim().length >= 10
            ? "Title length looks good."
            : "Use a more descriptive title."
      },
      {
        name: "Content Length",
        good: words >= 300,
        text:
          words >= 300
            ? "Content length is good."
            : "Try to write at least 300 words."
      },
      {
        name: "Headings",
        good: /(^|\n)#{1,3}\s/.test(content),
        text:
          /(^|\n)#{1,3}\s/.test(content)
            ? "Headings detected."
            : "Add H1, H2 or H3 headings."
      },
      {
        name: "Readability",
        good: words >= 100,
        text:
          words >= 100
            ? "Your article has enough content for a basic readability check."
            : "Add more content for better readability."
      }
    ];

    const score = Math.round(
      (checks.filter((item) => item.good).length / checks.length) * 100
    );

    setResult({ score, checks });
  };

  return (
    <div className="seo-analyzer">
      <div className="seo-analyzer-header">
        <div>
          <h2>🔍 SEO Analyzer</h2>
          <p>Check your blog before publishing.</p>
        </div>

        <button type="button" onClick={analyzeSEO}>
          Analyze SEO
        </button>
      </div>

      {result && (
        <div className="seo-result">
          <div className="seo-score">
            <strong>{result.score}</strong>
            <span>SEO Score</span>
          </div>

          <div className="seo-checks">
            {result.checks.map((item) => (
              <div className="seo-check" key={item.name}>
                <span>{item.good ? "✅" : "⚠️"}</span>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SEOAnalyzer;
