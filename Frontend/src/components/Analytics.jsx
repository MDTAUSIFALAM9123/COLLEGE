import { BarChart3, TrendingUp, Award, Brain, ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

export default function Analytics() {
  return (
    <section className="bg-white py-24 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        {/* Left Dashboard Preview */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -top-10 left-10 w-40 h-40 bg-purple-300 blur-3xl opacity-30 rounded-full"></div>

          <div className="relative bg-linear-to-br from-[#0b0625] to-[#1b1045] rounded-3xl p-8 shadow-2xl text-white border border-purple-800">
            {/* Top */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">AI Analytics</h3>

              <BarChart3 className="text-purple-400" />
            </div>

            {/* Score Circle */}
            <div className="flex justify-center mt-8">
              <div className="w-32 h-32 rounded-full bg-linear-to-r from-purple-500 to-purple-700 flex flex-col justify-center items-center shadow-[0_0_35px_#9333ea]">
                <span className="text-3xl font-bold">92%</span>

                <span className="text-sm">Score</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <TrendingUp className="mx-auto text-green-400" />
                <p className="text-sm mt-2">Growth</p>
              </div>

              <div className="bg-white/10 rounded-xl p-3 text-center">
                <Award className="mx-auto text-yellow-400" />
                <p className="text-sm mt-2">Skills</p>
              </div>

              <div className="bg-white/10 rounded-xl p-3 text-center">
                <Brain className="mx-auto text-purple-300" />
                <p className="text-sm mt-2">AI Review</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-7">
              <div className="flex justify-between text-sm">
                <span>Interview Confidence</span>
                <span>92%</span>
              </div>

              <div className="w-full h-3 bg-white/20 rounded-full mt-2">
                <div className="w-[92%] h-3 rounded-full bg-linear-to-r from-purple-400 to-purple-600"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div>
          <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium">
            Smart AI Reports
          </span>

          <h2 className="text-5xl font-bold text-gray-900 mt-6 leading-tight">
            Analyze Your Progress.
            <br />
            Improve Every Interview.
          </h2>

          <p className="text-gray-600 text-lg mt-6 leading-relaxed">
            Get detailed AI-powered reports after every interview. Understand
            your communication, technical skills, confidence, and overall
            performance through intelligent analytics.
          </p>

          {/* Highlights */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-600"></div>
              <p className="text-gray-700">AI-generated performance score</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-600"></div>
              <p className="text-gray-700">Track improvements over time</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-600"></div>
              <p className="text-gray-700">
                Detailed strengths & weaknesses analysis
              </p>
            </div>
          </div>

          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className="
              mt-10
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
              transition-all
              duration-300
            "
          >
            Go To Dashboard
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
