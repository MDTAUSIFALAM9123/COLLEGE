import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleforgot = () => {
    navigate("/forgot-password");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      localStorage.setItem("token", data.token);
      toast.success(data.message || "Login Successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600 text-white p-14 flex flex-col justify-between">
          <div>
            <h1 className="text-6xl font-bold leading-tight">
              Welcome to <br />
              CrackitAI 👋
            </h1>

            <p className="mt-8 text-2xl text-blue-100">
              Login to continue your journey
            </p>
          </div>

          <div className="relative flex justify-center">
            <img src="/public/robot2.webp" alt="Programmer" className="w-100" />
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-14">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900">Welcome Back!</h1>

            <p className="text-gray-500 text-lg mt-3">
              Login to continue your journey
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                size={22}
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full h-16 pl-14 pr-5 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                size={22}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full h-16 pl-14 pr-14 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleforgot}
                className="text-violet-600 font-medium hover:text-violet-700"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 rounded-2xl text-white text-lg font-semibold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 hover:opacity-90 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500">or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-5">
            <button className="h-14 border rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-6 h-6"
              />
              Google
            </button>

            <button className="h-14 border rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                className="w-6 h-6"
              />
              Github
            </button>
          </div>

          {/* Signup */}
          <p className="text-center text-gray-600 mt-10">
            Don't have an account?
            <span className="text-violet-600 font-semibold ml-2 cursor-pointer hover:text-violet-700">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
