import { Brain, Upload, Mic, BarChart3 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Brain,
      title: "Choose Category",
      description:
        "Select your desired role and begin your personalized AI interview journey.",
    },
    {
      icon: Upload,
      title: "Upload Resume",
      description:
        "Upload your resume to receive AI-generated questions based on your skills.",
    },
    {
      icon: Mic,
      title: "Start Interview",
      description:
        "Talk with your AI interviewer through a real-time voice-based interview.",
    },
    {
      icon: BarChart3,
      title: "Get Feedback",
      description:
        "Receive detailed analysis, scores, and suggestions to improve.",
    },
  ];

  return (
    <section className="bg-white py-24 px-8">
      {/* Heading */}
      <div className="text-center">
        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium">
          Simple Process
        </span>

        <h2 className="text-5xl font-bold mt-5 text-gray-900">
          How CrackitAI Works
        </h2>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Practice smarter with our AI-powered interview system in just a few
          easy steps.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 mt-16">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="
                relative
                bg-white
                border border-purple-100
                rounded-3xl
                p-7
                text-center
                shadow-lg
                hover:-translate-y-3
                hover:shadow-purple-300
                transition-all
                duration-300
              "
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 mx-auto mt-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Icon size={30} className="text-purple-600" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mt-5 text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 mt-3 text-sm">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
