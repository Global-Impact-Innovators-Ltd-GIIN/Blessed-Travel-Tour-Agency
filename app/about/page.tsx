"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Award,
  CheckCircle2,
  Users,
  Shield,
  ArrowLeft,
  Sun,
  Moon,
  Check,
  Plane,
  HeartHandshake
} from "lucide-react";

export default function About() {
  const [theme, setTheme] = useState("light");

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

  const objectives = [
    {
      title: "Deliver Service Excellence",
      description: "Consistently maintain a 100% client satisfaction rate by providing proactive, error-free booking, ticketing, and itinerary solutions.",
      icon: Award
    },
    {
      title: "Facilitate Global Mobility",
      description: "Offer comprehensive, hassle-free visa guidance, passport processing, and protocol services for corporate and diplomatic travelers.",
      icon: Shield
    },
    {
      title: "Promote Sustainable Tourism",
      description: "Design eco-friendly tours and cultural safaris that celebrate Rwanda's conservation milestones and empower local communities.",
      icon: Globe
    },
    {
      title: "Foster Global Partnerships",
      description: "Form solid strategic alliances with leading international airlines, luxury lodges, and foreign consular offices.",
      icon: Users
    }
  ];

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

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative py-20 px-6 md:px-12 bg-gradient-to-b from-brand-gray-light dark:from-slate-900 to-white dark:to-slate-950 text-center border-b border-brand-navy/5 dark:border-slate-900">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/5 dark:bg-brand-gold/10 border border-brand-navy/10 dark:border-brand-gold/20 text-brand-navy dark:text-brand-gold font-bold text-xs uppercase tracking-widest">
              <Globe className="w-4 h-4 text-brand-gold" />
              Heritage & Consular Excellence
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-brand-navy dark:text-white leading-tight">
              About Blessed Travel & Tour
            </h1>
            <p className="text-base text-text-muted dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              We are a premier, full-service travel management agency based in Kigali, Rwanda. We don’t just book journeys—we open gateways to new horizons.
            </p>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Heritage & Trust</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy dark:text-white leading-tight">
                Crafting inspiring, seamless, and transformative travel experiences.
              </h3>
              <p className="text-text-muted dark:text-slate-400 mt-6 leading-relaxed">
                Blessed Travel and Tour Agency caters to corporate leaders, diplomats, students, and leisure travelers alike. Whether navigating international itineraries, securing academic opportunities abroad, or curating bespoke cultural expeditions across Africa and beyond, we bridge world-class logistics with authentic hospitality.
              </p>
              <ul className="mt-6 space-y-3 font-semibold text-brand-navy dark:text-slate-200">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-gold" />
                  Global Standards of Service
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-gold" />
                  Meticulous Journey Planning
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-gold" />
                  Reliability and Proactive Support
                </li>
              </ul>
            </div>
            
            <div className="bg-brand-gray-light dark:bg-slate-900 rounded-3xl p-8 border border-brand-navy/5 dark:border-slate-800 flex flex-col justify-center gap-6 relative overflow-hidden transition-colors duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-bl-full" />
              <blockquote className="italic text-brand-navy dark:text-slate-100 text-lg font-medium leading-relaxed">
                "At Blessed Travel and Tour, we don’t just book trips, we open gateways to new horizons. We dedicate ourselves to removing the stress of global mobility."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-brand-navy border border-brand-gold flex items-center justify-center shadow-inner">
                  <Image src="/logo.png" alt="Blessed" fill className="object-contain" />
                </div>
                <div>
                  <p className="font-bold text-brand-navy dark:text-white">Blessed Leadership Team</p>
                  <p className="text-xs text-brand-gold font-bold">Kigali, Rwanda Office</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS SECTION */}
        <section className="bg-brand-navy dark:bg-slate-900 py-12 px-6 md:px-12 text-white border-y border-brand-gold/15 transition-colors duration-300">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-5xl font-black text-brand-gold">100%</p>
              <p className="text-xs md:text-sm uppercase tracking-wider text-white/70 mt-2 font-bold">Client Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-black text-brand-gold">50+</p>
              <p className="text-xs md:text-sm uppercase tracking-wider text-white/70 mt-2 font-bold">Global Airline Partners</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-black text-brand-gold">10k+</p>
              <p className="text-xs md:text-sm uppercase tracking-wider text-white/70 mt-2 font-bold">Journeys Handled</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-black text-brand-gold">24/7</p>
              <p className="text-xs md:text-sm uppercase tracking-wider text-white/70 mt-2 font-bold">Diplomatic VIP Support</p>
            </div>
          </div>
        </section>

        {/* OBJECTIVES SECTION */}
        <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Our Commitments</h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-brand-navy dark:text-white">Core Pillars of Action</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {objectives.map((obj, index) => {
              const IconComp = obj.icon;
              return (
                <div
                  key={index}
                  className="bg-brand-gray-light dark:bg-slate-900 p-6 rounded-2xl border border-brand-navy/5 dark:border-slate-800 flex gap-4 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-navy dark:bg-slate-950 flex items-center justify-center text-brand-gold shrink-0 shadow-inner">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg text-brand-navy dark:text-white mb-2">{obj.title}</h4>
                    <p className="text-xs text-text-muted dark:text-slate-400 leading-relaxed font-semibold">{obj.description}</p>
                  </div>
                </div>
              );
            })}
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
