import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
} from "../controllers/category.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/create", protectRoute, checkRole("ADMIN"), createCategory);

export default router;
