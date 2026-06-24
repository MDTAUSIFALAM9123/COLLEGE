import { useState, useEffect } from "react";
import api from "../lib/api";
import { Brain, User2Icon, LayoutDashboard,
  Mic,
  History,
  FileText,
  BarChart3,
  Trophy,
  Map, Clock } from "lucide-react";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20}/> },
  { id: "start", label: "Start Interview", icon: <Mic size={20}/> },
  { id: "history", label: "Interview History", icon: <History size={20}/> },
  { id: "resume", label: "Resume", icon: <FileText size={20}/> },
  { id: "analysis", label: "Analysis & Reports", icon: <BarChart3 size={20}/> },
  { id: "achievements", label: "Achievements", icon: <Trophy size={20}/> },
  { id: "roadmap", label: "Roadmap", icon: <Map size={20}/> },
];

const ACHIEVEMENTS = [
  { title: "First Interview", desc: "Completed your first mock interview", icon: "🎯", earned: true },
  { title: "High Scorer", desc: "Scored above 9.0 in any interview", icon: "⭐", earned: true },
  { title: "5 in a Row", desc: "Completed 5 interviews this month", icon: "🔥", earned: true },
  { title: "Resume Ready", desc: "Uploaded your resume", icon: "📄", earned: true },
  { title: "Consistent Performer", desc: "Avg score above 8 for 7 days", icon: "📈", earned: false },
  { title: "Master Communicator", desc: "Score 9+ in communication twice", icon: "💬", earned: false },
];

const ROADMAP_STEPS = [
  { step: 1, title: "Profile Setup", desc: "Fill in your skills and target roles", done: true },
  { step: 2, title: "Resume Upload", desc: "Upload your latest resume for analysis", done: true },
  { step: 3, title: "First Mock Interview", desc: "Complete your first practice session", done: true },
  { step: 4, title: "Review Weak Areas", desc: "Check your weak spots in Analysis", done: false },
  { step: 5, title: "10 Interviews Completed", desc: "Practice makes perfect — hit 10 sessions", done: false },
  { step: 6, title: "Score 9+ Consistently", desc: "Maintain excellence across categories", done: false },
];

const ratingColor = (score) => {
  if (score >= 9) return "text-green-500";
  if (score >= 8) return "text-purple-500";
  if (score >= 7) return "text-yellow-500";
  return "text-red-400";
};

const getRatingText = (score) => {
  if (score >= 9) return "Excellent";
  if (score >= 8) return "Good";
  if (score >= 7) return "Average";
  return "Poor";
};

