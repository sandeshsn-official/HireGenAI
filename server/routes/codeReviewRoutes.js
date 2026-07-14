const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const reviewController = require("../controllers/codeReviewController");

router.post(
  "/review",
  protect,
  reviewController.reviewCode
);

module.exports = router;