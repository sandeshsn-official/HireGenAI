const axios = require("axios");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

exports.reviewCode = async (req, res) => {
  try {
    const { language, question, code } = req.body;

    const prompt = `
You are an expert software engineer.

Review this solution.

Programming Language:
${language}

Question:
${question}

Candidate Code:
${code}

Return ONLY valid JSON.

{
  "score":90,
  "correctness":"Excellent",
  "timeComplexity":"O(n)",
  "spaceComplexity":"O(1)",
  "codeQuality":"Very Good",
  "suggestions":[]
}
`;

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
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "HireGenAI",
        },
      }
    );

    let text = response.data.choices[0].message.content;

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");

    res.json({
      success: true,
      review: JSON.parse(text),
    });

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "AI Review Failed",
    });
  }
};