const mongoose = require("mongoose");

const codingAssessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    language: String,

    difficulty: String,

    question: String,

    candidateCode: String,

    aiFeedback: Object,

    score: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CodingAssessment",
  codingAssessmentSchema
);