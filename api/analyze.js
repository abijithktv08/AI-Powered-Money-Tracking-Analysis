export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const { transactions } = req.body;

  const summary = transactions
    .map(
      (t) =>
        `${t.type} | ${t.category} | ₹${t.amount} | ${t.desc}`
    )
    .join("\n");

  const prompt = `You are a friendly personal finance coach.

Here are the user's transactions:

${summary}

Give:
1. One-line summary.
2. Top 2 spending categories.
3. Exactly 4 practical saving tips.

Return plain text only.`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res
        .status(500)
        .json({ error: data.error.message });
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    res.status(200).json({ text });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to reach Gemini.",
    });
  }
}
