"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
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
  Key,
  Smartphone,
  RefreshCw
} from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // client, admin, superadmin
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Custom Fintech Security Features
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [sessionDetails, setSessionDetails] = useState<any>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all credentials.");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate authentication processing
    setTimeout(() => {
      setLoading(false);
      
      let authenticated = false;
      let resolvedRole = role;
      let resolvedName = "User";

      // 1. Check predefined secure users
      if (email === "superadmin@blessedtravel.rw" && password === "BlessedSuper2026!") {
        authenticated = true;
        resolvedRole = "superadmin";
        resolvedName = "Super Administrator";
      } else if (email === "agent.keza@blessedtravel.rw" && password === "BlessedAgent2026!") {
        authenticated = true;
        resolvedRole = "admin";
        resolvedName = "Agent Keza";
      } else if (email === "client@gmail.com" && password === "BlessedClient2026!") {
        authenticated = true;
        resolvedRole = "client";
        resolvedName = "John Doe";
      } else {
        // 2. Check registered user list from signup
        const registeredJson = localStorage.getItem("registeredUsers");
        if (registeredJson) {
          const users = JSON.parse(registeredJson);
          const matched = users.find((u: any) => u.email === email && u.password === password);
          if (matched) {
            authenticated = true;
            resolvedRole = "client";
            resolvedName = matched.name;
          }
        }
      }

      if (authenticated) {
        // Hold session parameters and prompt for 2FA
        setSessionDetails({
          email,
          role: resolvedRole,
          name: resolvedName
        });
        setShowOTP(true);
      } else {
        setError(
          "Access Denied: Invalid email or password. Please use standard secure accounts:\n" +
          "• Client: client@gmail.com / BlessedClient2026!\n" +
          "• Agent: agent.keza@blessedtravel.rw / BlessedAgent2026!\n" +
          "• Superadmin: superadmin@blessedtravel.rw / BlessedSuper2026!\n" +
          "(Or sign up a new account first)"
        );
      }
    }, 1500);
  };

  const handleOTPVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setOtpError("Please enter the verification code.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    setTimeout(() => {
      setOtpLoading(false);
      if (otp === "784902") {
        // Successfully log in
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", sessionDetails.email);
        localStorage.setItem("userRole", sessionDetails.role);
        localStorage.setItem("userName", sessionDetails.name);

        if (sessionDetails.role === "client") {
          router.push("/portal/client");
        } else if (sessionDetails.role === "admin") {
          router.push("/portal/admin");
        } else if (sessionDetails.role === "superadmin") {
          router.push("/portal/superadmin");
        }
      } else {
        setOtpError("Invalid verification code. Please try again (Hint: check test bypass code).");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-brand-gray-light dark:bg-slate-950 text-brand-navy dark:text-slate-100 flex flex-col md:grid md:grid-cols-12 relative overflow-hidden font-sans selection:bg-brand-gold selection:text-brand-navy transition-colors duration-300">
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
          src="/journey.jfif"
          alt="Blessed Travel"
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
            Opening Gateways to New Horizons
          </h2>
          <p className="text-sm text-white/80 leading-relaxed font-sans">
            Securely access your travel documents, passport records, and real-time visa status. Experience VIP consular protocol services managed from Kigali.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/40 font-bold z-10">
          <Shield className="w-4 h-4 text-brand-gold animate-pulse" />
          256-Bit Fintech Grade Encryption Active
        </div>
      </div>

      {/* Right form column */}
      <div className="flex-1 md:col-span-7 flex flex-col justify-center items-center py-16 px-6 relative bg-white dark:bg-slate-900 transition-colors duration-300">
        <AnimatePresence mode="wait">
          {!showOTP ? (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <div className="text-center md:text-left mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-brand-navy dark:text-slate-100">Portal Sign In</h1>
                <p className="text-sm text-text-muted dark:text-slate-400 mt-2">
                  Select your role profile to access the personalized dashboard.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded text-red-700 dark:text-red-400 text-xs font-semibold whitespace-pre-line leading-relaxed shadow-sm">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

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

                {/* Password Field */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-brand-navy dark:text-slate-100/60 uppercase tracking-widest">
                      Password
                    </label>
                    <span className="text-xs text-brand-gold font-bold hover:underline cursor-pointer">
                      Forgot Password?
                    </span>
                  </div>
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
                </div>

                {/* Role Profile Selector (For demonstration) */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-brand-navy dark:text-slate-100/60 uppercase tracking-widest mb-1.5">
                    Role Profile Simulator
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-brand-gray-light dark:bg-slate-850 border border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-slate-100 font-bold focus:outline-none transition-colors shadow-sm dark:shadow-none cursor-pointer"
                  >
                    <option value="client">Client Portal Profile</option>
                    <option value="admin">Blessed Agent/Admin Portal</option>
                    <option value="superadmin">Superadmin Console Panel</option>
                  </select>
                </div>

                {/* Submit Button with Airplane take-off */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 disabled:bg-brand-navy/50 text-white dark:text-brand-navy font-bold py-3.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md dark:shadow-none hover:scale-[1.01] cursor-pointer"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ x: [0, 60, -60, 0], y: [0, -20, 20, 0], opacity: [1, 0, 0, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Plane className="w-4 h-4 text-brand-gold dark:text-brand-navy rotate-[25deg] shrink-0" />
                      </motion.div>
                      <span className="animate-pulse text-xs tracking-wider">Authorizing security keys...</span>
                    </div>
                  ) : (
                    <>
                      Enter Dashboard Portal
                      <ArrowRight className="w-4 h-4 text-brand-gold dark:text-brand-navy" />
                    </>
                  )}
                </button>
              </form>

              {/* Social Sign In Options */}
              <div className="mt-8">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-brand-navy/10 dark:border-slate-800"></div>
                  <span className="flex-shrink mx-4 text-xs font-bold text-brand-navy dark:text-slate-100/40 uppercase tracking-widest">Or Continue With</span>
                  <div className="flex-grow border-t border-brand-navy/10 dark:border-slate-800"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
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

              <p className="text-center text-sm text-text-muted dark:text-slate-400 mt-8">
                Don't have an account yet?{" "}
                <Link href="/signup" className="text-brand-gold font-bold hover:underline">
                  Create Client Profile
                </Link>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="otp-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <div className="text-center md:text-left mb-8">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-4 mx-auto md:mx-0">
                  <Smartphone className="w-6 h-6 animate-bounce" />
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy dark:text-slate-100">Multi-Factor Security Gate</h1>
                <p className="text-xs text-text-muted dark:text-slate-400 mt-2 leading-relaxed">
                  A verification code has been dispatched to your registered device to confirm terminal authorization.
                </p>
              </div>

              <form onSubmit={handleOTPVerify} className="space-y-5">
                {otpError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded text-red-700 dark:text-red-400 text-xs font-semibold leading-relaxed">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {otpError}
                  </div>
                )}

                <div className="flex flex-col">
                  <label className="text-xs font-bold text-brand-navy dark:text-slate-100/60 uppercase tracking-widest mb-1.5">
                    Enter SMS OTP Code
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy dark:text-slate-100/40" />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-brand-gray-light dark:bg-slate-850/60 border border-brand-navy/10 dark:border-slate-800 hover:border-brand-navy/20 dark:hover:border-slate-700 focus:border-brand-gold rounded-lg pl-10 pr-4 py-2.5 text-center font-bold tracking-widest text-sm text-brand-navy dark:text-slate-100 focus:outline-none transition-colors"
                      placeholder="••••••"
                    />
                  </div>
                  <span className="text-[10px] text-brand-gold font-bold mt-2 uppercase tracking-wide bg-brand-gold/10 p-2 rounded block text-center border border-brand-gold/20">
                    🔐 Security Bypass Code: <span className="font-black text-brand-navy dark:text-slate-200">784902</span>
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowOTP(false)}
                    className="flex-1 py-3 border border-brand-navy/15 dark:border-slate-800 text-brand-navy dark:text-slate-200 rounded-lg hover:bg-brand-gray-light dark:hover:bg-slate-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="flex-1 bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md dark:shadow-none"
                  >
                    {otpLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Verify & Login
                        <Shield className="w-3.5 h-3.5 text-brand-gold dark:text-brand-navy" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
