import { Brain, Target, Rocket, Sparkles, CheckCircle } from "lucide-react";

export default function About() {
  const features = [
    "AI-powered realistic mock interviews",
    "Personalized questions based on your resume",
    "Real-time voice interaction and analysis",
    "Detailed performance reports and feedback",
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#09051f] text-white py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-900/50 px-4 py-2 rounded-full text-purple-300">
            <Sparkles size={18} />
            About CrackitAI
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mt-6">
            Revolutionizing Interview Preparation
            <span className="text-purple-400"> with AI</span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg max-w-3xl mx-auto">
            CrackitAI is your intelligent interview companion designed to help
            students and professionals practice smarter, gain confidence, and
            crack their dream jobs through AI-powered mock interviews.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-purple-50 p-8 rounded-3xl shadow-lg border border-purple-100">
            <div className="bg-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center text-white">
              <Target />
            </div>

            <h2 className="text-3xl font-bold mt-6">Our Mission</h2>

            <p className="text-gray-600 mt-4 leading-7">
              We aim to make interview preparation accessible, intelligent, and
              personalized for everyone using advanced AI technology.
            </p>
          </div>

          <div className="bg-[#09051f] text-white p-8 rounded-3xl shadow-xl">
            <div className="bg-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center">
              <Rocket />
            </div>

            <h2 className="text-3xl font-bold mt-6">Our Vision</h2>

            <p className="text-gray-300 mt-4 leading-7">
              To become the world's most trusted AI interview platform,
              empowering millions of learners to build confidence and achieve
              their career goals.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white pb-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
              Why Choose Us
            </span>

            <h2 className="text-5xl font-bold mt-6">Why Choose CrackitAI?</h2>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {features.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white
                  p-6
                  rounded-2xl
                  shadow-lg
                  border border-purple-100
                  flex items-start gap-4
                  hover:-translate-y-2
                  transition
                "
              >
                <div className="bg-purple-100 p-3 rounded-xl">
                  <CheckCircle className="text-purple-600" />
                </div>

                <p className="text-gray-700 text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 pb-24">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-[#09051f] to-purple-900 rounded-3xl p-12 text-center text-white">
          <Brain size={55} className="mx-auto text-purple-400" />

          <h2 className="text-4xl font-bold mt-5">
            Ready to Transform Your Interview Journey?
          </h2>

          <p className="mt-4 text-gray-300">
            Start practicing with AI and take the first step toward your dream
            career.
          </p>

          <button
            className="
            mt-8
            bg-purple-600
            px-8 py-4
            rounded-2xl
            font-semibold
            hover:bg-purple-700
            transition
          "
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
