import {
  Mic,
  FileText,
  BarChart3,
  MessageSquare,
  RotateCcw,
  TrendingUp,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "AI Voice Interview",
      icon: Mic,
      description:
        "Practice realistic voice conversations with our intelligent AI interviewer.",
    },
    {
      title: "Resume Based Q&A",
      icon: FileText,
      description:
        "Get personalized interview questions generated from your resume.",
    },
    {
      title: "Performance Analytics",
      icon: BarChart3,
      description:
        "Track your scores, strengths, and areas where you need improvement.",
    },
    {
      title: "Smart Feedback",
      icon: MessageSquare,
      description:
        "Receive detailed AI feedback after every mock interview session.",
    },
    {
      title: "Retry Interviews",
      icon: RotateCcw,
      description:
        "Retry previous interviews and improve your confidence over time.",
    },
    {
      title: "Progress Tracking",
      icon: TrendingUp,
      description:
        "Monitor your growth and visualize your interview preparation journey.",
    },
  ];

  return (
    <section id="features" className="bg-[#09051f] text-white py-24 px-8">
      {/* Heading */}
      <div className="text-center">
        <span className="bg-purple-900/40 text-purple-300 px-4 py-2 rounded-full">
          Why Choose CrackitAI
        </span>

        <h2 className="text-5xl font-bold mt-5">Powerful AI Features</h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Experience next-generation interview preparation with intelligent AI
          tools.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-7 mt-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              className="
                bg-[#171036]
                border border-purple-900/40
                rounded-3xl
                p-7
                hover:-translate-y-3
                hover:border-purple-500
                hover:shadow-[0_0_30px_#7e22ce]
                transition-all
                duration-300
                cursor-pointer
              "
            >
              {/* Icon */}
              <div
                className="
                  w-16 h-16
                  rounded-2xl
                  bg-linear-to-r
                  from-purple-600
                  to-purple-800
                  flex items-center justify-center
                  shadow-lg
                "
              >
                <Icon size={30} />
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold">{feature.title}</h3>

              {/* Description */}
              <p className="mt-3 text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
