const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const path = require("path");
const aiRoutes = require("./routes/aiRoutes");
const codingRoutes = require("./routes/codingRoutes");
const codeReviewRoutes = require("./routes/codeReviewRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const interviewReviewRoutes = require("./routes/interviewReviewRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(morgan("dev"));

app.use("/api/ai", aiRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/code", codeReviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/interview", interviewReviewRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to HireGenAI Backend 🚀"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        server: "Running",
        timestamp: new Date()
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});