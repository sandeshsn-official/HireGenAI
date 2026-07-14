const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    filename: String,

    originalName: String,

    path: String,

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Resume",
  ResumeSchema
);