function DashboardPage({ setPage }) {
  const [user, setUser] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    bestScore: 0,
    timePracticed: "0h",
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch current user
      const userRes = await api.get("/auth/me");
      setUser(userRes.data.user);

      // Fetch interview history
      const historyRes = await api.get("/interview/history");
      const attempts = historyRes.data.attempts || [];
      setInterviews(attempts);

      // Calculate stats
      if (attempts.length > 0) {
        const scores = attempts
          .filter(a => a.score !== null && a.score !== undefined)
          .map(a => parseFloat(a.score));
        
        const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
        const bestScore = scores.length > 0 ? Math.max(...scores).toFixed(1) : 0;

        setStats({
          totalInterviews: attempts.length,
          averageScore: avgScore,
          bestScore: bestScore,
          timePracticed: "12h 30m", // This would need duration tracking in backend
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  

  return (
    <div className="space-y-6">
      <div style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }} className="rounded-2xl p-5 text-white shadow">
        <div className="text-xl font-bold">Hello, {user?.name} 👋</div>
        <div className="text-purple-200 text-sm mt-0.5">Ready to practice today?</div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Interviews", value: stats.totalInterviews, sub: "+12 this month", icon: <Mic size={20} /> },
          { label: "Average Score", value: stats.averageScore, sub: getRatingText(stats.averageScore), icon: <BarChart3 size={20} /> },
          { label: "Best Score", value: stats.bestScore, sub: getRatingText(stats.bestScore), icon: <Trophy size={20} /> },
          { label: "Time Practiced", value: stats.timePracticed, sub: "This month", icon: <Clock size={20} /> },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xs text-gray-400 font-medium">{s.label}</div>
            <div className="text-2xl font-bold text-gray-800 mt-1">{s.value}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: "#7c3aed" }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Start Interview", icon: <Mic size={20} />, page: "start", bg: "#7c3aed" },
            { label: "View History", icon: <History size={20} />, page: "history", bg: "#9333ea" },
            { label: "Upload Resume", icon: <FileText size={20} />, page: "resume", bg: "#a855f7" },
            { label: "View Reports", icon: <BarChart3 size={20} />, page: "analysis", bg: "#6d28d9" },
          ].map((a) => (
            <button key={a.label} onClick={() => setPage(a.page)}
              style={{ backgroundColor: a.bg }}
              className="text-white rounded-2xl p-4 text-left transition-all duration-150 active:scale-95 shadow-sm hover:opacity-90">
              <div className="text-2xl mb-2">{a.icon}</div>
              <div className="text-sm font-semibold">{a.label}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-800">Recent Interviews</h2>
          <button onClick={() => setPage("history")} className="text-xs font-medium" style={{ color: "#7c3aed" }}>View All →</button>
        </div>
        <div className="space-y-3">
          {interviews.length > 0 ? (
            interviews.slice(0, 3).map((attempt) => {
              const score = parseFloat(attempt.score) || 0;
              const date = new Date(attempt.startedAt);
              const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              
              return (
                <div key={attempt.id} className="flex items-center justify-between py-2 border-b border-purple-50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{attempt.interview?.title || "Interview"}</div>
                    <div className="text-xs text-gray-400">{formattedDate} · {attempt.interview?.level || "N/A"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">{score.toFixed(1)}</div>
                    <div className={`text-xs font-semibold ${ratingColor(score)}`}>{getRatingText(score)}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-4 text-gray-400">No interviews yet. Start your first interview!</div>
          )}
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
        <h2 className="font-semibold text-gray-800 mb-4">Skill Breakdown</h2>
        {[
          { label: "Communication", score: 7.5 },
          { label: "Technical Skills", score: 8.0 },
          { label: "Problem Solving", score: 7.8 },
          { label: "Confidence", score: 7.2 },
          { label: "Answer Relevance", score: 8.1 },
        ].map((s) => (
          <div key={s.label} className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 font-medium">{s.label}</span>
              <span className="font-bold text-gray-800">{s.score}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "#f3e8ff" }}>
              <div className="h-full rounded-full" style={{ width: `${s.score * 10}%`, background: "linear-gradient(to right,#7c3aed,#a855f7)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

 function StartInterviewPage({ setPage }) {
  const [selected, setSelected] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interviewsLoading, setInterviewsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // ---------------- CATEGORIES ----------------
  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");

      const categoryIcons = {
        Frontend: "💻",
        Backend: "⚙️",
        "Full Stack": "🔧",
        DSA: "🧩",
        HR: "🤝",
        "System Design": "🏗️",
      };

      const formatted = res.data.categories.map((cat) => ({
        id: cat.id,
        label: cat.name,
        icon: categoryIcons[cat.name] || "📚",
        desc: `${cat._count?.interviews || 0} interviews · ${
          cat._count?.questions || 0
        } questions`,
      }));

      setCategories(formatted);
    } catch (err) {
      console.error("Category error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- INTERVIEWS ----------------
  const fetchInterviewsForCategory = async (categoryId) => {
    setInterviewsLoading(true);

    try {
      const res = await api.get("/interview");

      console.log("ALL INTERVIEWS:", res.data.interviews);

      // FIX: string comparison issue
      const filtered = res.data.interviews.filter(
        (i) => String(i.categoryId) === String(categoryId)
      );

      console.log("FILTERED:", filtered);

      setInterviews(filtered);
    } catch (err) {
      console.error("Interview error:", err);
    } finally {
      setInterviewsLoading(false);
    }
  };

  // ---------------- CATEGORY CLICK ----------------
  const handleCategorySelect = (categoryId) => {
    setSelected(categoryId);
    setSelectedInterview(null);
    setInterviews([]);
    fetchInterviewsForCategory(categoryId);
  };

  // ---------------- START INTERVIEW ----------------
  const handleStartInterview = async () => {
    if (!selectedInterview) {
      alert("Please select an interview");
      return;
    }

    try {
      const res = await api.post("/interview/start", {
        interviewId: selectedInterview,
      });

      console.log("Started:", res.data);
      alert("Interview started!");
    } catch (err) {
      console.error(err);
      alert("Failed to start interview");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white p-6 rounded-2xl">
        <h2 className="text-xl font-bold">🎤 Ready to Practice?</h2>
        <p className="text-sm opacity-80">
          Pick category and start interview
        </p>
      </div>

      {/* CATEGORIES */}
      <div>
        <h3 className="text-xs uppercase text-gray-500 mb-3">
          Choose Category
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategorySelect(c.id)}
              className="p-4 rounded-xl border bg-white text-left"
              style={{
                borderColor:
                  selected === c.id ? "#7c3aed" : "#e5e7eb",
                background: selected === c.id ? "#f5f3ff" : "white",
              }}
            >
              <div className="text-2xl">{c.icon}</div>
              <div className="font-semibold text-sm">{c.label}</div>
              <div className="text-xs text-gray-400">{c.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* INTERVIEWS */}
      {selected && (
        <div className="bg-white p-5 rounded-xl border space-y-4">
          <h3 className="font-semibold">Available Interviews</h3>

          {interviewsLoading ? (
            <p>Loading interviews...</p>
          ) : interviews.length > 0 ? (
            <div className="space-y-2">
              {interviews.map((interview) => (
                <div key={interview.id}>
                  <button
                    onClick={() =>
                      setSelectedInterview(interview.id)
                    }
                    className="w-full text-left p-3 rounded-xl border"
                    style={{
                      borderColor:
                        selectedInterview === interview.id
                          ? "#7c3aed"
                          : "#ddd",
                      background:
                        selectedInterview === interview.id
                          ? "#f5f3ff"
                          : "white",
                    }}
                  >
                    <div className="font-medium">
                      {interview.title}
                    </div>

                    <div className="text-xs text-gray-500">
                      Level: {interview.level} • Questions:{" "}
                      {interview._count?.questions || 0}
                    </div>

                    {/* 🔥 QUESTIONS SHOW FIX */}
                    
<div className="mt-3 space-y-2">
  {interview.questions?.slice(0, 3).map((q) => (
    <div
      key={q.id}
      className="text-xs text-gray-700 bg-gray-50 p-2 rounded-lg"
    >
      <div className="flex gap-2">
        <span className="text-purple-500">•</span>
        <span>{q.question}</span>
      </div>

      <div className="text-[10px] text-gray-400 mt-1">
        Difficulty: {q.difficulty}
      </div>
    </div>
  ))}
</div>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No interviews found
            </p>
          )}

          <button
            onClick={handleStartInterview}
            disabled={!selectedInterview}
            className="w-full py-3 rounded-xl text-white font-semibold disabled:opacity-50"
            style={{
              background:
                "linear-gradient(135deg,#7c3aed,#a855f7)",
            }}
          >
            🚀 Start Interview
          </button>
        </div>
      )}
    </div>
  );
}

function HistoryPage() {
  const [filter, setFilter] = useState("All");
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const filters = ["All", "Excellent", "Good", "Average"];

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/interview/history");
      setInterviews(res.data.attempts || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching history:", error);
      setLoading(false);
    }
  };

  const getRating = (score) => {
    if (score >= 9) return "Excellent";
    if (score >= 8) return "Good";
    if (score >= 7) return "Average";
    return "Poor";
  };

  const getRatingColorByText = (rating) => {
    if (rating === "Excellent") return "text-green-500";
    if (rating === "Good") return "text-purple-500";
    if (rating === "Average") return "text-yellow-500";
    return "text-red-400";
  };

  const filtered = filter === "All" 
    ? interviews 
    : interviews.filter((iv) => getRating(parseFloat(iv.score)) === filter);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-5">
      <div style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }} className="rounded-2xl p-5 text-white shadow">
        <div className="text-xl font-bold mb-1">📋 Interview History</div>
        <p className="text-purple-200 text-sm">All your past sessions in one place.</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border"
            style={{ background: filter === f ? "#7c3aed" : "white", color: filter === f ? "white" : "#6b7280", borderColor: filter === f ? "#7c3aed" : "#e9d5ff" }}>
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((iv) => {
            const score = parseFloat(iv.score) || 0;
            const rating = getRating(score);
            const date = new Date(iv.startedAt);
            const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            
            return (
              <div key={iv.id} className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-800">{iv.interview?.title || "Interview"}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{formattedDate} · {iv.interview?.level || "N/A"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{score.toFixed(1)}</div>
                    <div className={`text-xs font-semibold ${getRatingColorByText(rating)}`}>{rating}</div>
                  </div>
                </div>
                <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "#f3e8ff" }}>
                  <div className="h-full rounded-full" style={{ width: `${score * 10}%`, background: "linear-gradient(to right,#7c3aed,#a855f7)" }} />
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 py-1.5 text-xs rounded-xl font-medium transition-colors border" style={{ borderColor: "#e9d5ff", color: "#7c3aed" }}>👁️ View Report</button>
                  <button className="flex-1 py-1.5 text-xs rounded-xl border border-gray-200 text-gray-600 font-medium">🔁 Retake</button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-400">No interviews yet. Start your first interview!</div>
        )}
      </div>
    </div>
  );
}

function ResumePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserResume();
  }, []);

  const fetchUserResume = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching resume:", error);
      setLoading(false);
    }
  };

  const handleUploadResume = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchUserResume();
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to upload resume");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const resumeUrl = user?.ResumeUrl;
  const fileName = resumeUrl?.split("/").pop() || "No resume uploaded";

  return (
    <div className="space-y-5">
      <div style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }} className="rounded-2xl p-5 text-white shadow">
        <div className="text-xl font-bold mb-1">📄 My Resume</div>
        <p className="text-purple-200 text-sm">Upload your resume to get personalised interview questions.</p>
      </div>
      {resumeUrl ? (
        <>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "#f3e8ff" }}>📄</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{fileName}</div>
                <div className="text-xs text-gray-400">Resume uploaded · <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">View</a></div>
              </div>
              <button onClick={() => alert("Delete feature coming soon")} className="text-xs text-red-400 font-medium">Remove</button>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-50 grid grid-cols-3 gap-3 text-center">
              {[{ label: "Skills Found", val: "Analyzing..." }, { label: "Experience", val: "N/A" }, { label: "Match Score", val: "N/A" }].map((s) => (
                <div key={s.label}>
                  <div className="text-lg font-bold" style={{ color: "#7c3aed" }}>{s.val}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full text-white font-semibold py-3 rounded-2xl transition-all active:scale-95 shadow"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}>
            🎤 Start Resume-Based Interview
          </button>
        </>
      ) : (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100 text-center">
          <div className="text-4xl mb-3">📄</div>
          <p className="text-gray-600 mb-4">No resume uploaded yet</p>
          <input type="file" id="resume-input" accept=".pdf,.doc,.docx" onChange={handleUploadResume} className="hidden" />
          <button className="text-white font-semibold py-3 px-6 rounded-2xl transition-all active:scale-95 shadow cursor-pointer"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }} onClick={() => document.getElementById('resume-input').click()}>
            📤 Upload Resume
          </button>
        </div>
      )}
    </div>
  );
}

function AnalysisPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const res = await api.get("/interview/history");
      setInterviews(res.data.attempts || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analysis:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Calculate statistics
  const scores = interviews
    .filter(i => i.score !== null && i.score !== undefined)
    .map(i => parseFloat(i.score));

  const overallScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
  const stars = Math.round(overallScore / 2);

  const getPerformanceText = (score) => {
    if (score >= 9) return "Excellent Performance";
    if (score >= 8) return "Good Performance";
    if (score >= 7) return "Average Performance";
    return "Needs Improvement";
  };

  const getRecommendation = (score) => {
    if (score >= 9) return "Keep up the great work! Maintain this level of excellence.";
    if (score >= 8) return "Good progress! Focus on weak areas to improve further.";
    if (score >= 7) return "You're on the right track! Practice more to improve.";
    return "Keep practicing! Consistency will help you improve.";
  };

  // Mock category scores based on overall score
  const categoryScores = [
    { label: "Communication", score: Math.max(0, Math.min(10, overallScore + 0.5)) },
    { label: "Technical Skills", score: Math.max(0, Math.min(10, overallScore)) },
    { label: "Problem Solving", score: Math.max(0, Math.min(10, overallScore - 0.2)) },
    { label: "Confidence", score: Math.max(0, Math.min(10, overallScore - 0.8)) },
    { label: "Answer Relevance", score: Math.max(0, Math.min(10, overallScore + 0.3)) },
  ];

  // Get weak areas (only show if there are interviews)
  const weakAreas = interviews.length > 0 
    ? categoryScores.filter(c => c.score < 7.5).sort((a, b) => a.score - b.score)
    : [];

  // Group interviews by month
  const monthlyData = {};
  interviews.forEach(iv => {
    const date = new Date(iv.startedAt);
    const month = date.toLocaleString("en-US", { month: "short" });
    if (!monthlyData[month]) monthlyData[month] = [];
    monthlyData[month].push(parseFloat(iv.score) || 0);
  });

  const monthlyScores = Object.entries(monthlyData).map(([month, scores]) => ({
    month,
    score: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
  }));

  return (
    <div className="space-y-5">
      <div style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }} className="rounded-2xl p-5 text-white shadow">
        <div className="text-xl font-bold mb-1">📊 Analysis & Reports</div>
        <p className="text-purple-200 text-sm">Deep dive into how you're performing.</p>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full flex flex-col items-center justify-center flex-shrink-0 border-4" style={{ borderColor: "#7c3aed" }}>
          <div className="text-2xl font-bold text-gray-800">{overallScore}</div>
          <div className="text-xs text-gray-400">Overall</div>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-800 mb-0.5">{getPerformanceText(overallScore)}</div>
          <div className="text-sm text-gray-500">{getRecommendation(overallScore)}</div>
          <div className="flex gap-1 mt-2">{"★★★★★".split("").map((s, i) => <span key={i} style={{ color: i < stars ? "#a855f7" : "#e9d5ff" }}>{s}</span>)}</div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
        <h3 className="font-semibold text-gray-800 mb-4">Category Scores</h3>
        {categoryScores.map((s) => (
          <div key={s.label} className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 font-medium">{s.label}</span>
              <span className="font-bold text-gray-800">{s.score.toFixed(1)} / 10</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#f3e8ff" }}>
              <div className="h-full rounded-full" style={{ width: `${s.score * 10}%`, background: "linear-gradient(to right,#7c3aed,#a855f7)" }} />
            </div>
          </div>
        ))}
      </div>
      {weakAreas.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
          <h3 className="font-semibold text-gray-800 mb-3">⚠️ Weak Areas</h3>
          <div className="space-y-2">
            {weakAreas.map((w) => (
              <div key={w.label} className="px-4 py-3 rounded-xl border text-sm" style={{ background: "#fef2f2", borderColor: "#fecaca" }}>
                <div className="font-semibold" style={{ color: "#b91c1c" }}>{w.label}</div>
                <div className="text-xs mt-0.5 opacity-80" style={{ color: "#b91c1c" }}>Score: {w.score.toFixed(1)} — Focus on improving this area</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {monthlyScores.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
          <h3 className="font-semibold text-gray-800 mb-4">Progress Chart</h3>
          <div className="flex items-end gap-2 h-28">
            {monthlyScores.slice(-7).map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs text-gray-500 font-medium">{m.score}</div>
                <div className="w-full rounded-t-lg" style={{ height: `${(m.score / 10) * 80}px`, background: "linear-gradient(to top,#7c3aed,#c084fc)" }} />
                <div className="text-xs text-gray-400">{m.month}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <button className="w-full font-semibold py-3 rounded-2xl transition-all active:scale-95 border"
        style={{ borderColor: "#7c3aed", color: "#7c3aed" }}>
        📥 Download Full Report
      </button>
    </div>
  );
}

function AchievementsPage() {
  const [interviews, setInterviews] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const historyRes = await api.get("/interview/history");
      const userRes = await api.get("/auth/me");
      setInterviews(historyRes.data.attempts || []);
      setUser(userRes.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Calculate achievements
  const achievementsList = [
    {
      title: "First Interview",
      desc: "Completed your first mock interview",
      icon: "🎯",
      earned: interviews.length >= 1,
    },
    {
      title: "High Scorer",
      desc: "Scored above 9.0 in any interview",
      icon: "⭐",
      earned: interviews.some(i => parseFloat(i.score) >= 9),
    },
    {
      title: "5 in a Row",
      desc: "Completed 5 interviews this month",
      icon: "🔥",
      earned: interviews.length >= 5,
    },
    {
      title: "Resume Ready",
      desc: "Uploaded your resume",
      icon: "📄",
      earned: !!user?.ResumeUrl,
    },
    {
      title: "Consistent Performer",
      desc: "Avg score above 8 for 7+ interviews",
      icon: "📈",
      earned: interviews.length >= 7 && 
        (interviews.slice(-7).reduce((sum, i) => sum + parseFloat(i.score), 0) / 7) >= 8,
    },
    {
      title: "Master Communicator",
      desc: "Score 9+ in communication twice",
      icon: "💬",
      earned: interviews.filter(i => parseFloat(i.score) >= 9).length >= 2,
    },
  ];

  const earned = achievementsList.filter((a) => a.earned).length;

  return (
    <div className="space-y-5">
      <div style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }} className="rounded-2xl p-5 text-white shadow">
        <div className="text-xl font-bold mb-1">🏆 Achievements</div>
        <p className="text-purple-200 text-sm">{earned} of {achievementsList.length} unlocked — keep going!</p>
        <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.3)" }}>
          <div className="h-full bg-white rounded-full" style={{ width: `${(earned / achievementsList.length) * 100}%` }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {achievementsList.map((a) => (
          <div key={a.title} className="rounded-2xl p-4 border"
            style={{ background: a.earned ? "white" : "#faf5ff", borderColor: a.earned ? "#e9d5ff" : "#f3e8ff", opacity: a.earned ? 1 : 0.6 }}>
            <div className="text-3xl mb-2">{a.icon}</div>
            <div className="text-sm font-semibold text-gray-800">{a.title}</div>
            <div className="text-xs text-gray-400 mt-0.5 leading-snug">{a.desc}</div>
            {a.earned && (
              <div className="mt-2 inline-block px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "#f3e8ff", color: "#7c3aed" }}>✓ Earned</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapPage({ setPage }) {
  const [interviews, setInterviews] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const historyRes = await api.get("/interview/history");
      const userRes = await api.get("/auth/me");
      setInterviews(historyRes.data.attempts || []);
      setUser(userRes.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Calculate roadmap steps based on user progress
  const roadmapSteps = [
    { 
      step: 1, 
      title: "Profile Setup", 
      desc: "Fill in your skills and target roles", 
      done: !!user?.name 
    },
    { 
      step: 2, 
      title: "Resume Upload", 
      desc: "Upload your latest resume for analysis", 
      done: !!user?.ResumeUrl 
    },
    { 
      step: 3, 
      title: "First Mock Interview", 
      desc: "Complete your first practice session", 
      done: interviews.length >= 1 
    },
    { 
      step: 4, 
      title: "Review Weak Areas", 
      desc: "Check your weak spots in Analysis", 
      done: interviews.length >= 2 
    },
    { 
      step: 5, 
      title: "10 Interviews Completed", 
      desc: "Practice makes perfect — hit 10 sessions", 
      done: interviews.length >= 10 
    },
    { 
      step: 6, 
      title: "Score 9+ Consistently", 
      desc: "Maintain excellence across categories", 
      done: interviews.filter(i => parseFloat(i.score) >= 9).length >= 3 
    },
  ];

  const done = roadmapSteps.filter((s) => s.done).length;
  const nextIncompleteStep = roadmapSteps.find(s => !s.done);

  return (
    <div className="space-y-5">
      <div style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }} className="rounded-2xl p-5 text-white shadow">
        <div className="text-xl font-bold mb-1">🗺️ Your Roadmap</div>
        <p className="text-purple-200 text-sm">{done} of {roadmapSteps.length} steps completed — you're doing great!</p>
        <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.3)" }}>
          <div className="h-full bg-white rounded-full" style={{ width: `${(done / roadmapSteps.length) * 100}%` }} />
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5" style={{ background: "#e9d5ff" }} />
        <div className="space-y-4">
          {roadmapSteps.map((s) => (
            <div key={s.step} className="relative flex gap-4 pl-12">
              <div className="absolute left-2.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: s.done ? "#7c3aed" : "white", color: s.done ? "white" : "#9ca3af", border: s.done ? "none" : "2px solid #e9d5ff" }}>
                {s.done ? "✓" : s.step}
              </div>
              <div className="rounded-2xl p-4 border flex-1" style={{ background: "white", borderColor: s.done ? "#e9d5ff" : "#f3f4f6" }}>
                <div className="flex items-center justify-between">
                  <div className={`text-sm font-semibold ${s.done ? "text-gray-800" : "text-gray-400"}`}>{s.title}</div>
                  {s.done && <span className="text-xs font-medium" style={{ color: "#7c3aed" }}>Done ✓</span>}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {nextIncompleteStep && (
        <div className="rounded-2xl p-4 text-center border" style={{ background: "#faf5ff", borderColor: "#e9d5ff" }}>
          <div className="text-sm font-semibold" style={{ color: "#6d28d9" }}>Next Goal</div>
          <div className="text-xs mt-1" style={{ color: "#7c3aed" }}>{nextIncompleteStep.desc}</div>
          <button onClick={() => setPage(nextIncompleteStep.step === 3 ? "start" : nextIncompleteStep.step === 2 ? "resume" : "analysis")}
            className="mt-3 text-white text-sm px-5 py-2 rounded-xl font-medium transition-all active:scale-95 shadow"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}>
            Get Started →
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const pages = {
    dashboard: <DashboardPage setPage={setPage} />,
    start: <StartInterviewPage setPage={setPage} />,
    history: <HistoryPage />,
    resume: <ResumePage />,
    analysis: <AnalysisPage />,
    achievements: <AchievementsPage />,
    roadmap: <RoadmapPage setPage={setPage} />,
  };

  const currentNav = NAV_ITEMS.find((n) => n.id === page);

  return (
    <div className="min-h-screen font-sans flex" style={{ background: "#faf5ff" }}>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside
        className={`fixed left-0 top-0 h-full w-64 z-30 flex flex-col transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "white", borderRight: "1px solid #e9d5ff" }}>
        <div className="p-5" style={{ borderBottom: "1px solid #f3e8ff" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: "#7c3aed" }}>
              <Brain />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm">CrackitAI</div>
              <div className="text-xs text-gray-400">Practice · Improve · Succeed</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "#f3e8ff" }}><User2Icon /></div>
            <div>
              <div className="text-sm font-semibold text-gray-800">{user?.name || "User"}</div>
              <div className="text-xs text-gray-400">{user?.role || "Member"}</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => { setPage(item.id); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
              style={{ background: page === item.id ? "#7c3aed" : "transparent", color: page === item.id ? "white" : "#6b7280" }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4" style={{ borderTop: "1px solid #f3e8ff" }}>
          <div className="rounded-xl p-3 text-center" style={{ background: "#faf5ff", border: "1px solid #e9d5ff" }}>
            <div className="text-xs font-semibold mb-1" style={{ color: "#6d28d9" }}>Free Plan</div>
            <div className="text-xs text-gray-500 mb-2">5 interviews left this month</div>
            <button className="w-full text-white text-xs py-1.5 rounded-lg font-medium" style={{ background: "#7c3aed" }}>Upgrade to Pro</button>
          </div>
        </div>
      </aside>
      <div className="flex-1 lg:ml-64 flex flex-col">
        <header className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3"
          style={{ background: "white", borderBottom: "1px solid #e9d5ff" }}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl" style={{ color: "#7c3aed" }}>☰</button>
          <div className="flex-1 flex items-center gap-2">
            <span className="text-lg">{currentNav?.icon}</span>
            <span className="font-semibold text-gray-800 text-sm">{currentNav?.label}</span>
          </div>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "#f3e8ff" }}>🔔</button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "#f3e8ff" }}><User2Icon /></div>
        </header>
        <main className="flex-1 p-4 max-w-6xl mx-auto w-full">{pages[page]}</main>
        <nav className="lg:hidden sticky bottom-0 px-2 py-2 flex justify-around"
          style={{ background: "white", borderTop: "1px solid #e9d5ff" }}>
          {NAV_ITEMS.slice(0, 5).map((item) => (
            <button key={item.id} onClick={() => setPage(item.id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors"
              style={{ color: page === item.id ? "#7c3aed" : "#9ca3af" }}>
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs font-medium leading-none">{item.label.split(" ")[0]}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}