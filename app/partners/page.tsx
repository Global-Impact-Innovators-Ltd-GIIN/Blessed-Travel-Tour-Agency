"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Building,
  Check,
  ArrowLeft,
  Sun,
  Moon,
  Plane,
  Shield,
  Briefcase,
  Send,
  Mail,
  User,
  HeartHandshake,
  RefreshCw
} from "lucide-react";

export default function Partners() {
  const [theme, setTheme] = useState("light");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [partnerType, setPartnerType] = useState("Airline Partner");

  // Form states
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [description, setDescription] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

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

  const partnerList = [
    {
      name: "RwandAir",
      type: "Airline Partner",
      description: "Official flag carrier of Rwanda, supporting local flight connections, priority ticketing, and customized corporate rates out of Kigali.",
      badge: "Preferred Carrier",
      logo: Plane,
      color: "from-green-500/10 to-emerald-500/10 border-emerald-500/20"
    },
    {
      name: "Qatar Airways",
      type: "Airline Partner",
      description: "Providing premium global flight itineraries, VIP cabin access, and elite corporate traveler pricing directly integrated into our portal.",
      badge: "Strategic Global Partner",
      logo: Plane,
      color: "from-red-500/10 to-rose-500/10 border-rose-500/20"
    },
    {
      name: "Radisson Blu & Convention Centre",
      type: "Hospitality Partner",
      description: "Luxury hotel accommodations, corporate conferences, and VIP protocol transport service in Kigali for Blessed client delegations.",
      badge: "5-Star Lodging",
      logo: Building,
      color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20"
    },
    {
      name: "German Embassy Kigali",
      type: "Consular Affiliate",
      description: "Coordinating diplomatic access, academic exchange student fast-tracking, and secure document verification processes.",
      badge: "Official Visa Node",
      logo: Shield,
      color: "from-yellow-500/10 to-amber-500/10 border-amber-500/20"
    },
    {
      name: "Rwanda Development Board (RDB)",
      type: "Government Affiliate",
      description: "Facilitating luxury tourism access, Volcanoes gorilla trekking permits, investment logisitcs, and sustainable eco-travel programs.",
      badge: "Tourism Authority",
      logo: Globe,
      color: "from-teal-500/10 to-cyan-500/10 border-teal-500/20"
    },
    {
      name: "MTN Mobile Money",
      type: "Fintech Partner",
      description: "Powering real-time local booking payments and automated mobile deposits across Rwanda securely via the Blessed Client Portal.",
      badge: "Core Payment Node",
      logo: Briefcase,
      color: "from-yellow-400/10 to-amber-400/10 border-yellow-400/20"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          contactPerson,
          email: emailAddress,
          category: partnerType,
          description
        }),
      });

      setFormLoading(false);
      if (res.ok) {
        setFormSubmitted(true);
        setCompanyName("");
        setContactPerson("");
        setEmailAddress("");
        setDescription("");
      } else {
        const data = await res.json();
        setFormError(data.error || "Failed to submit request.");
      }
    } catch (err) {
      setFormLoading(false);
      setFormError("Database Connection Failure: Unable to transmit application.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-brand-navy dark:text-slate-100 flex flex-col selection:bg-brand-gold selection:text-brand-navy transition-colors duration-300">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-brand-gray-light dark:border-slate-900 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-brand-navy flex items-center justify-center border border-brand-gold/20">
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
        {/* HERO */}
        <section className="relative py-16 px-6 md:px-12 bg-gradient-to-b from-brand-gray-light dark:from-slate-900 to-white dark:to-slate-950 text-center border-b border-brand-navy/5 dark:border-slate-900">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/5 dark:bg-brand-gold/10 border border-brand-navy/10 dark:border-brand-gold/20 text-brand-navy dark:text-brand-gold font-bold text-xs uppercase tracking-widest">
              <HeartHandshake className="w-4 h-4 text-brand-gold" />
              Strategic Global Alliances
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-brand-navy dark:text-white leading-tight">
              Our Trust Network & Partners
            </h1>
            <p className="text-base text-text-muted dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              We coordinate with leading global aviation networks, national tourism boards, key regional embassies, and top hotel groups to provide reliable VIP travel services on behalf of our clients.
            </p>
          </div>
        </section>

        {/* PARTNERS DIRECTORY */}
        <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Blessed Network</h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-brand-navy dark:text-white">Active Partnerships</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerList.map((partner, index) => {
              const LogoComp = partner.logo;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`bg-gradient-to-br ${partner.color} p-6 rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-brand-navy dark:bg-slate-950 flex items-center justify-center text-brand-gold shrink-0 shadow-inner">
                        <LogoComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-brand-gold/15 text-brand-navy dark:text-brand-gold rounded-full">
                        {partner.badge}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-lg text-brand-navy dark:text-white mb-2">{partner.name}</h4>
                    <p className="text-xs text-text-muted dark:text-slate-400 font-semibold mb-2 uppercase tracking-wide">{partner.type}</p>
                    <p className="text-xs text-text-muted dark:text-slate-400 leading-relaxed mb-6">{partner.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-brand-navy dark:text-brand-gold border-t border-brand-navy/5 dark:border-slate-800 pt-4">
                    <Check className="w-4 h-4 text-green-500" />
                    Integrated Consular Application API active
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* APPLY FOR PARTNERSHIP FORM */}
        <section className="py-20 bg-brand-gray-light dark:bg-slate-900/60 border-t border-brand-navy/5 dark:border-slate-900 px-6 md:px-12">
          <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/10 dark:border-slate-800 p-8 shadow-xl">
            <div className="text-center mb-8">
              <HeartHandshake className="w-10 h-10 text-brand-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-navy dark:text-white">Partner With Us</h3>
              <p className="text-xs text-text-muted dark:text-slate-400 mt-2">
                Join our network to coordinate travels, share documents, and scale logistics across Africa.
              </p>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-brand-navy dark:text-white">Request Dispatched</h4>
                <p className="text-xs text-text-muted dark:text-slate-400 leading-relaxed">
                  Thank you! Our Corporate Development Team in Kigali will inspect your partnership query and get back within 2 business days.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-bold text-brand-gold underline hover:no-underline"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                {formError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 rounded">
                    {formError}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Company Name</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy dark:text-slate-100/40" />
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-brand-gray-light dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg pl-9 pr-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none"
                        placeholder="e.g. Radisson Blu"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Contact Person</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy dark:text-slate-100/40" />
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="w-full bg-brand-gray-light dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg pl-9 pr-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none"
                        placeholder="e.g. Marie Keza"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy dark:text-slate-100/40" />
                    <input
                      type="email"
                      required
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full bg-brand-gray-light dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg pl-9 pr-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none"
                      placeholder="marie@hotelgroup.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Partnership Category</label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="w-full bg-brand-gray-light dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none"
                  >
                    <option>Airline Partner</option>
                    <option>Hotel & Lodging Partner</option>
                    <option>Consular / Embassy Affiliate</option>
                    <option>Payment Gateway Vendor</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-brand-navy/60 dark:text-slate-400 uppercase tracking-widest mb-1.5">Collaboration Description</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-brand-gray-light dark:bg-slate-800 border border-brand-navy/10 dark:border-slate-700 focus:border-brand-gold rounded-lg px-4 py-2.5 text-sm text-brand-navy dark:text-white focus:outline-none resize-none"
                    placeholder="Brief outline of how we can work together..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50"
                >
                  {formLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Submit Application
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
