const axios = require("axios");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

exports.generateQuestion = async (req, res) => {
  try {
    const { language, difficulty } = req.body;

    const prompt = `
You are an expert coding interviewer.

Generate ONE ${difficulty} level coding interview question in ${language}.

Return ONLY valid JSON.

{
  "title": "",
  "description": "",
  "input": "",
  "output": "",
  "constraints": []
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

    // Remove markdown if AI returns it
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");

    res.json({
      success: true,
      question: JSON.parse(text),
    });

  } catch (error) {

    console.log("\n========== OPENROUTER ERROR ==========\n");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log(
        JSON.stringify(error.response.data, null, 2)
      );
    } else {
      console.log(error.message);
    }

    console.log("\n======================================\n");

    res.status(500).json({
      success: false,
      message: "Could not generate question",
    });
  }
};