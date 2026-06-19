import express from "express";
import upload from "../middleware/upload.js";
import protect from "../middleware/authMiddleware.js";

import {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/", getDoctors);
router.get("/:id", getDoctor);
router.post("/", protect, upload.single("image"), createDoctor);
router.put("/:id", protect, upload.single("image"), updateDoctor);
router.delete("/:id", protect, deleteDoctor);

export default router;
