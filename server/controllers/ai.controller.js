const { generateAIResponse } = require("../services/ai.service");

const generateResponse = async (req, res) => {
  try {
    const { prompt, mode } = req.body;

    if (!prompt || !mode) {
      return res.status(400).json({ error: "Missing input" });
    }

    const result = await generateAIResponse(prompt, mode);

    res.json({ response: result });
  } catch (error) {
    res.status(500).json({ error: "AI error" });
  }
};

module.exports = { generateResponse };