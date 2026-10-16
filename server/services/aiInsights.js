require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI();

async function generateAISummary(data) {
  const prompt = `
  You are a financial assistant.
  Analyze this user spending data:
  ${JSON.stringify(data)}
  Give short financial insights and suggestions.
  `;

  const start = Date.now();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    const duration = Date.now() - start;
    console.log(`AI Summary generated in ${duration} ms`);

    return {
      summary: response.text,
      generationTimeMs: duration,
    };
  } catch (error) {
    console.error("AI Service temporarily unavailable:", error.message);
    
    // Graceful fallback so your frontend doesn't crash with 500 Internal Server Error
    return {
      summary: "AI insights are temporarily experiencing high demand from Google. Please try adding some expenses or refresh in a moment!",
      generationTimeMs: 0,
    };
  }
}

module.exports = {
  generateAISummary,
};