// src/routes/ai.route.js

import express from "express";
import { testGemini } from "../controllers/ai.controller.js";

const router = express.Router();

router.get("/test", testGemini);

export default router;