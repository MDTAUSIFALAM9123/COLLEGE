import express from "express";

import {
  register,
  login,
  logout,
  forgotPassword,
  verifyOtp,
  resendOtp,
  resetPassword,
  changePassword,
  getCurrentUser,
  updateProfile,
  uploadProfilePicture,
  //editProfilePicture
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { imageUpload } from "../middleware/imageUpload.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOtp);

router.post("/resend-otp", resendOtp);

router.post("/reset-password", resetPassword);

router.post("/change-password", protectRoute, changePassword);

router.get("/me", protectRoute, getCurrentUser);

router.put("/profile", protectRoute, updateProfile);

router.post("/profile-picture", protectRoute, imageUpload.single("image"), uploadProfilePicture);

//router.put("/edit-profile-picture", protectRoute, imageUpload.single("image"), editProfilePicture);
export default router;
