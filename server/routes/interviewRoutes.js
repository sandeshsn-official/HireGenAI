const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const interviewController = require("../controllers/interviewController");

router.post(
  "/generate",
  protect,
  interviewController.generateInterviewQuestion
);

module.exports = router;