export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

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
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    // Gemini returns errors in data.error instead of throwing — surface that clearly
    if (data.error) {
      return res.status(500).json({ error: data.error.message || "Gemini API error." });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    res.status(200).json({ text: text || "No response generated." });
  } catch (err) {
    res.status(500).json({ error: "Failed to reach Gemini." });
  }
}
