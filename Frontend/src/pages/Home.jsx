import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ResumeUpload from "../components/ResumeUpload";
import Categories from "../components/Categories";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Feature";
import Analytics from "../components/Analytics";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ResumeUpload />
      <Categories />
      <HowItWorks />
      <Features />
      <Analytics />
      <CTA />
      <Footer />
    </>
  );
}
