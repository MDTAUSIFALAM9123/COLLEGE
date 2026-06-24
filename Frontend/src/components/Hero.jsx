export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#050014] to-[#0C033E] text-white px-8 py-20">
      {" "}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="bg-[#7746DC] px-3 py-1 rounded-full text-sm">
            AI Powered Interview Platform
          </span>

          <h1 className="text-6xl font-bold mt-6">
            Practice Interviews.
            <br />
            <span className="text-[#7c4ed9]">Improve. Succeed.</span>
          </h1>

          <p className="mt-6 text-gray-300">
            AI-powered mock interviews with real-time feedback and analytics.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-[#7746DC] px-6 py-3 rounded-lg">
              Start Interview
            </button>

            <button className="border px-6 py-3 rounded-lg">Watch Demo</button>
          </div>
        </div>

        <div className="flex justify-center">
          <img src="/public/robot.png" alt="robot" className="w-112.5" />
        </div>
      </div>
    </section>
  );
}
