"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  Sun,
  Moon,
  Send,
  Building,
  Check
} from "lucide-react";

export default function Contact() {
  const [theme, setTheme] = useState("light");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-brand-navy dark:text-slate-100 flex flex-col selection:bg-brand-gold selection:text-brand-navy transition-colors duration-300">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-brand-gray-light dark:border-slate-900 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-brand-navy flex items-center justify-center border border-brand-gold/20 shrink-0">
            <Image src="/logo.png" alt="Blessed Travel Logo" fill className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight leading-none text-brand-navy dark:text-white">
              BLESSED
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
              Travel & Tour Agency
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy dark:text-slate-100 hover:text-brand-gold transition-colors px-3 py-2 rounded-lg bg-brand-gray-light dark:bg-slate-900 border border-brand-navy/5 dark:border-slate-850"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-brand-navy/10 hover:border-brand-navy dark:border-white/10 dark:hover:border-white hover:bg-brand-gray-light dark:hover:bg-slate-900 text-brand-navy dark:text-slate-200 transition-all cursor-pointer shadow-sm shrink-0"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5 text-brand-gold" />}
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative py-20 px-6 md:px-12 bg-gradient-to-b from-brand-gray-light dark:from-slate-900 to-white dark:to-slate-950 text-center border-b border-brand-navy/5 dark:border-slate-900">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/5 dark:bg-brand-gold/10 border border-brand-navy/10 dark:border-brand-gold/20 text-brand-navy dark:text-brand-gold font-bold text-xs uppercase tracking-widest">
              <Building className="w-4 h-4 text-brand-gold" />
              Kigali Heights HQ Office
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-brand-navy dark:text-white leading-tight">
              Contact Consular Protocol
            </h1>
            <p className="text-base text-text-muted dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Reach out directly to speak with our VIP logistics liaison or initiate a custom corporate booking contract today.
            </p>
          </div>
        </section>

        {/* CONTENT ROW */}
        <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
          
          {/* Coordinates Details (LEFT) */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-gold">Blessed Coordinates</h2>
              <h3 className="text-2xl font-black text-brand-navy dark:text-white leading-tight">Kigali Main Headquarters</h3>
            </div>

            <div className="space-y-6 text-xs font-semibold text-text-muted dark:text-slate-400">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-navy/5 dark:bg-slate-900 flex items-center justify-center text-brand-gold shrink-0 border border-brand-navy/5 dark:border-slate-800">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-navy dark:text-slate-100">Physical Address</h4>
                  <p className="mt-1 leading-relaxed">
                    Blessed Travel and Tour Agency HQ<br />
                    Kigali Heights, Block B, 3rd Floor<br />
                    Kigali, Rwanda
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-navy/5 dark:bg-slate-900 flex items-center justify-center text-brand-gold shrink-0 border border-brand-navy/5 dark:border-slate-800">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-navy dark:text-slate-100">Electronic Mail</h4>
                  <p className="mt-1">
                    <a href="mailto:info@blessedtravel.rw" className="text-brand-gold hover:underline font-bold">info@blessedtravel.rw</a><br />
                    <a href="mailto:protocol@blessedtravel.rw" className="text-brand-gold hover:underline font-bold">protocol@blessedtravel.rw</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-navy/5 dark:bg-slate-900 flex items-center justify-center text-brand-gold shrink-0 border border-brand-navy/5 dark:border-slate-800">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-navy dark:text-slate-100">Telephone Hotlines</h4>
                  <p className="mt-1 leading-relaxed">
                    Main Office: +250 788 987 654<br />
                    VIP Protocol Liaison: +250 788 987 123
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-navy/5 dark:bg-slate-900 flex items-center justify-center text-brand-gold shrink-0 border border-brand-navy/5 dark:border-slate-800">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-navy dark:text-slate-100">Operational Shifts</h4>
                  <p className="mt-1 leading-relaxed">
                    Monday - Friday: 08:00 AM - 06:00 PM<br />
                    Saturday: 09:00 AM - 02:00 PM<br />
                    Consular VIP Pipeline: 24/7 Monitoring Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form container (RIGHT) */}
          <div className="md:col-span-7 bg-brand-gray-light dark:bg-slate-900 rounded-3xl border border-brand-navy/5 dark:border-slate-800 p-8 shadow-sm dark:shadow-none">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-brand-navy dark:text-white">Message Transmitted</h4>
                <p className="text-xs text-text-muted dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                  Thank you! Your correspondence is archived inside our secure mail servers. A consular protocol officer will review your subject query and reply shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-brand-gold underline hover:no-underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-semibold">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none"
                      placeholder="Jean-Luc"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none"
                      placeholder="jean@domain.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Inquiry Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none"
                    placeholder="e.g. Visa fasttrack requirements"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Message Content</label>
                  <textarea
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none resize-none"
                    placeholder="Detail your request..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <Clock className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Transmit Secure Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-navy dark:bg-slate-950 text-white pt-12 pb-8 px-6 md:px-12 border-t border-brand-gold/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50 font-semibold font-sans">
          <p>© {new Date().getFullYear()} Blessed Travel & Tour Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home Page</Link>
            <Link href="/login" className="hover:text-brand-gold transition-colors">Client Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
