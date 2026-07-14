const axios = require("axios");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

exports.reviewInterview = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const prompt = `
You are an experienced technical interviewer.

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer.

Return ONLY valid JSON.

{
  "score":85,
  "communication":"Good",
  "technicalKnowledge":"Very Good",
  "confidence":"Good",
  "strengths":[],
  "improvements":[]
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
      message: "Interview evaluation failed",
    });
  }
};