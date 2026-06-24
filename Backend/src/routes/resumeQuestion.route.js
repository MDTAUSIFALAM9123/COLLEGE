import express from "express";

import {
  generateResumeInterview,
} from "../controllers/resumeQuestion.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

const router =
  express.Router();

router.post( "/resume-interview", protectRoute, generateResumeInterview );

export default router;