"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Sparkles,
  Phone,
  MessageSquare,
  Check,
  Building
} from "lucide-react";

interface Step {
  id: number;
  label: string;
  sublabel: string;
  status: "completed" | "active" | "pending";
  agentNote: string;
  timestamp: string;
}

export default function ClientDashboard() {
  const [currentStepId, setCurrentStepId] = useState(1);
  const [activePopover, setActivePopover] = useState<number | null>(null);
  const [clientRecord, setClientRecord] = useState<any>(null);

  // Load client record from Supabase via API
  useEffect(() => {
    async function loadClient() {
      if (typeof window !== "undefined") {
        const email = localStorage.getItem("userEmail");
        if (!email) return;

        try {
          const res = await fetch("/api/clients");
          if (res.ok) {
            const data = await res.json();
            const record = data.find((c: any) => c.email === email);
            if (record) {
              setClientRecord(record);
              setCurrentStepId(record.activeStep);
            }
          }
        } catch (err) {
          console.error("Database connection failed:", err);
        }
      }
    }
    loadClient();
  }, []);

  // Steps database mock
  const steps: Step[] = [
    {
      id: 1,
      label: "Document Submission",
      sublabel: "Requirements Uploaded",
      status: currentStepId > 1 ? "completed" : currentStepId === 1 ? "active" : "pending",
      agentNote: "All core files (Passport Bio and Invitation Letter) successfully archived in the secure vault.",
      timestamp: "Jul 15, 2026 at 09:30 AM"
    },
    {
      id: 2,
      label: "Agent Review",
      sublabel: "Verification in Progress",
      status: currentStepId > 2 ? "completed" : currentStepId === 2 ? "active" : "pending",
      agentNote: "Consular agent Keza Agasaro is verifying photo readability and checking passport validity constraints.",
      timestamp: "Jul 15, 2026 at 11:15 AM"
    },
    {
      id: 3,
      label: "Embassy Processing",
      sublabel: "Consular Submission",
      status: currentStepId > 3 ? "completed" : currentStepId === 3 ? "active" : "pending",
      agentNote: "Documents submitted to the Ministry of Foreign Affairs & Cooperation consular desk in Kigali.",
      timestamp: "Pending Submission"
    },
    {
      id: 4,
      label: "Issued & Finalized",
      sublabel: "Passport & Visa Ready",
      status: currentStepId > 4 ? "completed" : currentStepId === 4 ? "active" : "pending",
      agentNote: "Consular visa stamped. Physical passport available for dispatch or collection at the Kigali main office.",
      timestamp: "Pending Approval"
    }
  ];

  return (
    <div className="grid md:grid-cols-12 gap-8 text-brand-navy dark:text-slate-100">
      {/* LEFT PORTION: main tracker */}
      <div className="md:col-span-8 space-y-8">
        
        {/* Welcome VIP client header */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-navy/5 dark:border-slate-850 shadow-sm dark:shadow-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-brand-navy dark:text-slate-100 tracking-tight">Bonjour, {clientRecord?.name || "John Doe"}</h1>
            <p className="text-sm text-text-muted dark:text-slate-400 mt-1 font-medium">
              Consular Reference: <span className="text-brand-gold font-bold">{clientRecord?.id || "BTA-784-KGL"}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 bg-brand-gold/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-navy dark:text-slate-100 border border-brand-gold/20">
            <Sparkles className="w-4 h-4 text-brand-gold animate-bounce" />
            VIP Priority Service Mode
          </div>
        </div>

        {/* PROGRESS TRACKER CANVAS */}
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-brand-navy/15 dark:border-slate-800 shadow-sm dark:shadow-none relative">
          <h3 className="font-extrabold text-lg tracking-tight mb-8">Consular Protocol Timeline</h3>

          {/* Progress sequence bar */}
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 mt-4">
            {/* progress line background */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-brand-gray-light dark:bg-slate-850 -translate-y-1/2 z-0 hidden md:block" />

            {steps.map((step) => {
              const isCompleted = step.status === "completed";
              const isActive = step.status === "active";
              
              return (
                <div key={step.id} className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-2 flex-1 w-full md:w-auto">
                  <button
                    onClick={() => setActivePopover(activePopover === step.id ? null : step.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-350 cursor-pointer ${
                      isCompleted
                        ? "bg-green-500 text-white shadow-[0_0_12px_rgba(34,197,94,0.3)]"
                        : isActive
                        ? "bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy border-2 border-brand-gold animate-pulse glow-gold"
                        : "bg-brand-gray-light dark:bg-slate-850 text-text-muted dark:text-slate-500 border border-brand-navy/5 dark:border-slate-800"
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                  </button>

                  <div className="text-left md:text-center">
                    <p className={`text-xs font-bold ${isActive ? "text-brand-gold" : "text-brand-navy dark:text-slate-100"}`}>{step.label}</p>
                    <p className="text-[10px] text-text-muted dark:text-slate-400 font-semibold mt-0.5">{step.sublabel}</p>
                  </div>

                  {/* Popover detailed info bubble */}
                  <AnimatePresence>
                    {activePopover === step.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 right-0 md:left-1/2 md:-translate-x-1/2 top-14 md:w-64 bg-brand-navy text-white rounded-xl shadow-xl dark:shadow-2xl z-20 p-4 text-xs text-left border border-brand-gold/30"
                      >
                        <div className="absolute top-[-6px] left-5 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-brand-navy border-t border-l border-brand-gold/30 rotate-45" />
                        <div className="flex items-center gap-1.5 text-brand-gold font-bold uppercase tracking-widest text-[10px] mb-2">
                          <Clock className="w-3.5 h-3.5" />
                          Status log
                        </div>
                        <p className="leading-relaxed text-white/90 mb-3">{step.agentNote}</p>
                        <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-[10px] text-white/50">
                          <span>Verified Timestamp:</span>
                          <span className="text-brand-gold">{step.timestamp}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-brand-navy/5 dark:border-slate-850 flex items-center justify-between text-xs text-text-muted dark:text-slate-400 font-semibold">
            <p>ℹ️ Click on any timeline stage bubble to view precise consular audit updates.</p>
            <p className="hidden sm:block">Agent assigned: <span className="text-brand-navy dark:text-slate-100 font-bold">Keza A.</span></p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Protocol details */}
      <div className="md:col-span-4 space-y-6">
        
        {/* ASSIGNED PROTOCOL OFFICER CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/10 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-none relative group">
          {/* Header Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-brand-navy via-brand-gold to-brand-navy" />
          
          <div className="p-6">
            <h3 className="font-extrabold text-md tracking-tight mb-4 text-brand-navy dark:text-slate-100">Dedicated VIP Liaison</h3>

            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-gold bg-brand-navy/5 shrink-0">
                  <Image src="/headshot.jfif" alt="Keza Agasaro" fill className="object-cover" />
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
              </div>

              <div>
                <h4 className="font-extrabold text-base text-brand-navy dark:text-slate-100">Keza Agasaro</h4>
                <p className="text-xs text-brand-gold font-bold uppercase tracking-wider">Protocol Officer</p>
                <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold mt-1 bg-green-50 px-2 py-0.5 rounded w-fit">
                  On Duty (Kigali Intl)
                </div>
              </div>
            </div>

            {/* Quick liaison metrics */}
            <div className="mt-6 space-y-3 pt-4 border-t border-brand-navy/5 dark:border-slate-850 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-text-muted dark:text-slate-400">Direct Mobile:</span>
                <span className="text-brand-navy dark:text-slate-100 font-bold">+250 788 987 654</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-text-muted dark:text-slate-400">Assigned Tasks:</span>
                <span className="text-brand-navy dark:text-slate-100 font-bold">Kigali VIP Gate Protocol</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-text-muted dark:text-slate-400">Duty Shift:</span>
                <span className="text-brand-navy dark:text-slate-100 font-bold">08:00 AM - 08:00 PM</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <a
                href="tel:+250788987654"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-brand-navy/15 dark:border-slate-800 hover:border-brand-navy font-bold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                Call Liaison
              </a>
              <Link
                href="/portal/client/messages"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-navy hover:bg-brand-blue-dark text-white font-bold text-xs transition-all duration-300"
              >
                <MessageSquare className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
                Live Chat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
