"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Shield,
  User,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Globe,
  Apple,
  AlertCircle,
  Plane,
  Eye,
  EyeOff,
  CheckCircle2
} from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [service, setService] = useState("Visa Assistance & Protocol");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Custom Fintech Security Features
  const [showPassword, setShowPassword] = useState(false);

  const passwordMeetsLength = password.length >= 8;
  const passwordMeetsStrength = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all onboarding fields.");
      return;
    }

    if (!passwordMeetsLength || !passwordMeetsStrength) {
      setError("Please satisfy all secure password guidelines.");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate account registration
    setTimeout(() => {
      setLoading(false);

      // Append to local storage registered list
      const registeredJson = localStorage.getItem("registeredUsers") || "[]";
      const users = JSON.parse(registeredJson);
      users.push({ name, email, password });
      localStorage.setItem("registeredUsers", JSON.stringify(users));

      // Authenticate session
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", "client");
      localStorage.setItem("userName", name);
      router.push("/portal/client");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-gray-light dark:bg-slate-850 text-brand-navy dark:text-slate-100 flex flex-col md:grid md:grid-cols-12 relative overflow-hidden font-sans selection:bg-brand-gold selection:text-brand-navy transition-colors duration-300">
      {/* Back button to public site */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-slate-100 hover:text-brand-gold transition-colors px-3 py-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm dark:shadow-none border border-brand-navy/5 dark:border-slate-850"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Site
        </Link>
      </div>

      {/* Left visual column */}
      <div className="hidden md:flex md:col-span-5 text-white p-12 flex-col justify-between relative overflow-hidden bg-brand-navy dark:bg-slate-950 border-r border-brand-gold/15 shrink-0">
        {/* Background Image with Dark Overlay */}
        <Image
          src="/landmarks.jfif"
          alt="Blessed Travel Landmarks"
          fill
          className="object-cover opacity-15 dark:opacity-20 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-brand-navy/95 to-slate-950 z-0 pointer-events-none" />

        {/* Gliding Airplane silhouette in background */}
        <motion.div
          animate={{ x: ["-10%", "120%"], y: ["85%", "-10%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="absolute pointer-events-none text-brand-gold/15 dark:text-brand-gold/10 z-0"
          style={{ width: 80, height: 80 }}
        >
          <Plane className="w-16 h-16 rotate-12" />
        </motion.div>
        
        <Link href="/" className="flex items-center gap-2 z-10 w-fit">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-brand-navy flex items-center justify-center shrink-0 border border-brand-gold/30">
            <Image src="/logo.png" alt="Blessed Logo" fill className="object-contain" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-lg tracking-tight leading-none text-white">BLESSED</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">Travel & Tour</span>
          </div>
        </Link>

        <div className="my-auto z-10 max-w-sm space-y-4">
          <h2 className="text-3xl font-black text-brand-gold leading-tight">
            Start Your Consular Journey
          </h2>
          <p className="text-sm text-white/80 leading-relaxed font-sans">
            Create an official client profile to access the secure document vault. Once registered, upload your Passport or Invitation Letters to trigger immediate consular review.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/40 font-bold z-10">
          <Shield className="w-4 h-4 text-brand-gold animate-pulse" />
          256-Bit Fintech Grade Encryption Active
        </div>
      </div>

      {/* Right form column */}
      <div className="flex-1 md:col-span-7 flex flex-col justify-center items-center py-16 px-6 relative bg-white dark:bg-slate-900 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center md:text-left mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-brand-navy dark:text-slate-100">Create Profile</h1>
            <p className="text-sm text-text-muted dark:text-slate-400 mt-2">
              Register to initiate visa coordination, safaris, or corporate bookings.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded text-red-700 dark:text-red-400 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Name Field */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-brand-navy dark:text-slate-100/60 uppercase tracking-widest mb-1.5">
                Full Name (As in Passport)
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy dark:text-slate-100/40" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-gray-light dark:bg-slate-850/60 border border-brand-navy/10 dark:border-slate-800 hover:border-brand-navy/20 dark:hover:border-slate-700 focus:border-brand-gold dark:focus:border-brand-gold rounded-lg pl-10 pr-4 py-2.5 text-sm text-brand-navy dark:text-slate-100 focus:outline-none transition-colors"
                  placeholder="e.g. John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-brand-navy dark:text-slate-100/60 uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy dark:text-slate-100/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-gray-light dark:bg-slate-850/60 border border-brand-navy/10 dark:border-slate-800 hover:border-brand-navy/20 dark:hover:border-slate-700 focus:border-brand-gold dark:focus:border-brand-gold rounded-lg pl-10 pr-4 py-2.5 text-sm text-brand-navy dark:text-slate-100 focus:outline-none transition-colors"
                  placeholder="e.g. client@blessedtravel.rw"
                />
              </div>
            </div>

            {/* Password Field with Checklist */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-brand-navy dark:text-slate-100/60 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy dark:text-slate-100/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brand-gray-light dark:bg-slate-850/60 border border-brand-navy/10 dark:border-slate-800 hover:border-brand-navy/20 dark:hover:border-slate-700 focus:border-brand-gold dark:focus:border-brand-gold rounded-lg pl-10 pr-10 py-2.5 text-sm text-brand-navy dark:text-slate-100 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-navy/40 dark:text-slate-100/40 hover:text-brand-navy dark:hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password strength visual guidelines */}
              <div className="mt-2.5 space-y-1.5 p-2.5 bg-brand-gray-light/65 dark:bg-slate-850/65 rounded-lg border border-brand-navy/5 dark:border-slate-800 flex flex-col">
                <div className="flex items-center gap-1.5 text-[10px] font-bold">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${passwordMeetsLength ? "text-green-500" : "text-brand-navy/25 dark:text-slate-600"}`} />
                  <span className={passwordMeetsLength ? "text-green-600 dark:text-green-400" : "text-brand-navy/60 dark:text-slate-400"}>At least 8 characters</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${passwordMeetsStrength ? "text-green-500" : "text-brand-navy/25 dark:text-slate-600"}`} />
                  <span className={passwordMeetsStrength ? "text-green-600 dark:text-green-400" : "text-brand-navy/60 dark:text-slate-400"}>Contains number or symbol</span>
                </div>
              </div>
            </div>

            {/* Primary Service Selector */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-brand-navy dark:text-slate-100/60 uppercase tracking-widest mb-1.5">
                Required Travel Service
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 focus:border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-slate-100 focus:outline-none transition-colors cursor-pointer"
              >
                <option>Visa Assistance & Protocol</option>
                <option>Corporate Travel Services</option>
                <option>Academic Exchange Visa processing</option>
                <option>Bespoke Safari / Leisure Package</option>
              </select>
            </div>

            {/* Submit Button with Airplane Loader */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 disabled:bg-brand-navy/50 text-white dark:text-brand-navy font-bold py-3.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md dark:shadow-none hover:scale-[1.01] cursor-pointer mt-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ x: [0, 60, -60, 0], y: [0, -20, 20, 0], opacity: [1, 0, 0, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Plane className="w-4 h-4 text-brand-gold dark:text-brand-navy rotate-[25deg] shrink-0" />
                  </motion.div>
                  <span className="animate-pulse text-xs tracking-wider">Creating secure account...</span>
                </div>
              ) : (
                <>
                  Register & Create Account
                  <ArrowRight className="w-4 h-4 text-brand-gold dark:text-brand-navy" />
                </>
              )}
            </button>
          </form>

          {/* Social Sign Up Options */}
          <div className="mt-6">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-brand-navy/10 dark:border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-brand-navy dark:text-slate-100/40 uppercase tracking-widest">Or Register With</span>
              <div className="flex-grow border-t border-brand-navy/10 dark:border-slate-800"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <button className="flex items-center justify-center gap-2 py-2.5 border border-brand-navy/10 dark:border-slate-800 rounded-lg hover:bg-brand-gray-light dark:hover:bg-slate-800 dark:bg-slate-850 text-sm font-semibold transition-colors cursor-pointer text-brand-navy dark:text-white">
                <Globe className="w-4 h-4 text-red-500" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 border border-brand-navy/10 dark:border-slate-800 rounded-lg hover:bg-brand-gray-light dark:hover:bg-slate-800 dark:bg-slate-850 text-sm font-semibold transition-colors cursor-pointer text-brand-navy dark:text-white">
                <Apple className="w-4 h-4 text-black dark:text-white" />
                Apple ID
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-text-muted dark:text-slate-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-gold font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
