import express from "express";
import { createCodingChallenge,
    getAllCodingChallenges,
    getCodingChallengeById,
    updateCodingChallenge,
    deleteCodingChallenge,
    submitCode,
 } from "../controllers/coding.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/create" ,protectRoute,checkRole("ADMIN"),createCodingChallenge);
router.get("/all",getAllCodingChallenges);
router.get("/:id",getCodingChallengeById);
router.put("/update/:id",protectRoute,checkRole("ADMIN"),updateCodingChallenge);
router.delete("/delete/:id", protectRoute,checkRole("ADMIN"),deleteCodingChallenge);
router.post("/submit",submitCode);

export default router;