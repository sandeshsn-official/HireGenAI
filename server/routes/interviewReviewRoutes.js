const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const controller = require("../controllers/interviewReviewController");

router.post(
  "/review",
  protect,
  controller.reviewInterview
);

module.exports = router;