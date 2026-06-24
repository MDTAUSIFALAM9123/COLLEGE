import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl h-175 bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left Side */}
        <div className="w-1/2 bg-linear-to-br from-blue-700 via-indigo-600 to-purple-600 text-white p-14 flex flex-col justify-between">
          <div>
            <h1 className="text-6xl font-bold">
              Welcome to <br />
              CrackitAI 👋
            </h1>

            <p className="mt-8 text-2xl text-blue-100">
              Create a strong new password for your account.
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
            <h1 className="text-5xl font-bold">Reset Password</h1>

            <p className="text-gray-500 text-lg mt-3">
              Enter your new password
            </p>
          </div>

          {/* New Password */}
          <div className="relative mb-5">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full h-16 pl-14 pr-14 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-violet-300"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-6">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full h-16 pl-14 pr-14 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-violet-300"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirm ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button className="w-full h-16 rounded-2xl text-white text-lg font-semibold bg-linear-to-r from-indigo-600 via-violet-600 to-purple-500">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
