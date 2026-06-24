
import { Upload, Sparkles, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function ResumeUpload() {
  return (
    <section className="bg-white py-24 px-8">
      <div
        className="
          max-w-6xl 
          mx-auto 
          bg-linear-to-br 
          from-white 
          to-purple-50 
          rounded-3xl 
          shadow-xl 
          border 
          border-purple-100
          overflow-hidden
        "
      >
        <div className="grid md:grid-cols-2 items-center gap-10 p-10">
          {/* Left Image Section */}
          <div className="relative flex justify-center">
            {/* Background Glow */}
            <div className="absolute w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40"></div>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Resume Upload"
              className="relative w-80 hover:scale-105 transition duration-300"
            />
          </div>

          {/* Right Content */}
          <div>
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium">
              <Sparkles size={18} />
              AI Resume Analysis
            </div>

            <h2 className="text-5xl font-bold text-gray-900 mt-6">
              Upload Your Resume & Let AI Prepare You
            </h2>

            <p className="text-gray-600 mt-5 text-lg">
              Our AI analyzes your resume, understands your skills, and
              generates personalized interview questions to help you practice
              smarter.
            </p>

            {/* Features */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <FileText className="text-purple-600" />
                Resume-based personalized questions
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <FileText className="text-purple-600" />
                AI-powered skill analysis
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <FileText className="text-purple-600" />
                Instant interview preparation
              </div>
            </div>

            {/* Upload Button */}
            <Link
              to="/resume-upload"
              className="
                mt-8 
                inline-flex 
                items-center 
                gap-3 
                bg-linear-to-r 
                from-purple-600 
                to-purple-800 
                text-white 
                px-8 
                py-4 
                rounded-2xl 
                font-semibold
                shadow-lg
                hover:scale-105
                hover:shadow-purple-400/50
                transition
              "
            >
              <Upload size={20} />
              Upload Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}