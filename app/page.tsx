"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Briefcase,
  GraduationCap,
  FileText,
  ArrowRight,
  Globe,
  Award,
  CheckCircle2,
  Users,
  Shield,
  Menu,
  X,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  Building,
  Check,
  Sun,
  Moon
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Sync theme with HTML document class on mount
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
      link: "/login?redirect=/portal/client",
      image: "/corporate.jfif"
    },
    {
      id: "academic",
      title: "Academic & Exchange Programs",
      description: "Streamlining exchange programs, study abroad logistics, and student visas to make global education seamless for future leaders.",
      icon: GraduationCap,
      tag: "Educational",
      link: "/login?redirect=/portal/client",
      image: "/academic.jfif"
    },
    {
      id: "leisure",
      title: "Bespoke Safaris & Leisure Tours",
      description: "Bespoke, sustainable tour itineraries showcasing Rwanda's breathtaking national parks, gorillas, and rich African heritage.",
      icon: Compass,
      tag: "Experiential",
      link: "/login?redirect=/portal/client",
      image: "/landmarks.jfif"
    },
    {
      id: "visa",
      title: "Visa Assistance & Protocol",
      description: "Comprehensive visa guidance, documentation processing, and dedicated logistics to remove the stress of global mobility.",
      icon: Shield,
      tag: "Priority",
      link: "/login?redirect=/portal/client",
      image: "/visa.jfif"
    }
  ];

  const objectives = [
    {
      title: "Deliver Service Excellence",
      description: "Consistently maintain a 100% client satisfaction rate by providing proactive, error-free booking, ticketing, and itinerary solutions.",
      icon: Award
    },
    {
      title: "Facilitate Global Mobility",
      description: "Offer comprehensive, hassle-free visa guidance, passport processing, and protocol services for corporate and diplomatic travelers.",
      icon: Globe
    },
    {
      title: "Promote African Tourism",
      description: "Design and execute unique, sustainable tour packages that showcase the rich heritage, landscapes, and transformative growth of Rwanda and Africa.",
      icon: Compass
    },
    {
      title: "Foster Strategic Partnerships",
      description: "Build strong alliances with global airlines, premier hotels, and educational institutions to secure competitive rates and exclusive perks.",
      icon: Building
    },
    {
      title: "Empower Through Educational Travel",
      description: "Streamline academic travel and student exchange programs, making global training opportunities accessible to the next generation.",
      icon: GraduationCap
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-brand-navy dark:text-slate-100 flex flex-col selection:bg-brand-gold selection:text-brand-navy transition-colors duration-300">
      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-brand-gray-light dark:border-slate-900 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300 bg-brand-navy flex items-center justify-center border border-brand-gold/20">
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

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-semibold">
          {[
            { label: "Who We Are", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Bespoke Safaris", href: "/safaris" },
            { label: "Our Partners", href: "/partners" },
            { label: "Contact Us", href: "/contact" }
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-text-dark dark:text-slate-200 hover:text-brand-gold dark:hover:text-brand-gold transition-colors relative py-2 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Portal CTA & Theme Toggler */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-brand-navy/10 hover:border-brand-navy dark:border-white/10 dark:hover:border-white hover:bg-brand-gray-light dark:hover:bg-slate-900 text-brand-navy dark:text-slate-200 transition-all cursor-pointer shadow-sm shrink-0"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5 text-brand-gold" />}
          </button>
          
          <Link
            href="/login"
            className="text-sm font-bold hover:text-brand-gold dark:text-slate-200 dark:hover:text-brand-gold transition-colors px-3 py-2"
          >
            Login
          </Link>
          
          <Link
            href="/portal/client"
            className="inline-flex items-center gap-2 bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy font-bold text-sm px-5 py-2.5 rounded-full border-2 border-brand-navy dark:border-brand-gold hover:border-brand-blue-dark dark:hover:border-yellow-500 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
          >
            Access Client Portal
            <ArrowUpRight className="w-4 h-4 text-brand-gold dark:text-brand-navy" />
          </Link>
        </div>

        {/* Mobile menu and theme toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-brand-navy/10 dark:border-white/10 text-brand-navy dark:text-slate-200"
          >
            {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5 text-brand-gold" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-brand-navy dark:text-slate-200 hover:bg-brand-gray-light dark:hover:bg-slate-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-brand-gray-light dark:border-slate-900 px-6 py-4 flex flex-col gap-4 font-semibold shadow-inner"
          >
            {[
              { label: "Who We Are", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Bespoke Safaris", href: "/safaris" },
              { label: "Our Partners", href: "/partners" },
              { label: "Contact Us", href: "/contact" }
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-dark dark:text-slate-200 hover:text-brand-gold py-2 border-b border-brand-gray-light dark:border-slate-900"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full border border-brand-navy dark:border-slate-800 font-semibold text-brand-navy dark:text-slate-200 hover:bg-brand-gray-light dark:hover:bg-slate-900 transition-all"
              >
                Login
              </Link>
              <Link
                href="/portal/client"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy font-semibold flex items-center justify-center gap-2 hover:bg-brand-blue-dark dark:hover:bg-yellow-500 transition-all"
              >
                Access Client Portal
                <ArrowUpRight className="w-4 h-4 text-brand-gold dark:text-brand-navy" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 px-6 md:px-12 bg-gradient-to-b from-brand-gray-light dark:from-slate-950 to-white dark:to-slate-950">
          <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center relative z-10">
            {/* Hero Left Content */}
            <div className="md:col-span-7 flex flex-col justify-center text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/5 dark:bg-brand-gold/10 border border-brand-navy/10 dark:border-brand-gold/20 text-brand-navy dark:text-brand-gold font-bold text-xs uppercase tracking-widest mb-6 w-fit shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 text-brand-gold animate-spin" style={{ animationDuration: '8s' }} />
                Premium Travel Management
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl font-black tracking-tight text-brand-navy dark:text-white leading-tight"
              >
                Opening Gateways to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy dark:from-brand-gold to-brand-gold dark:to-yellow-500">
                  New Horizons
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-lg text-text-dark dark:text-slate-200 font-semibold leading-relaxed max-w-xl border-l-4 border-brand-gold pl-4"
              >
                "We don’t just book trips, we open gateways to new horizons."
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-4 text-text-muted dark:text-slate-400 leading-relaxed max-w-xl"
              >
                Blessed Travel and Tour Agency is a premier, full-service travel management company based in Kigali, Rwanda, dedicated to crafting seamless, inspiring, and transformative travel experiences. Rooted in reliability and excellence, we bridge world-class logistics with authentic hospitality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  href="/portal/client"
                  className="bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy font-bold px-8 py-3.5 rounded-full flex items-center gap-3 border-2 border-brand-navy dark:border-brand-gold hover:border-brand-blue-dark dark:hover:border-yellow-500 transition-all duration-300 glow-navy hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 text-brand-gold dark:text-brand-navy" />
                </Link>
                <a
                  href="#services"
                  className="bg-transparent hover:bg-brand-gray-light dark:hover:bg-slate-900 text-brand-navy dark:text-slate-200 font-bold px-8 py-3.5 rounded-full border-2 border-brand-navy/20 dark:border-white/10 hover:border-brand-navy dark:hover:border-white transition-all duration-300 hover:scale-105"
                >
                  Our Services
                </a>
              </motion.div>
            </div>

            {/* Hero Right Interactive Illustration */}
            <div className="md:col-span-5 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative w-72 h-72 md:w-96 md:h-96 shrink-0"
              >
                {/* Gold glowing backing ring */}
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-brand-gold/30 dark:border-brand-gold/25 animate-spin" style={{ animationDuration: '40s' }} />
                {/* Navy rotating ring */}
                <div className="absolute inset-4 rounded-full border border-brand-navy/10 dark:border-white/5 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
                
                {/* Core content */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-center items-center text-center border-4 border-brand-gold overflow-hidden">
                  {/* Rotating travel landmarks background */}
                  <div className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '60s' }}>
                    <Image src="/landmarks.jfif" alt="Travel World" fill className="object-cover pointer-events-none scale-125" />
                  </div>
                  {/* Dark premium overlay for readability */}
                  <div className="absolute inset-0 bg-brand-navy/60 dark:bg-slate-950/70 backdrop-blur-[1px]" />
                  
                  <div className="relative z-10 flex flex-col items-center text-white px-6">
                    <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy mb-2 shadow-md">
                      <Globe className="w-5 h-5 animate-pulse" />
                    </div>
                    <h3 className="font-black text-base uppercase tracking-widest text-brand-gold">Kigali, Rwanda</h3>
                    <p className="text-[11px] text-white/95 font-medium tracking-wide mt-1 leading-snug max-w-[180px]">Every great journey begins with a single step</p>
                  </div>
                </div>

                {/* Floating Orbiting elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-4 left-1/4 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl shadow-lg border border-brand-gray-light dark:border-slate-800 flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs font-bold text-brand-navy dark:text-slate-200">Corporate Travel</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="absolute -bottom-4 right-1/4 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl shadow-lg border border-brand-gray-light dark:border-slate-800 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs font-bold text-brand-navy dark:text-slate-200">Visa Vault</span>
                </motion.div>
              </motion.div>
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

        {/* WHO WE ARE DETAIL SECTION */}
        <section id="about" className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
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

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 bg-brand-gray-light dark:bg-slate-900/60 px-6 md:px-12 border-y border-brand-navy/5 dark:border-slate-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Our Core Pillars</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy dark:text-white">Bespoke Travel Portfolios</h3>
              <p className="text-text-muted dark:text-slate-400 mt-4">
                Explore our specialized travel sectors designed to support commercial organizations, diplomats, students, and adventurers.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {services.map((svc) => {
                const IconComponent = svc.icon;
                return (
                  <motion.div
                    key={svc.id}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-brand-navy/10 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    {svc.image && (
                      <div className="relative h-40 w-full overflow-hidden shrink-0 border-b border-brand-navy/5 dark:border-slate-800">
                        <Image
                          src={svc.image}
                          alt={svc.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-brand-gold text-brand-navy rounded-full shadow-sm z-10">
                          {svc.tag}
                        </span>
                      </div>
                    )}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-navy/5 dark:bg-slate-850 flex items-center justify-center text-brand-navy dark:text-white shrink-0">
                            <IconComponent className="w-5 h-5 text-brand-gold" />
                          </div>
                          <h4 className="font-extrabold text-base text-brand-navy dark:text-white leading-tight">
                            {svc.title}
                          </h4>
                        </div>
                        <p className="text-xs text-text-muted dark:text-slate-400 leading-relaxed mb-6">
                          {svc.description}
                        </p>
                      </div>

                      <Link
                        href={svc.link}
                        className="inline-flex items-center gap-2 text-xs font-bold text-brand-navy dark:text-brand-gold hover:text-brand-gold dark:hover:text-yellow-500 transition-colors mt-auto group/btn"
                      >
                        Access Service
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* VISION & MISSION SECTION */}
        <section id="vision" className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-white dark:bg-slate-900 border-2 border-brand-gold/30 dark:border-brand-gold/15 rounded-3xl p-8 md:p-12 hover:border-brand-gold transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full group-hover:bg-brand-gold/10 transition-colors" />
              <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-navy mb-8">
                <Globe className="w-7 h-7 text-brand-gold" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white tracking-tight mb-4">Our Vision</h3>
              <p className="text-text-dark dark:text-slate-200 font-medium text-lg leading-relaxed">
                "To be Africa’s most trusted and influential travel management agency, recognized globally for transforming journey logistics into inspiring, seamless, and life-changing experiences that connect people, cultures, and opportunities."
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-brand-navy dark:bg-slate-900/40 text-white rounded-3xl p-8 md:p-12 border border-brand-navy dark:border-slate-800 hover:shadow-2xl transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brand-gold mb-8">
                <Award className="w-7 h-7 text-brand-gold" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white dark:text-white tracking-tight mb-4">Our Mission</h3>
              <p className="text-white/90 dark:text-slate-300 leading-relaxed text-base">
                "To provide exceptional, tailor-made travel and tour services driven by professionalism, integrity, and efficiency. We dedicate ourselves to removing the stress of global mobility through meticulous planning, personalized customer care, and innovative travel solutions that empower our clients to explore, learn, and lead with confidence."
              </p>
            </div>
          </div>
        </section>

        {/* CORE OBJECTIVES SECTION */}
        <section id="objectives" className="py-20 bg-brand-gray-light dark:bg-slate-900/60 px-6 md:px-12 border-t border-brand-navy/5 dark:border-slate-900 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-16">
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Our Commitments</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy dark:text-white">Core Strategic Objectives</h3>
              <p className="text-text-muted dark:text-slate-400 mt-4">
                We organize our operational goals around key metrics to guarantee exceptional travel support for corporate, tourist, and education packages.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {objectives.map((obj, index) => {
                const IconComp = obj.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-brand-navy/5 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 dark:bg-slate-850 flex items-center justify-center text-brand-navy mb-6">
                      <IconComp className="w-5 h-5 text-brand-gold" />
                    </div>
                    <h4 className="font-extrabold text-lg text-brand-navy dark:text-white mb-3">
                      {obj.title}
                    </h4>
                    <p className="text-sm text-text-muted dark:text-slate-400 leading-relaxed">
                      {obj.description}
                    </p>
                  </div>
                );
              })}
              
              {/* Extra interactive card */}
              <div className="bg-gradient-to-br from-brand-navy to-brand-blue-dark dark:from-slate-900 dark:to-slate-950 text-white p-8 rounded-2xl shadow-md flex flex-col justify-between items-start border dark:border-slate-800">
                <div>
                  <h4 className="font-black text-xl text-brand-gold leading-tight mb-2">
                    Ready to track a visa application?
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Access our client document vault to safely submit passport details and monitor consular processes in real-time.
                  </p>
                </div>
                <Link
                  href="/portal/client"
                  className="mt-6 bg-white dark:bg-brand-gold hover:bg-brand-gold dark:hover:bg-yellow-500 text-brand-navy hover:text-brand-navy font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-full inline-flex items-center gap-2 transition-all duration-300"
                >
                  Enter Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-brand-navy/10 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl grid md:grid-cols-12 transition-colors duration-300">
            {/* Info Panel */}
            <div className="md:col-span-5 bg-brand-navy dark:bg-slate-950 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold/10 rounded-tr-full" />
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Contact Our Agency</h3>
                <p className="text-sm text-white/70 mt-3 max-w-xs leading-relaxed">
                  Have inquiries regarding corporate packages, study visas, or tailor-made safaris? Reach out directly to our Kigali officers.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-brand-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Main Office</p>
                      <p className="text-xs text-white/70 mt-0.5">Kigali, Rwanda (Central Business District)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-brand-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Email Inquiries</p>
                      <p className="text-xs text-white/70 mt-0.5">info@blessedtravel.rw</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-brand-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Phone Hotline</p>
                      <p className="text-xs text-white/70 mt-0.5">+250 788 123 456 / +250 722 987 654</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4 text-xs font-bold text-brand-gold uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                Guaranteed Response within 2 hours
              </div>
            </div>

            {/* Form Panel */}
            <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-brand-gray-light/45 dark:bg-slate-900/40">
              <h4 className="text-xl font-bold text-brand-navy dark:text-white mb-6">Send a Quick Inquiry</h4>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
                    <input
                      type="text"
                      className="bg-white dark:bg-slate-800 border border-brand-navy/15 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none focus:border-brand-gold dark:focus:border-brand-gold transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                    <input
                      type="email"
                      className="bg-white dark:bg-slate-800 border border-brand-navy/15 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none focus:border-brand-gold dark:focus:border-brand-gold transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Inquiry Type</label>
                  <select
                    className="bg-white dark:bg-slate-800 border border-brand-navy/15 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none focus:border-brand-gold dark:focus:border-brand-gold transition-colors"
                  >
                    <option>Corporate Travel Services</option>
                    <option>Academic Exchange Visa assistance</option>
                    <option>Bespoke Safari / Leisure Package</option>
                    <option>Consular Protocol Guidance</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Message Description</label>
                  <textarea
                    rows={4}
                    className="bg-white dark:bg-slate-800 border border-brand-navy/15 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none focus:border-brand-gold dark:focus:border-brand-gold transition-colors resize-none"
                    placeholder="Details about your travel plans..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy font-bold py-3.5 rounded-lg text-sm transition-all duration-300 shadow-md hover:scale-[1.01]"
                >
                  Send Travel Inquiry
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-navy dark:bg-slate-950 text-white pt-16 pb-8 px-6 md:px-12 border-t border-brand-gold/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 rounded overflow-hidden bg-brand-navy border border-brand-gold/30 flex items-center justify-center shrink-0">
                <Image src="/logo.png" alt="Blessed Logo" fill className="object-contain" />
              </div>
              <span className="font-black text-md tracking-tight">BLESSED TRAVEL</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              We bridge world-class logistics with authentic hospitality to craft seamless, inspiring, and life-changing journeys.
            </p>
          </div>

          <div>
            <h5 className="font-extrabold text-sm text-brand-gold uppercase tracking-wider mb-4">Our Services</h5>
            <ul className="space-y-2 text-xs text-white/70">
              <li><Link href="/login" className="hover:text-brand-gold transition-colors">Corporate Travel</Link></li>
              <li><Link href="/login" className="hover:text-brand-gold transition-colors">Academic Exchange</Link></li>
              <li><Link href="/login" className="hover:text-brand-gold transition-colors">Leisure Safaris</Link></li>
              <li><Link href="/login" className="hover:text-brand-gold transition-colors">Visa & Passport VIP Vault</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-sm text-brand-gold uppercase tracking-wider mb-4">Company</h5>
            <ul className="space-y-2 text-xs text-white/70 font-semibold font-sans">
              <li><a href="#about" className="hover:text-brand-gold transition-colors">Who We Are</a></li>
              <li><a href="#vision" className="hover:text-brand-gold transition-colors">Vision & Mission</a></li>
              <li><a href="#objectives" className="hover:text-brand-gold transition-colors">Objectives</a></li>
              <li><a href="#contact" className="hover:text-brand-gold transition-colors">Contact Office</a></li>
              <li><Link href="/partners" className="hover:text-brand-gold transition-colors">Our Partners</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-sm text-brand-gold uppercase tracking-wider mb-4">Portal Sign-in</h5>
            <p className="text-xs text-white/60 leading-relaxed mb-4 font-sans">
              Access your personalized visa status portal and secure document vault here.
            </p>
            <Link
              href="/portal/client"
              className="w-full text-center py-2 bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-1.5 transition-colors"
            >
              Enter Client Portal
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 font-semibold font-sans">
          <p>© {new Date().getFullYear()} Blessed Travel & Tour Agency (Kigali, Rwanda). All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-brand-gold transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-brand-gold transition-colors cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
