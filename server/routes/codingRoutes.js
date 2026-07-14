const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const codingController = require("../controllers/codingController");

router.post(
  "/generate",
  protect,
  codingController.generateQuestion
);

module.exports = router;