import { Brain, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  // 🔐 Get logged-in user from backend (cookie check)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });

        setUser(data.user);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav
      className="
      sticky top-0 z-50
      bg-[#09051f]/90
      backdrop-blur-lg
      border-b border-purple-900/50
      text-white px-8 py-4
    "
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-2 rounded-xl">
            <Brain size={25} />
          </div>

          <h1 className="text-2xl font-bold">
            Crack<span className="text-purple-400">itAI</span>
          </h1>
        </Link>

        {/* NAV */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-400 border-b-2 pb-1"
                  : "hover:text-purple-400"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* AUTH */}
        {!user ? (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="border border-purple-500 px-5 py-2 rounded-xl"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-gradient-to-r from-purple-600 to-purple-800 px-5 py-2 rounded-xl"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-purple-700 px-4 py-2 rounded-xl"
            >
              <User size={18} />
              {user.name || user.email}
            </button>

            {open && (
              <div
                className="
                absolute right-0 mt-3 w-48
                bg-white text-black rounded-xl shadow-lg
              "
              >
                <Link
                  to="/profile"
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <Link
                  to="/dashboard"
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
