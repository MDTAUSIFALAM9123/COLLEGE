import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(data.message || "Registration Successful");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {" "}
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
        {/* Left Section */}
        <div className="bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600 text-white p-10 flex flex-col justify-between relative">
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Welcome to <br />
              CrackitAI 👋
            </h1>

            <p className="mt-6 text-lg text-gray-200 max-w-sm">
              Create your account and start your interview practice journey.
            </p>
          </div>

          <div className="relative flex justify-center mt-10">
            <img src="/public/robot2.webp" alt="student" className="w-100" />
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10 md:p-12">
          <h2 className="text-4xl font-bold text-center mb-8">
            Create Account
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="relative">
              <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full border border-gray-200 rounded-xl py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="w-full border border-gray-200 rounded-xl py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="text-gray-400" />
                ) : (
                  <Eye className="text-gray-400" />
                )}
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500">or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="h-14 border border-gray-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium">Google</span>
            </button>

            <button className="h-14 border border-gray-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub"
                className="w-5 h-5"
              />
              <span className="font-medium">GitHub</span>
            </button>
          </div>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?
            <a
              href="/login"
              className="text-purple-600 font-semibold cursor-pointer ml-1"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
