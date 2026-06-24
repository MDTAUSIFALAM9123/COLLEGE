import {
  Award,
  Brain,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Analysis() {
  const analysis = {
    atsScore: 87,
    resumeStrength: 92,
    interviewReadiness: 84,

    strengths: [
      "Strong MERN Stack Knowledge",
      "Good Project Experience",
      "Clean Resume Structure",
      "Relevant Technical Skills",
    ],

    improvements: [
      "Add measurable achievements",
      "Improve resume summary",
      "Mention deployment experience",
      "Add more problem solving projects",
    ],

    roles: [
      {
        title: "Frontend Developer",
        match: "94%",
      },
      {
        title: "React Developer",
        match: "91%",
      },
      {
        title: "MERN Stack Developer",
        match: "89%",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C033E] via-[#14045C] to-[#1A0B70] text-white relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-purple-500/20 blur-[150px]" />

      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-500/20 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* Header */}

        <div className="text-center mb-14">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 mb-6">
            <Sparkles size={16} />
            AI Powered Resume Analysis
          </div>

          <h1 className="text-5xl md:text-6xl font-black">
            Resume Analysis
          </h1>

          <p className="text-slate-300 mt-4 text-lg">
            AI generated insights from your professional profile
          </p>

        </div>

        {/* Score Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:scale-105 transition">

            <Award
              size={40}
              className="mx-auto text-purple-400 mb-4"
            />

            <p className="text-slate-300">ATS Score</p>

            <h2 className="text-5xl font-bold text-white mt-3">
              {analysis.atsScore}%
            </h2>

            <span className="text-green-400 text-sm">
              Excellent
            </span>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:scale-105 transition">

            <Brain
              size={40}
              className="mx-auto text-cyan-400 mb-4"
            />

            <p className="text-slate-300">
              Resume Strength
            </p>

            <h2 className="text-5xl font-bold text-white mt-3">
              {analysis.resumeStrength}%
            </h2>

            <span className="text-cyan-400 text-sm">
              Strong
            </span>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:scale-105 transition">

            <Briefcase
              size={40}
              className="mx-auto text-pink-400 mb-4"
            />

            <p className="text-slate-300">
              Interview Readiness
            </p>

            <h2 className="text-5xl font-bold text-white mt-3">
              {analysis.interviewReadiness}%
            </h2>

            <span className="text-pink-400 text-sm">
              Ready
            </span>

          </div>

        </div>

        {/* AI Summary */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-10">

          <h2 className="text-2xl font-bold mb-5">
            🤖 AI Summary
          </h2>

          <p className="text-slate-300 leading-8">
            Your resume demonstrates strong frontend and
            full stack development capabilities. You have
            solid knowledge of React, JavaScript, Node.js
            and project implementation. Based on your
            profile, you are highly suitable for Frontend,
            React and MERN Stack Developer roles.
          </p>

        </div>

        {/* Strengths + Improvements */}

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Resume Strengths
            </h2>

            <div className="space-y-4">

              {analysis.strengths.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle
                    size={20}
                    className="text-green-400"
                  />

                  <span>{item}</span>
                </div>
              ))}

            </div>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Areas To Improve
            </h2>

            <div className="space-y-4">

              {analysis.improvements.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <AlertTriangle
                    size={20}
                    className="text-yellow-400"
                  />

                  <span>{item}</span>
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Recommended Roles */}

        <div className="mb-10">

          <h2 className="text-3xl font-bold mb-6">
            Recommended Roles
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {analysis.roles.map((role) => (
              <div
                key={role.title}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-purple-500 hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold">
                  {role.title}
                </h3>

                <p className="text-purple-300 mt-3">
                  Match Score
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {role.match}
                </h2>
              </div>
            ))}

          </div>

        </div>

        {/* CTA */}

        <div className="flex flex-col md:flex-row justify-center gap-5">

          <button
            className="
            px-10
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-purple-600
            to-pink-600
            font-semibold
            shadow-[0_0_40px_rgba(168,85,247,.4)]
            hover:scale-105
            transition
            flex
            items-center
            gap-2
            "
          >
            Start Resume Based Interview
            <ArrowRight size={18} />
          </button>

          <button
            className="
            px-10
            py-4
            rounded-2xl
            border
            border-white/20
            bg-white/5
            backdrop-blur-xl
            hover:bg-white/10
            transition
            "
          >
            Upload New Resume
          </button>

        </div>

      </div>
    </div>
  );
}