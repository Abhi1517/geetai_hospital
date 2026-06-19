import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import doctorRoutes from "./src/routes/doctorRoutes.js";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

connectDB();

const app = express();

/* Middleware FIRST */
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/doctors",doctorRoutes);

/* Routes AFTER middleware */
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);

app.get("/", (req, res) => {
  res.send("Hospital API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
