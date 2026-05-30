import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import { rateLimit } from "express-rate-limit";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." }
});

app.use(limiter);

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174","https://portfolio-soham-lodh.vercel.app"],
    credentials: true,
  })
);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API Working with Security");
});

app.listen(port, () => console.log(`Server running on port ${port}`));