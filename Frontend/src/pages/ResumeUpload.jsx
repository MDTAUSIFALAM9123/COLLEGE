import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, FileText, Upload } from "lucide-react";

import api from "../lib/api.js";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedResumeUrl, setUploadedResumeUrl] = useState("");
  const [analysisReady, setAnalysisReady] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage("Choose a resume file first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("resume", file);

      const response = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedResumeUrl(response.data.user.ResumeUrl);
      setAnalysisReady(true);
      navigate("/analysis", { state: { resumeUrl: response.data.user.ResumeUrl } });
      setFile(null);
      event.target.reset();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Resume upload failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-[#0C033E] flex items-center justify-center px-6 py-12">

    <div className="w-full max-w-3xl">

      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">

        {/* Badge */}

        <div className="flex justify-center">
          <div className="px-4 py-2 rounded-full bg-violet-500/20 text-violet-300 text-sm font-medium">
            ✨ AI Resume Analysis
          </div>
        </div>

        {/* Heading */}

        <div className="text-center mt-6">

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Upload Your Resume
          </h1>

          <p className="mt-4 text-slate-300 max-w-xl mx-auto">
            Upload your resume and get AI-powered resume analysis,
            ATS scoring, skill detection and personalized interview preparation.
          </p>

        </div>

        {/* Upload Box */}

        <form
          onSubmit={handleSubmit}
          className="mt-10"
        >

          <label
            className="
            block
            rounded-[28px]
            border-2
            border-dashed
            border-violet-500/30
            bg-[#14084f]
            p-10
            text-center
            cursor-pointer
            hover:border-violet-400
            transition
            "
          >

            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-3xl bg-violet-500/20 flex items-center justify-center">
                <Upload
                  size={36}
                  className="text-violet-300"
                />
              </div>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-white">
              Drag & Drop Resume
            </h3>

            <p className="mt-2 text-slate-400">
              or click to browse files
            </p>

            <p className="mt-4 text-sm text-slate-500">
              PDF, DOC, DOCX • Max 10 MB
            </p>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(event) =>
                setFile(event.target.files?.[0] || null)
              }
            />
          </label>

          {file && (
            <div className="mt-5 rounded-2xl bg-violet-500/10 border border-violet-500/20 p-4 text-violet-200">
              📄 {file.name}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
            mt-6
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-violet-600
            to-purple-700
            py-4
            text-white
            font-semibold
            text-lg
            hover:scale-[1.01]
            transition
            disabled:opacity-70
            "
          >
            {loading
              ? "Uploading..."
              : "Upload Resume"}
          </button>

        </form>

        {/* Features */}

        <div className="grid md:grid-cols-4 gap-4 mt-10">

          <div className="rounded-2xl bg-white/5 p-4 border border-white/10 text-center">
            <p className="text-violet-300 text-sm">
              ATS Analysis
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4 border border-white/10 text-center">
            <p className="text-violet-300 text-sm">
              Skill Detection
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4 border border-white/10 text-center">
            <p className="text-violet-300 text-sm">
              AI Questions
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4 border border-white/10 text-center">
            <p className="text-violet-300 text-sm">
              Interview Ready
            </p>
          </div>

        </div>

        {message && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-slate-200">
            {message}
          </div>
        )}

        {uploadedResumeUrl && (
          <div className="mt-6 text-center">

            <a
              href={uploadedResumeUrl}
              target="_blank"
              rel="noreferrer"
              className="
              inline-flex
              items-center
              gap-2
              text-green-400
              hover:text-green-300
              "
            >
              <CheckCircle2 size={18} />
              View Uploaded Resume
            </a>

          </div>
        )}

      </div>

    </div>

  </div>
);
}