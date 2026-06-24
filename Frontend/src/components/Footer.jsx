import { Brain, Mail, Globe, Link2, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#09051f] text-white border-t border-purple-900">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo + Description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Brain className="text-purple-500" size={30} />

              <h2 className="text-2xl font-bold">CrackitAI</h2>
            </div>

            <p className="text-gray-400 mt-3 max-w-sm">
              Your AI-powered interview partner. Practice smart, get instant
              feedback, and crack your dream job.
            </p>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h3 className="font-semibold mb-4 text-purple-400">
              Connect With Us
            </h3>

            <div className="flex gap-4 justify-center">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="bg-[#171036] p-3 rounded-full hover:bg-purple-600 transition duration-300"
              >
                <Globe size={20} />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="bg-[#171036] p-3 rounded-full hover:bg-purple-600 transition duration-300"
              >
                <Link2 size={20} />
              </a>

              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noreferrer"
                className="bg-[#171036] p-3 rounded-full hover:bg-purple-600 transition duration-300"
              >
                <MessageCircle size={20} />
              </a>

              <a
                href="mailto:contact@crackitai.com"
                className="bg-[#171036] p-3 rounded-full hover:bg-purple-600 transition duration-300"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-purple-900 mt-8 pt-6 text-center text-gray-500 text-sm">
          © 2026 CrackitAI. Built with ❤️ to help you crack your dream job.
        </div>
      </div>
    </footer>
  );
}
