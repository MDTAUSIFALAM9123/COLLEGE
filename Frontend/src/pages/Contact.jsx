import { Mail, MessageCircle, MapPin, Clock, Brain, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#09051f] text-white py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-900/50 px-4 py-2 rounded-full text-purple-300">
            <Brain size={18} />
            Contact CrackitAI
          </div>

          <h1 className="text-5xl font-bold mt-6">
            We’d Love To Hear From You
          </h1>

          <p className="text-gray-300 mt-5 max-w-2xl mx-auto">
            Have questions, feedback, or need support? Our team is here to help
            you on your AI interview journey.
          </p>
        </div>
      </section>

      {/* Contact Details + Form */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Left Side Details */}
          <div className="space-y-6">
            <div className="bg-white border border-purple-100 shadow-lg rounded-3xl p-6 flex gap-5">
              <div className="bg-purple-100 p-4 rounded-2xl h-fit">
                <Mail className="text-purple-600" />
              </div>

              <div>
                <h3 className="font-bold text-xl">Email Support</h3>

                <p className="text-gray-600 mt-2">
                  support.crackitai@gmail.com
                </p>
              </div>
            </div>

            <div className="bg-white border border-purple-100 shadow-lg rounded-3xl p-6 flex gap-5">
              <div className="bg-green-100 p-4 rounded-2xl h-fit">
                <MessageCircle className="text-green-600" />
              </div>

              <div>
                <h3 className="font-bold text-xl">WhatsApp Support</h3>

                <p className="text-gray-600 mt-2">+91 9110048939</p>
              </div>
            </div>

            <div className="bg-white border border-purple-100 shadow-lg rounded-3xl p-6 flex gap-5">
              <div className="bg-purple-100 p-4 rounded-2xl h-fit">
                <MapPin className="text-purple-600" />
              </div>

              <div>
                <h3 className="font-bold text-xl">Location</h3>

                <p className="text-gray-600 mt-2">Bihar, India</p>
              </div>
            </div>

            <div className="bg-white border border-purple-100 shadow-lg rounded-3xl p-6 flex gap-5">
              <div className="bg-purple-100 p-4 rounded-2xl h-fit">
                <Clock className="text-purple-600" />
              </div>

              <div>
                <h3 className="font-bold text-xl">Support Hours</h3>

                <p className="text-gray-600 mt-2">
                  Monday - Saturday <br />
                  9:00 AM - 8:00 PM IST
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#09051f] text-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold">Send Us a Message</h2>

            <p className="text-gray-400 mt-3">
              Fill out the form and our team will get back to you soon.
            </p>

            <form className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-xl bg-[#171036] outline-none border border-purple-800"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-xl bg-[#171036] outline-none border border-purple-800"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full p-4 rounded-xl bg-[#171036] outline-none border border-purple-800"
              />

              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full p-4 rounded-xl bg-[#171036] outline-none border border-purple-800 resize-none"
              ></textarea>

              <button
                className="
                  w-full
                  bg-purple-600
                  hover:bg-purple-700
                  transition
                  py-4
                  rounded-xl
                  font-semibold
                  flex items-center
                  justify-center
                  gap-2
                "
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-8 pb-20">
        <div className="max-w-6xl mx-auto bg-linear-to-r from-[#09051f] to-purple-900 rounded-3xl text-white p-10 text-center">
          <Brain size={50} className="mx-auto text-purple-400" />

          <h2 className="text-4xl font-bold mt-5">
            Your Dream Job Starts Here
          </h2>

          <p className="text-gray-300 mt-4">
            Practice with AI, improve your confidence, and crack your next
            interview with CrackitAI.
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
