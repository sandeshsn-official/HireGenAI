const fs = require("fs");
const pdf = require("pdf-parse");

const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/aiService");

exports.analyzeResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);

const pdfData = await pdf(dataBuffer);

    const result = await analyzeResume(pdfData.text);

    res.json({
      success: true,
      analysis: JSON.parse(result),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Analysis failed",
      error: error.message,
    });
  }
};