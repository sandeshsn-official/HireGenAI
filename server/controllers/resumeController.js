const Resume = require("../models/Resume");

exports.uploadResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      uploadedBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Could not fetch resumes",
    });
  }
};

const fs = require("fs");

exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    if (fs.existsSync(resume.path)) {
      fs.unlinkSync(resume.path);
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};