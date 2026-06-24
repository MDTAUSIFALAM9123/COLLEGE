import {
  Code2,
  Monitor,
  Server,
  Coffee,
  FileCode,
  BarChart3,
  Cloud,
  Brain,
  ArrowRight,
} from "lucide-react";

export default function Categories() {
  const categories = [
    {
      title: "Full Stack Developer",
      icon: Code2,
    },
    {
      title: "Frontend Developer",
      icon: Monitor,
    },
    {
      title: "Backend Developer",
      icon: Server,
    },
    {
      title: "Java Developer",
      icon: Coffee,
    },
    {
      title: "Python Developer",
      icon: FileCode,
    },
    {
      title: "Data Analyst",
      icon: BarChart3,
    },
    {
      title: "DevOps Engineer",
      icon: Cloud,
    },
    {
      title: "AI/ML Engineer",
      icon: Brain,
    },
  ];

  return (
    <section className="py-20 px-8 bg-[#050014] text-white">
      <h2 className="text-5xl font-bold text-center">
        Choose Your
        <span className="text-purple-500"> Interview Path</span>
      </h2>

      <p className="text-center text-gray-400 mt-4 mb-12">
        Select your domain and start practicing AI-powered interviews
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {categories.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                bg-[#0b0625]
                border border-purple-900/40
                rounded-3xl
                p-6
                text-center
                hover:border-purple-500
                hover:shadow-[0_0_30px_#7e22ce]
                hover:-translate-y-2
                transition-all
                duration-300
                cursor-pointer
              "
            >
              {/* Icon Circle */}
              <div
                className="
                  w-16 h-16
                  mx-auto
                  rounded-full
                  bg-linear-to-r
                  from-purple-600
                  to-purple-800
                  flex
                  items-center
                  justify-center
                  shadow-lg
                "
              >
                <Icon size={32} />
              </div>

              <h3 className="font-bold text-xl mt-5">{item.title}</h3>

              <p className="text-gray-400 mt-2 text-sm">
                Practice real AI mock interviews and improve your skills.
              </p>

              <button
                className="
                  mt-6
                  w-full
                  bg-linear-to-r
                  from-purple-600
                  to-purple-800
                  py-3
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-2
                  font-semibold
                  hover:opacity-90
                "
              >
                Start Interview
                <ArrowRight size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
