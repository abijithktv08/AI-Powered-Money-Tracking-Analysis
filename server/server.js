// This server holds your Gemini API key privately.
// The browser never sees it — it only talks to THIS server.
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Safe debug check - doesn't print your actual key
console.log(
  "Gemini API key loaded:",
  GEMINI_API_KEY ? "YES" : "NO"
);

app.post("/api/analyze", async (req, res) => {
  const { transactions } = req.body;

  const summary = transactions
    .map(t => `${t.type} | ${t.category} | ₹${t.amount} | ${t.desc}`)
    .join("\n");

  const prompt = `You are a friendly personal finance coach. Here is a list of a user's transactions (type | category | amount | note):

${summary}

Give a short analysis: 1) one line on their overall pattern, 2) their top 2 spending categories, 3) exactly 4 specific, practical suggestions to save more or budget better. Keep it concise, plain text, no markdown symbols.`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message || "Gemini API error." });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    res.json({ text: text || "No response generated." });
  } catch (err) {
    res.status(500).json({ error: "Failed to reach Gemini." });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));