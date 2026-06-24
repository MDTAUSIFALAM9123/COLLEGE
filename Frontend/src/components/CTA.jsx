import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="px-8 pb-24">
      <div className="relative max-w-6xl mx-auto overflow-hidden rounded-4xl bg-linear-to-r from-[#09051f] via-[#1b1045] to-purple-900 text-white shadow-2xl">
        {/* Background Glow Effects */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-600 rounded-full blur-3xl opacity-25"></div>

        <div className="absolute bottom-0 right-0 w-56 h-56 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 p-10 md:p-14">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-purple-400/30 px-4 py-2 rounded-full text-purple-200">
              <Sparkles size={18} />
              AI Powered Career Growth
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
              Ready to Crack Your
              <span className="text-purple-400"> Dream Job?</span>
            </h2>

            <p className="mt-5 text-gray-300 text-lg leading-relaxed">
              Join thousands of candidates improving their interview skills with
              AI-powered mock interviews, personalized feedback, and real-time
              analysis.
            </p>

            {/* CTA Button */}
            <Link
              to="/register"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                bg-linear-to-r
                from-purple-600
                to-purple-800
                px-8
                py-4
                rounded-2xl
                font-semibold
                shadow-lg
                hover:scale-105
                hover:shadow-purple-500/50
                transition-all
                duration-300
              "
            >
              Start Practicing
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Image Glow */}
            <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-30"></div>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3212/3212608.png"
              alt="AI Robot"
              className="
                relative
                w-52
                md:w-60
                drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]
                hover:scale-110
                transition
                duration-500
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
