"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Compass,
  Shield,
  ArrowLeft,
  Sun,
  Moon,
  ArrowRight,
  PlaneTakeoff,
  Globe
} from "lucide-react";

export default function Services() {
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

  const services = [
    {
      id: "corporate",
      title: "Corporate & Diplomatic Travel",
      description: "Bespoke logistics, flight/hotel booking, and VIP protocol services for business leaders and diplomats traveling globally.",
      icon: Briefcase,
      tag: "Executive",
      link: "/login",
      image: "/corporate.jfif"
    },
    {
      id: "academic",
      title: "Academic & Exchange Programs",
      description: "Streamlining exchange programs, study abroad logistics, and student visas to make global education seamless for future leaders.",
      icon: GraduationCap,
      tag: "Educational",
      link: "/login",
      image: "/academic.jfif"
    },
    {
      id: "leisure",
      title: "Bespoke Safaris & Leisure Tours",
      description: "Bespoke, sustainable tour itineraries showcasing Rwanda's breathtaking national parks, gorillas, and rich African heritage.",
      icon: Compass,
      tag: "Experiential",
      link: "/login",
      image: "/landmarks.jfif"
    },
    {
      id: "visa",
      title: "Visa Assistance & Protocol",
      description: "Comprehensive visa guidance, documentation processing, and dedicated logistics to remove the stress of global mobility.",
      icon: Shield,
      tag: "Priority",
      link: "/login",
      image: "/visa.jfif"
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
              <PlaneTakeoff className="w-4 h-4 text-brand-gold" />
              Consular Protocol Services
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-brand-navy dark:text-white leading-tight">
              Our Premium Services
            </h1>
            <p className="text-base text-text-muted dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Explore our specialized travel sectors designed to support commercial organizations, diplomats, students, and adventurers.
            </p>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((svc, index) => {
              const IconComp = svc.icon;
              return (
                <div
                  key={svc.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/10 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-56 w-full overflow-hidden border-b border-brand-navy/5 dark:border-slate-800">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-brand-navy/80 text-brand-gold px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-brand-gold/20">
                      {svc.tag}
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-brand-navy dark:bg-slate-950 text-brand-gold flex items-center justify-center">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h3 className="font-extrabold text-xl text-brand-navy dark:text-white">{svc.title}</h3>
                      </div>
                      <p className="text-xs text-text-muted dark:text-slate-400 leading-relaxed font-semibold mb-6">
                        {svc.description}
                      </p>
                    </div>

                    <Link
                      href={svc.link}
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-wider hover:text-brand-navy dark:hover:text-white transition-colors w-fit border-b border-brand-gold hover:border-brand-navy dark:hover:border-white pb-1"
                    >
                      Book Secure Service
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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
