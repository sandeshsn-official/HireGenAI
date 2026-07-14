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
        model: "tencent/hy3:free",
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

    let text = response.data.choices[0].message.content;

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    return text;
  } catch (err) {
    console.log("===== OPENROUTER ERROR =====");
    console.log(JSON.stringify(err.response?.data, null, 2));
    console.log("============================");

    throw err;
  }
}

module.exports = {
  analyzeResume,
};