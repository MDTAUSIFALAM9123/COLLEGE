import express from "express";

import { uploadResume } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { resumeUpload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/upload", protectRoute, resumeUpload.single("resume"), uploadResume);

export default router;