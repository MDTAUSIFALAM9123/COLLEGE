import { useState, useEffect } from "react";
import { Mic, PhoneOff, Volume2, Brain } from "lucide-react";

export default function VoiceInterview() {
const [timeLeft, setTimeLeft] = useState(900);
const [status, setStatus] = useState("Listening");
const [transcript, setTranscript] = useState(
"Your answer will appear here..."
);

const [question] = useState(
"Tell me about yourself and explain your experience with React."
);

useEffect(() => {
const timer = setInterval(() => {
setTimeLeft((prev) => {
if (prev <= 1) {
clearInterval(timer);
return 0;
}

    return prev - 1;
  });
}, 1000);

return () => clearInterval(timer);

}, []);

const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
const seconds = String(timeLeft % 60).padStart(2, "0");

return (
<div className="min-h-screen bg-[#070B1A] text-white">
{/* Header */}

  <div className="border-b border-white/10 px-8 py-5 flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-bold">
        AI Voice Interview
      </h1>

      <p className="text-slate-400">
        Frontend Developer • Question 1 of 10
      </p>
    </div>

    <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
      {minutes}:{seconds}
    </div>
  </div>

  <div className="max-w-5xl mx-auto px-6 py-10">
    {/* AI Orb */}

    <div className="flex justify-center">
      <div className="relative">
        <div className="h-44 w-44 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-pulse blur-sm" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Brain size={52} />
        </div>
      </div>
    </div>

    <div className="text-center mt-6">
      <h2 className="text-xl font-semibold">
        AI Interview Assistant
      </h2>

      <p className="text-purple-400 mt-2">
        ● {status}
      </p>
    </div>

    {/* Question */}

    <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
      <p className="text-purple-300 mb-3">
        Current Question
      </p>

      <h2 className="text-3xl font-bold leading-relaxed">
        {question}
      </h2>
    </div>

    {/* Transcript */}

    <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">
      <h3 className="text-lg font-semibold mb-4">
        Live Transcript
      </h3>

      <p className="text-slate-300 leading-8">
        {transcript}
      </p>
    </div>

    {/* Controls */}

    <div className="flex justify-center gap-6 mt-12">
      <button
        className="
          h-16
          w-16
          rounded-full
          bg-white/10
          flex
          items-center
          justify-center
        "
      >
        <Volume2 />
      </button>

      <button
        className="
          h-24
          w-24
          rounded-full
          bg-gradient-to-r
          from-purple-600
          to-pink-600
          shadow-[0_0_60px_rgba(168,85,247,.5)]
          flex
          items-center
          justify-center
        "
      >
        <Mic size={34} />
      </button>

      <button
        className="
          h-16
          w-16
          rounded-full
          bg-red-500/20
          flex
          items-center
          justify-center
        "
      >
        <PhoneOff />
      </button>
    </div>
  </div>
</div>

);
}
