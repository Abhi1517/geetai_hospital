import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js";

import connectDB from "./src/config/db.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(
  "/api/auth",
  authRoutes
);

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hospital API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);