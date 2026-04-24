const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function buildPrompt(mode, userInput) {
  if (mode === "explain") {
    return `
You are an experienced university instructor.

Explain the concept below in simple, beginner-friendly language.
Limit response to 150 words.
If unsure, say "I'm not fully certain about this topic."

Concept:
${userInput}
`;
  }

  if (mode === "mcq") {
    return `
You are an exam question generator.

Generate exactly 3 multiple-choice questions based on the topic.

IMPORTANT RULES:
- Return ONLY valid JSON
- Do NOT include markdown (no \`\`\`)
- Do NOT include explanations outside JSON
- Keep options short

Format:
[
  {
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "answer": "Correct option"
  }
]

Topic:
${userInput}
`;
  }

  if (mode === "summarize") {
    return `
Summarize the text into 3 concise bullet points.
If the text is too short or unclear, say so.

Text:
${userInput}
`;
  }

  if (mode === "improve") {
    return `
Improve the grammar, clarity, and readability of the text.
Do not change the meaning.

Text:
${userInput}
`;
  }
}

function cleanResponse(text) {
  if (!text) return "";

  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .trim();
}

async function generateAIResponse(prompt, mode) {
  const finalPrompt = buildPrompt(mode, prompt);

  const models = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash",
  ];

  for (const modelName of models) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: finalPrompt,
      });

      return cleanResponse(response.text);
    } catch (error) {
      console.error(`AI Error with ${modelName}:`, error.message);
    }
  }

  return "⚠️ AI service is temporarily unavailable. Please try again later.";
}

module.exports = { generateAIResponse };