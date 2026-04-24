const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function buildPrompt(mode, userInput) {
  if (mode === "explain") {
    return `You are an experienced university instructor.

Explain the following concept in simple terms.
Keep it under 150 words.
If unsure, say you are not certain.

Concept: ${userInput}`;
  }

  if (mode === "mcq") {
    return `You are an exam generator.

Generate 3 MCQs in JSON format:
[
  {
    "question": "",
    "options": ["", "", "", ""],
    "answer": ""
  }
]

Topic: ${userInput}

Rules:
- Only JSON
- No extra text`;
  }

  if (mode === "summarize") {
    return `Summarize the following text in 3 bullet points.
If unclear, say so.

Text: ${userInput}`;
  }

  if (mode === "improve") {
    return `Improve grammar and clarity without changing meaning.

Text: ${userInput}`;
  }
}

async function generateAIResponse(prompt, mode) {
  const finalPrompt = buildPrompt(mode, prompt);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: finalPrompt,
  });

  return response.text;
}

module.exports = { generateAIResponse };