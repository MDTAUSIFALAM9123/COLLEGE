import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPw";
import VerifyOtp from "./pages/verifyOtp";
import ResetPassword from "./pages/ResetPw";
import ResumeUpload from "./pages/ResumeUpload";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import profile from "./pages/Profile";
import ResumeAnalysis from "./pages/Analysis";
import StartInterview from "./pages/StartInterview";
import Interview from "./pages/Interview";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/analysis" element={< ResumeAnalysis />} />
        <Route path="/start-interview" element={< StartInterview />} />
        <Route path="/interview" element={< Interview />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </>
  );
}

export default App;
