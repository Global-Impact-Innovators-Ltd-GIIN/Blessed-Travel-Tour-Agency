"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowLeft,
  Sun,
  Moon,
  Calendar,
  Users as UsersIcon,
  Check,
  PlaneTakeoff,
  Send,
  MapPin,
  Clock,
  Sparkles
} from "lucide-react";

export default function Safaris() {
  const [theme, setTheme] = useState("light");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);
  
  const [selectedPackage, setSelectedPackage] = useState("Volcanoes Gorilla Trekking");
  const [travelersCount, setTravelersCount] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

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

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryLoading(true);
    setTimeout(() => {
      setInquiryLoading(false);
      setInquirySubmitted(true);
    }, 1200);
  };

  const packages = [
    {
      name: "Volcanoes Gorilla Trekking",
      tag: "Signature VIP",
      location: "Volcanoes National Park, Rwanda",
      duration: "3 Days / 2 Nights",
      description: "An elite gorilla trekking experience. Includes luxury lodging at Bisate Lodge, professional conservation trackers, and VIP airport protocol.",
      features: ["VIP Airport Lounge Access", "Bisate Lodge Luxury Suite", "Guaranteed Gorilla Permits", "Private 4x4 Cruiser Transfers"],
      price: "$2,850",
      image: "/gorilla.png"
    },
    {
      name: "Akagera Big Five Safaris",
      tag: "Classic Adventure",
      location: "Akagera National Park, Rwanda",
      duration: "4 Days / 3 Nights",
      description: "Immerse yourself in Akagera's rolling savannah. Inspect lions, leopards, rhinos, elephants, and buffalos alongside expert safari guides.",
      features: ["Luxury Tent Camping", "Night Game Drives", "Lake Ihema Boat Cruise", "All Park & Conservation Fees"],
      price: "$1,620",
      image: "/safari.png"
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
              <Compass className="w-4 h-4 text-brand-gold" />
              Conservation & Expeditions
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-brand-navy dark:text-white leading-tight">
              Bespoke Safaris & Wilderness
            </h1>
            <p className="text-base text-text-muted dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Experience Rwanda's breathtaking national parks. Track majestic mountain gorillas, spot the Big Five savannah beasts, and hike misty rain canopy trails with dedicated luxury planning.
            </p>
          </div>
        </section>

        {/* PACKAGE LISTINGS */}
        <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto space-y-16">
          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/10 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-64 w-full">
                  <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                  <span className="absolute top-4 left-4 bg-brand-navy/85 border border-brand-gold/25 px-3 py-1 rounded-full text-brand-gold font-bold text-[10px] uppercase tracking-wider">
                    {pkg.tag}
                  </span>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-extrabold text-xl text-brand-navy dark:text-white leading-snug">{pkg.name}</h3>
                      <span className="text-brand-gold font-black text-lg">{pkg.price}</span>
                    </div>
                    <div className="flex gap-4 text-xs font-semibold text-text-muted dark:text-slate-400">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {pkg.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pkg.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-text-muted dark:text-slate-400 font-semibold">{pkg.description}</p>

                  <div className="space-y-2 pt-4 border-t border-brand-navy/5 dark:border-slate-850">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Package Highlights</p>
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold text-brand-navy dark:text-slate-200">
                      {pkg.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-green-500 shrink-0" />
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPackage(pkg.name);
                      document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3 bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Select Inquiry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOOKING INQUIRY FORM */}
        <section id="inquiry-form" className="py-20 bg-brand-gray-light dark:bg-slate-900/60 border-t border-brand-navy/5 dark:border-slate-900 px-6 md:px-12">
          <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/15 dark:border-slate-800 p-8 shadow-xl">
            <div className="text-center mb-8">
              <Sparkles className="w-10 h-10 text-brand-gold mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-brand-navy dark:text-white">Safari Booking Inquiry</h3>
              <p className="text-xs text-text-muted dark:text-slate-400 mt-2">
                Submit your travel schedule to configure custom corporate or luxury safari logistics.
              </p>
            </div>

            {inquirySubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-brand-navy dark:text-white">Inquiry Logged</h4>
                <p className="text-xs text-text-muted dark:text-slate-400 leading-relaxed">
                  Thank you! A dedicated safari coordinator in Kigali will review permit quotas and contact you within 24 hours.
                </p>
                <button
                  onClick={() => setInquirySubmitted(false)}
                  className="text-xs font-bold text-brand-gold underline hover:no-underline"
                >
                  Configure another safari
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-4 text-xs font-semibold">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Selected Itinerary</label>
                  <select
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full bg-brand-gray-light dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none"
                  >
                    <option>Volcanoes Gorilla Trekking</option>
                    <option>Akagera Big Five Safaris</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Travelers Count</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={12}
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(Number(e.target.value))}
                      className="w-full bg-brand-gray-light dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Target Date</label>
                    <input
                      type="date"
                      required
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-brand-gray-light dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Contact Person Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-brand-gray-light dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none"
                    placeholder="e.g. Jean-Luc Nkurunziza"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-brand-gray-light dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none"
                    placeholder="jean@domain.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={inquiryLoading}
                  className="w-full bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50"
                >
                  {inquiryLoading ? (
                    <Clock className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Submit Inquiry Proposal
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
