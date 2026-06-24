import path from "path";
import multer from "multer";

const allowedExtensions = new Set([".pdf", ".doc", ".docx"]);

const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.has(fileExtension)) {
    return cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
  }

  cb(null, true);
};

export const resumeUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});