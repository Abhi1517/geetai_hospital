import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

router.get("/", getDepartments);
router.get("/:id", getDepartment);
router.post("/", protect, createDepartment);
router.put("/:id", protect, updateDepartment);
router.delete("/:id", protect, deleteDepartment);

export default router;
