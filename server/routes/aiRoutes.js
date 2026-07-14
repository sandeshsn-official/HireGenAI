const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  analyzeResume,
} = require("../controllers/aiController");

router.get(
  "/resume/:id",
  protect,
  analyzeResume
);

module.exports = router;