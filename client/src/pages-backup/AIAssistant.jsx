import { useState } from "react";

function AIAssistant() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("Title Ideas");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const value = topic.trim();

    if (!value) {
      setResult("Please enter a topic first.");
      return;
    }

    let output = "";

    if (type === "Title Ideas") {
      output = `10 Blog Title Ideas for "${value}"

1. The Complete Guide to ${value}
2. Everything You Need to Know About ${value}
3. ${value}: A Beginner's Guide
4. 7 Important Things About ${value}
5. How ${value} Can Change the Way You Work
6. The Future of ${value}
7. Common Mistakes to Avoid in ${value}
8. ${value} Explained in Simple Words
9. Best Practices for ${value}
10. Why ${value} Matters in 2026`;
    }

    if (type === "Blog Outline") {
      output = `Blog Outline: ${value}

1. Introduction
   - What is ${value}?
   - Why is it important?

2. Basic Concepts
   - Key terminology
   - How it works

3. Main Benefits
   - Important advantages
   - Real-world use cases

4. Common Challenges
   - Problems users face
   - Practical solutions

5. Best Practices
   - Tips for better results
   - Mistakes to avoid

6. Conclusion
   - Key takeaways
   - Final recommendation`;
    }

    if (type === "Introduction") {
      output = `Introduction

${value} has become an important topic for modern businesses, creators, and technology users. Understanding how it works and why it matters can help you make better decisions and achieve better results.

In this article, we will explore ${value} in simple terms, understand its major benefits, discuss common challenges, and look at practical ways to use it effectively.`;
    }

    if (type === "Improve Content") {
      output = `Content Improvement Suggestions

• Add a stronger introduction that clearly explains the reader's problem.
• Use short paragraphs for better readability.
• Add H2 and H3 headings to organize the article.
• Include practical examples related to ${value}.
• Add statistics or trusted references where appropriate.
• Use bullet points for important information.
• Add a clear conclusion and call-to-action.
• Optimize the title and meta description for search engines.`;
    }

    setResult(output);
    setCopied(false);
  };

  const copyResult = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="ai-page">
      <div className="ai-container">

        <div className="ai-heading">
          <div>
            <h1>✨ AI Assistant</h1>
            <p>
              Generate ideas and improve your blog content with AI-powered tools.
            </p>
          </div>
        </div>

        <div className="ai-grid">

          <section className="ai-card">
            <h2>Generate Content</h2>

            <label>What are you writing about?</label>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Example: Artificial Intelligence"
            />

            <label>Choose an AI tool</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Title Ideas</option>
              <option>Blog Outline</option>
              <option>Introduction</option>
              <option>Improve Content</option>
            </select>

            <button
              type="button"
              className="generate-ai"
              onClick={generate}
            >
              ✨ Generate
            </button>
          </section>

          <section className="ai-card result-card">
            <div className="result-header">
              <div>
                <h2>AI Result</h2>
                <p>Your generated content will appear here.</p>
              </div>

              {result && (
                <button
                  type="button"
                  className="copy-ai"
                  onClick={copyResult}
                >
                  {copied ? "✓ Copied" : "📋 Copy"}
                </button>
              )}
            </div>

            <div className="ai-result">
              {result ? (
                <pre>{result}</pre>
              ) : (
                <div className="empty-ai">
                  <div>✨</div>
                  <h3>Ready to help</h3>
                  <p>
                    Enter a topic and choose an option to generate content.
                  </p>
                </div>
              )}
            </div>
          </section>

        </div>

        <div className="ai-info">
          <span>💡</span>
          <div>
            <strong>AI Assistant</strong>
            <p>
              This version works locally. The OpenAI API can be connected later
              for real AI-generated responses.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AIAssistant;
