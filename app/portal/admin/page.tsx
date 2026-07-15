"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  CheckCircle,
  Clock,
  Compass,
  Building,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  FileCheck,
  UserCheck
} from "lucide-react";

interface ClientRecord {
  id: string;
  name: string;
  destination: string;
  activeStep: number;
  passportStatus: "Pending" | "Uploaded" | "Approved" | "Rejected";
  inviteStatus: "Pending" | "Uploaded" | "Approved" | "Rejected";
  officer: string;
  email: string;
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [simulatedClients, setSimulatedClients] = useState<ClientRecord[]>([]);

  // Load clients dynamically from database on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/clients");
        if (res.ok) {
          const data = await res.json();
          setSimulatedClients(data);
        }
      } catch (err) {
        console.error("Database connection failure:", err);
      }
    }
    loadData();
  }, []);

  // Filter clients based on search query
  const filteredClients = simulatedClients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStepLabel = (step: number) => {
    if (step === 1) return "Submission";
    if (step === 2) return "Agent Review";
    if (step === 3) return "Embassy Processing";
    return "Finalized";
  };

  // Metrics totals computed dynamically
  const totalCases = simulatedClients.length;
  const verifiedFilesCount = simulatedClients.filter(
    c => c.passportStatus === "Approved" && c.inviteStatus === "Approved"
  ).length;
  const activeEmbassyCount = simulatedClients.filter(c => c.activeStep === 3).length;

  return (
    <div className="space-y-8 text-brand-navy dark:text-slate-100 font-sans">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-brand-navy/5 dark:border-slate-850 shadow-sm dark:shadow-none flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-text-muted dark:text-slate-400 uppercase tracking-widest">Consular Case Load</p>
            <h3 className="text-2xl font-black text-brand-navy dark:text-slate-100 mt-1">{totalCases} Active</h3>
            <span className="inline-flex items-center gap-1 text-[9px] text-brand-navy dark:text-slate-100/70 font-bold mt-2 bg-brand-gray-light dark:bg-slate-850 px-2 py-0.5 rounded">
              Kigali HQ Registers
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-brand-navy/5 dark:border-slate-850 shadow-sm dark:shadow-none flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-text-muted dark:text-slate-400 uppercase tracking-widest">Verified Dossiers</p>
            <h3 className="text-2xl font-black text-brand-navy dark:text-slate-100 mt-1">{verifiedFilesCount} Approved</h3>
            <span className="inline-flex items-center gap-1 text-[9px] text-green-600 font-bold mt-2 bg-green-50 px-2 py-0.5 rounded">
              <CheckCircle className="w-3 h-3" /> Ready for Dispatch
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-brand-navy/5 dark:border-slate-850 shadow-sm dark:shadow-none flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-text-muted dark:text-slate-400 uppercase tracking-widest">Embassy Gated Submissions</p>
            <h3 className="text-2xl font-black text-brand-navy dark:text-slate-100 mt-1">{activeEmbassyCount} In Progress</h3>
            <span className="inline-flex items-center gap-1 text-[9px] text-brand-gold font-bold mt-2 bg-brand-gold/10 px-2 py-0.5 rounded">
              Diplomatic Node Active
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
            <Building className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Pipelines List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/15 dark:border-slate-800 shadow-sm dark:shadow-none overflow-hidden">
        
        {/* Search header controls */}
        <div className="p-6 border-b border-brand-navy/5 dark:border-slate-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900">
          <div>
            <h3 className="font-extrabold text-lg tracking-tight">Consular Operations Pipeline</h3>
            <p className="text-xs text-text-muted dark:text-slate-400 mt-1">Search or audit traveler itineraries and document verifications.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy dark:text-slate-100/40" />
            <input
              type="text"
              placeholder="Search traveler, reference ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 hover:border-brand-navy/20 dark:hover:border-slate-800 focus:border-brand-gold rounded-lg pl-10 pr-4 py-2 text-sm text-brand-navy dark:text-slate-100 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Pipelines Log Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-semibold">
            <thead>
              <tr className="bg-brand-gray-light dark:bg-slate-850/60 border-b border-brand-navy/15 dark:border-slate-800 text-brand-navy dark:text-slate-100/60 font-bold uppercase tracking-widest text-[9px]">
                <th className="py-3 px-4">Traveler details</th>
                <th className="py-3 px-4">Target Destination</th>
                <th className="py-3 px-4 text-center">Active Step</th>
                <th className="py-3 px-4 text-center">Passport status</th>
                <th className="py-3 px-4 text-center">Invitation status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-brand-navy/5 dark:border-slate-850 hover:bg-brand-gray-light dark:hover:bg-slate-800 dark:bg-slate-850/35 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="font-extrabold text-brand-navy dark:text-slate-100">{c.name}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">Ref: {c.id}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-extrabold text-brand-navy dark:text-slate-100">{c.destination}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">Liaison: {c.officer}</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-extrabold text-brand-navy dark:text-slate-200">Stage {c.activeStep} of 4</span>
                      <span className="text-[9px] text-text-muted mt-0.5">({getStepLabel(c.activeStep)})</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded font-extrabold text-[9px] uppercase tracking-wider ${
                      c.passportStatus === "Approved"
                        ? "bg-green-100 text-green-700"
                        : c.passportStatus === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {c.passportStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded font-extrabold text-[9px] uppercase tracking-wider ${
                      c.inviteStatus === "Approved"
                        ? "bg-green-100 text-green-700"
                        : c.inviteStatus === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {c.inviteStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Link
                      href={`/portal/admin/verify?id=${c.id}`}
                      className="px-3 py-1.5 bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy rounded font-bold transition-all inline-flex items-center gap-1"
                    >
                      Verify Case
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-text-muted font-bold text-sm bg-brand-gray-light dark:bg-slate-850/10">
                    No active traveler dossiers match the search keywords.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
