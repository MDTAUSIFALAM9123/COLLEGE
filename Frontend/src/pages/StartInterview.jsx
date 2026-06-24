import { useNavigate } from "react-router-dom";
import {
Brain,
Clock,
Target,
Briefcase,
CheckCircle,
ArrowRight,
} from "lucide-react";
import api from "../lib/api";
export default function StartInterview() {
const navigate = useNavigate();
const handleStartInterview = async () => {
  try {

    const res = await api.post("/interview/start", {
      interviewId: "02c9aa8-e882-4933-ba27-0de806d99a2",
      type: "resume",
    });

    localStorage.setItem(
  "attemptId",
  res.data.data.attemptId
);

localStorage.setItem(
  "questions",
  JSON.stringify(
    res.data.data.questions
  )
);
navigate("/interview");

  } catch (err) {
    console.log(err);
  }
};

return (
<div className="min-h-screen bg-gradient-to-br from-[#0C033E] via-[#14045C] to-[#1A0B70] text-white relative overflow-hidden">

  {/* Glow Effects */}

  <div className="absolute top-10 left-10 h-72 w-72 bg-purple-500/20 blur-[150px] rounded-full" />

  <div className="absolute bottom-10 right-10 h-72 w-72 bg-blue-500/20 blur-[150px] rounded-full" />

  <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

    {/* Hero */}

    <div className="text-center mb-14">

      <h1 className="text-5xl md:text-6xl font-black">
        Ready For Your Interview?
      </h1>

      <p className="text-slate-300 mt-4 text-lg">
        Your resume has been analyzed. AI is ready to conduct
        a personalized interview based on your profile.
      </p>

    </div>

    {/* Summary Cards */}

    <div className="grid md:grid-cols-3 gap-6 mb-10">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">

        <Target
          size={40}
          className="mx-auto text-purple-400 mb-4"
        />

        <p className="text-slate-300">
          Resume Match
        </p>

        <h2 className="text-5xl font-bold mt-3">
          94%
        </h2>

      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">

        <Brain
          size={40}
          className="mx-auto text-cyan-400 mb-4"
        />

        <p className="text-slate-300">
          Expected Score
        </p>

        <h2 className="text-5xl font-bold mt-3">
          85%
        </h2>

      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">

        <Clock
          size={40}
          className="mx-auto text-pink-400 mb-4"
        />

        <p className="text-slate-300">
          Duration
        </p>

        <h2 className="text-5xl font-bold mt-3">
          15m
        </h2>

      </div>

    </div>

    {/* Interview Details */}

    <div className="grid lg:grid-cols-2 gap-8 mb-10">

      {/* AI Interviewer */}

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          🤖 AI Interviewer
        </h2>

        <div className="space-y-4">

          <div className="flex gap-3">
            <CheckCircle className="text-green-400" />
            <span>Resume-Based Questions</span>
          </div>

          <div className="flex gap-3">
            <CheckCircle className="text-green-400" />
            <span>Real-time Evaluation</span>
          </div>

          <div className="flex gap-3">
            <CheckCircle className="text-green-400" />
            <span>Personalized Feedback</span>
          </div>

          <div className="flex gap-3">
            <CheckCircle className="text-green-400" />
            <span>Performance Analysis</span>
          </div>

        </div>

      </div>

      {/* Candidate */}

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          👤 Candidate Status
        </h2>

        <div className="space-y-4">

          <div className="flex gap-3">
            <CheckCircle className="text-green-400" />
            <span>Resume Uploaded</span>
          </div>

          <div className="flex gap-3">
            <CheckCircle className="text-green-400" />
            <span>Profile Analyzed</span>
          </div>

          <div className="flex gap-3">
            <CheckCircle className="text-green-400" />
            <span>Interview Ready</span>
          </div>

          <div className="flex gap-3">
            <CheckCircle className="text-green-400" />
            <span>Microphone Ready</span>
          </div>

        </div>

      </div>

    </div>

    {/* Rules */}

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-10">

      <h2 className="text-2xl font-bold mb-6">
        Interview Instructions
      </h2>

      <div className="grid md:grid-cols-2 gap-4 text-slate-300">

        <p>✓ Answer clearly and confidently</p>
        <p>✓ Take your time before answering</p>
        <p>✓ Focus on technical accuracy</p>
        <p>✓ AI evaluates every response</p>

      </div>

    </div>

    {/* CTA */}

    <div className="text-center">

      <button
       onClick={handleStartInterview}
        className="
        inline-flex
        items-center
        gap-3
        px-10
        py-5
        rounded-2xl
        bg-gradient-to-r
        from-purple-600
        to-pink-600
        text-lg
        font-semibold
        shadow-[0_0_40px_rgba(168,85,247,.4)]
        hover:scale-105
        transition
        "
      >
        Start Interview
        <ArrowRight size={20} />
      </button>

    </div>

  </div>
</div>

);
}