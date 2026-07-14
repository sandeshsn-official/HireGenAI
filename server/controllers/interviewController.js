const axios = require("axios");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

exports.generateInterviewQuestion = async (req, res) => {
  try {
    const { role, level, type } = req.body;

    const prompt = `
You are an experienced software engineering interviewer.

Generate ONE ${type} interview question for a ${level} ${role}.

Return ONLY valid JSON.

{
  "question":"",
  "expectedPoints":[]
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
      interview: JSON.parse(text),
    });

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Could not generate interview question",
    });
  }
};