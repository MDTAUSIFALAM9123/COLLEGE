import { KeyRound } from "lucide-react";

export default function VerifyOTP() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl h-175 bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left Side */}
        <div className="w-1/2 bg-linear-to-br from-blue-700 via-indigo-600 to-purple-600 text-white p-14 flex flex-col justify-between">
          <div>
            <h1 className="text-6xl font-bold leading-tight">
              Welcome to <br />
              CrackitAI 👋
            </h1>

            <p className="mt-8 text-2xl text-blue-100">
              Verify your OTP to reset your password.
            </p>
          </div>

          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/programmer-working-on-laptop-5697597-4759507.png"
            className="w-80 mx-auto"
            alt="programmer"
          />
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-14 flex flex-col justify-center">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold">Verify OTP</h1>

            <p className="text-gray-500 mt-3 text-lg">
              Enter the OTP sent to your email
            </p>
          </div>

          <div className="relative mb-6">
            <KeyRound
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />

            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full h-16 pl-14 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          <button className="w-full h-16 rounded-2xl text-white text-lg font-semibold bg-linear-to-r from-indigo-600 via-violet-600 to-purple-500">
            Verify OTP
          </button>

          <p className="text-center mt-8 text-gray-600">
            Didn't get OTP?
            <button className="text-violet-600 font-semibold ml-2">
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
