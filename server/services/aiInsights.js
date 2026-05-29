const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateAISummary(data) {

  const prompt = `
  You are a financial assistant.

  Analyze this user spending data:

  ${JSON.stringify(data)}

  Give short financial insights and suggestions.
  `;

  const response =
    await openai.chat.completions.create({

      model: "gpt-4.1-mini",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  return response.choices[0].message.content;
}

module.exports = {
  generateAISummary,
};