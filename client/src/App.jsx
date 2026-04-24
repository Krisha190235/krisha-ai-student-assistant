import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("summarize");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const featureCards = [
    {
      key: "explain",
      icon: "📘",
      title: "Explain",
      desc: "Beginner-friendly concepts",
    },
    {
      key: "mcq",
      icon: "❓",
      title: "MCQs",
      desc: "Structured quiz questions",
    },
    {
      key: "summarize",
      icon: "📝",
      title: "Summary",
      desc: "Short and clear points",
    },
    {
      key: "improve",
      icon: "✨",
      title: "Improve",
      desc: "Better writing quality",
    },
  ];

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError("Please enter some text before generating a response.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await axios.post("http://localhost:5001/api/ai/generate", {
        prompt: input,
        mode,
      });

      setResponse(res.data.response);
    } catch (err) {
      setError("Something went wrong. Please check your backend server or API key.");
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div className="app">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <main className="card">
        <div className="badge">MERN + Gemini AI</div>

        <h1>
          <span>AI</span> Student Assistant
        </h1>

        <p className="subtitle">
          Ask questions, summarize content, improve writing, or generate practice MCQs.
        </p>

        <section className="form-section">
          <label>Choose Task Mode</label>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="explain">Explain a Concept</option>
            <option value="mcq">Generate MCQs</option>
            <option value="summarize">Summarize Text</option>
            <option value="improve">Improve Writing Quality</option>
          </select>

          <label>Your Input</label>

          <textarea
            placeholder="Example: Explain JavaScript closures"
            value={input}
            maxLength={2000}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
          />

          <div className="helper-row">
            <p>💡 Tip: Give clear context for better AI responses.</p>
            <span>{input.length}/2000</span>
          </div>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Generating..." : "✨ Generate Response"}
          </button>
        </section>

        <section className="features">
          {featureCards.map((card) => (
            <div
              key={card.key}
              className={mode === card.key ? "feature-card active" : "feature-card"}
              onClick={() => setMode(card.key)}
            >
              <span>{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </section>

        {error && <p className="error">{error}</p>}

        {loading && <div className="loader"></div>}

        {!response && !loading && !error && (
          <p className="empty-state">Your AI response will appear here...</p>
        )}

        {response && (
          <section className="response-section">
            <div className="response-header">
              <h2>AI Response</h2>
              <button className="copy-btn" onClick={copyResponse}>
                Copy
              </button>
            </div>

            <div className="response-box">
              <pre>{response}</pre>
            </div>
          </section>
        )}

        <p className="disclaimer">
          AI responses may not always be perfect. Verify important information.
        </p>

        <p className="footer-credit">
          Built by Krisha Patel • MERN + AI Project
        </p>
      </main>
    </div>
  );
}

export default App;