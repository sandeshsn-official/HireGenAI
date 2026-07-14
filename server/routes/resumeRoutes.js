const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume,
  getResumes,
  deleteResume,
} = require("../controllers/resumeController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getResumes);

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

router.delete("/:id", authMiddleware, deleteResume);

module.exports = router;