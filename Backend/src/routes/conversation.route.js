import express from "express";

import {
  respondInterview,
} from "../controllers/conversation.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/respond",
  protectRoute,
  respondInterview
);

export default router;