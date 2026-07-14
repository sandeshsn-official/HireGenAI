const axios = require("axios");

async function analyzeResume(resumeText) {
  const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

{
  "score": 0,
  "skillsFound": [],
  "missingSkills": [],
  "strengths": [],
  "suggestions": []
}

Resume:

${resumeText}
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "cohere/north-mini-code:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "HireGenAI",
        },
      }
    );

    console.log("===== OPENROUTER RESPONSE =====");
    console.log(JSON.stringify(response.data, null, 2));
    console.log("===============================");

    const text = response.data?.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error(
        "OpenRouter returned an empty response. Check the logged response above."
      );
    }

    return text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

  } catch (err) {
    console.log("===== OPENROUTER ERROR =====");

    if (err.response) {
      console.log(JSON.stringify(err.response.data, null, 2));
    } else {
      console.log(err.message);
    }

    console.log("============================");

    throw err;
  }
}

module.exports = {
  analyzeResume,
};