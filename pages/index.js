import { useState } from "react";

export default function Home() {
  const [tweet, setTweet] = useState("");
  const [category, setCategory] = useState("discipline");
  const [error, setError] = useState("");

  const generateTweet = async () => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });

      const data = await res.json();
      if (res.ok) {
        setTweet(data.tweet);
        setError("");
      } else {
        setTweet("");
        setError(data.tweet || "Something went wrong.");
      }
    } catch (err) {
      console.error("Frontend error:", err);
      setError("Failed to reach API.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Tweet Generator</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Choose category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="discipline">Discipline</option>
            <option value="trading">Trading</option>
            <option value="philosophy">Philosophy</option>
            <option value="humor">Humor</option>
          </select>
        </label>
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={generateTweet}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Generate Tweet
        </button>
      </div>

      {/* Text box at the bottom */}
      <div style={{ marginTop: "30px" }}>
        <textarea
          value={tweet || error}
          readOnly
          rows={4}
          style={{
            width: "100%",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            backgroundColor: "#f9f9f9",
          }}
          placeholder="Your generated tweet will appear here..."
        />
        {tweet && (
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button
              onClick={generateTweet}
              style={{
                padding: "8px 16px",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Regenerate
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(tweet)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#555",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
