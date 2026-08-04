console.log("ai.js loaded");

const aiBtn = document.getElementById("aiBtn");
const aiOutput = document.getElementById("aiOutput");

console.log("AI button:", aiBtn);

aiBtn.addEventListener("click", async () => {
  console.log("Analyze button clicked!");

  if (transactions.length === 0) {
    aiOutput.textContent = "Add a few transactions first.";
    return;
  }

  aiBtn.disabled = true;
  aiBtn.textContent = "Thinking...";
  aiOutput.textContent = "Reading your transactions...";

  try {
    const response = await fetch(
      "http://localhost:3000/api/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ transactions })
      }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);

    if (!response.ok) {
      aiOutput.textContent =
        "Error: " + (data.error || "Unknown server error");
      return;
    }

    aiOutput.textContent =
      data.text || "No AI response generated.";

  } catch (error) {
    console.error("AI ERROR:", error);

    aiOutput.textContent =
      "Could not connect to the AI server.";

  } finally {
    aiBtn.disabled = false;
    aiBtn.textContent = "Analyse my spending";
  }
});
