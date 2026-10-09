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

  const start = Date.now();

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

  const duration = Date.now() - start;

  console.log(
    `AI Summary generated in ${duration} ms`
  );

  return {
    summary:
      response.choices[0].message.content,
    generationTimeMs: duration,
  };
}

module.exports = {
  generateAISummary,
};