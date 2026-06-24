import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Readable } from "stream";
import { generateToken } from "../utils/generateToken.js";
import transporter from "../utils/nodemail.js";
import cloudinary from "../config/cloudinary.js";
import { PDFParse } from "pdf-parse";
import { analyzeResume } from "../services/gemini.service.js";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user);

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    res.status(201).json({
      success: true,
      message: "Registered Successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user);

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Logout
export const logout = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};

//forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpiry: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`,
    });
    res.status(200).json({
      success: true,
      message: "OTP sent to your email successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Resend otp
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpiry: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`,
    });
    res.status(200).json({
      success: true,
      message: "OTP sent to your email successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (String(user.otp).trim() !== String(otp).trim()) {
      console.log(`OTP mismatch: stored="${user.otp}", received="${otp}"`);
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.user.update({
      where: { email },
      data: {
        otp: null,
        otpExpiry: null,
        resetToken,
        resetTokenExpiry,
      },
    });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      resetToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, otp, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    if (resetToken) {
      if (!user.resetToken || user.resetToken !== resetToken) {
        return res.status(400).json({
          success: false,
          message: "Invalid reset token",
        });
      }

      if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
        return res.status(400).json({
          success: false,
          message: "Reset token expired",
        });
      }
    } else if (otp) {
      if (!user.otp || String(user.otp).trim() !== String(otp).trim()) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      if (!user.otpExpiry || user.otpExpiry < new Date()) {
        return res.status(400).json({
          success: false,
          message: "OTP expired",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Reset token or OTP is required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        otp: null,
        otpExpiry: null,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        ResumeUrl: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//update user profile or edit user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, image, ResumeUrl } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(image && { image }),
        ...(ResumeUrl && { ResumeUrl }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        ResumeUrl: true,
      },
    });

    res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// upload resume
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume file",
      });
    }

    const uploadResumeToCloudinary = () =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "resumes",
            resource_type: "raw",
            public_id: `resume-${req.user.id}-${Date.now()}`,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(result);
          },
        );

        Readable.from(req.file.buffer).pipe(uploadStream);
      });

    const result = await uploadResumeToCloudinary();
    const parser = new PDFParse({
  data: req.file.buffer,
});

await parser.load();

const extractedText =
  await parser.getText();
  console.log(extractedText);
  console.log(JSON.stringify(extractedText,null,2));
console.log("TYPE:",typeof extractedText);
console.log("KEYS:", Object.keys(extractedText));
console.log("FULL:",extractedText);

console.log(
  "===== RESUME TEXT ====="
);

console.log(extractedText);
console.log("KEYS:" , Object.keys(extractedText));
const analysis =
  await analyzeResume(
    extractedText.text
  );

/*const analysis = {
  skills: ["C++", "MySQL"],
  projects: ["Online Registration System", "Calculator"],
  experience: ["Fresher"],
  atsScore: 75,
  candidateLevel: "Beginner",
  strengths: ["Problem Solving"],
  weaknesses: ["Limited Industry Experience"],
  recommendedRoles: ["Software Developer"]
};*/

console.log(
  "ANALYSIS:",
  analysis
);

console.log(
  "===== END ====="
);

await parser.destroy();

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ResumeUrl: result.secure_url,
        extractedText: extractedText.text,
        atsScore: analysis.atsScore,
        resumeSkills: analysis.skills || [],
        resumeProjects: analysis.projects.map(p => p?.name).filter(Boolean) || [],
        resumeExperience: analysis.experience.map(e => e?.role).filter(Boolean) || [],
        candidateLevel: analysis.candidateLevel || "",
        resumeStrengths: analysis.strengths || [],
        resumeWeaknesses: analysis.weaknesses || [],
        recommendedRoles: analysis.recommendedRoles?.join(",") || "",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        ResumeUrl: true,
      },
    });

    res.status(200).json({
      success: true,
      user: updatedUser,
      analysis,
      message: "Resume uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// upload profile picture
export const uploadProfilePicture = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    console.log("USER:", req.user);
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a profile picture",
      });
    }
    const uploadProfilePictureToCloudinary = () =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "profile-pictures",
            resource_type: "image",
            public_id: `profile-${req.user.id}-${Date.now()}`,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(result);
          },
        );

        Readable.from(req.file.buffer).pipe(uploadStream);
      });

    const result = await uploadProfilePictureToCloudinary();

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        image: result.secure_url,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        ResumeUrl: true,
      },
    });

    res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile picture uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//edit profile picture
/*export const editProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "no image uploaded",
      });
    }
    const uploadProfilePictureToCloudinary = () =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "profile-pictures",
            resource_type: "image",
            public_id: `profile-${req.user.id}-${Date.now()}`,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(result);
          }
        );

        Readable.from(req.file.buffer).pipe(uploadStream);
      });

    const result = await uploadProfilePictureToCloudinary();

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        image: result.secure_url,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        ResumeUrl: true,
      },
    });

    res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile picture uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}*/

// delete account
