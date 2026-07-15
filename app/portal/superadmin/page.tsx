"use client";

import { useState } from "react";
import {
  TrendingUp,
  Lock,
  Globe2,
  DollarSign,
  UserCheck,
  CheckCircle,
  ShieldCheck
} from "lucide-react";

interface StaffRecord {
  name: string;
  role: string;
  status: string;
  permissions: "All (Super)" | "Read/Write" | "Read Only";
}

export default function SuperadminDashboard() {
  // Staff records
  const [staff, setStaff] = useState<StaffRecord[]>([
    {
      name: "Hon. Sarah Jenkins",
      role: "Super Administrator",
      status: "Active",
      permissions: "All (Super)"
    },
    {
      name: "Keza Agasaro",
      role: "Consular Protocol Officer",
      status: "On Shift",
      permissions: "Read/Write"
    },
    {
      name: "Eric Murwanashyaka",
      role: "Travel Ticketing Agent",
      status: "On Shift",
      permissions: "Read/Write"
    },
    {
      name: "Aline Umutoni",
      role: "Intern Analyst",
      status: "Off Duty",
      permissions: "Read Only"
    }
  ]);

  const handleUpdatePermission = (name: string, newPerm: "All (Super)" | "Read/Write" | "Read Only") => {
    setStaff((prev) =>
      prev.map((s) => (s.name === name ? { ...s, permissions: newPerm } : s))
    );
    alert(`Success: Updated permissions for ${name} to ${newPerm}.`);
  };

  return (
    <div className="space-y-8 text-brand-navy dark:text-slate-100 font-sans">
      {/* Overview Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-navy/5 dark:border-slate-850 shadow-sm dark:shadow-none flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-text-muted dark:text-slate-400 uppercase tracking-wider">Gross Bookings Revenue</p>
            <h3 className="text-2xl font-black text-brand-navy dark:text-slate-100 mt-1">45.8M RWF</h3>
            <span className="inline-flex items-center gap-1 text-[10px] text-green-600 font-bold mt-2 bg-green-50 px-2 py-0.5 rounded">
              <TrendingUp className="w-3 h-3" /> +18.4% MoM
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-navy/5 dark:border-slate-850 shadow-sm dark:shadow-none flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-text-muted dark:text-slate-400 uppercase tracking-wider">Embassy Success Rate</p>
            <h3 className="text-2xl font-black text-brand-navy dark:text-slate-100 mt-1">99.4%</h3>
            <span className="inline-flex items-center gap-1 text-[10px] text-green-600 font-bold mt-2 bg-green-50 px-2 py-0.5 rounded">
              <CheckCircle className="w-3 h-3" /> Global Standard
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
            <Globe2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-navy/5 dark:border-slate-850 shadow-sm dark:shadow-none flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-text-muted dark:text-slate-400 uppercase tracking-wider">Active Agency Personnel</p>
            <h3 className="text-2xl font-black text-brand-navy dark:text-slate-100 mt-1">12 Officers</h3>
            <span className="inline-flex items-center gap-1 text-[10px] text-brand-navy dark:text-slate-100/70 font-bold mt-2 bg-brand-gray-light dark:bg-slate-850 px-2 py-0.5 rounded">
              Kigali HQ
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-navy/5 dark:border-slate-850 shadow-sm dark:shadow-none flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-text-muted dark:text-slate-400 uppercase tracking-wider">Platform Security</p>
            <h3 className="text-2xl font-black text-green-600 mt-1">Optimal</h3>
            <span className="inline-flex items-center gap-1 text-[10px] text-green-600 font-bold mt-2 bg-green-50 px-2 py-0.5 rounded">
              AES-256 Enabled
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Personnel Access Roles */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/15 dark:border-slate-800 shadow-sm dark:shadow-none space-y-6 max-w-4xl">
        <div className="flex items-center gap-2 mb-2 pb-4 border-b border-brand-navy/5 dark:border-slate-850">
          <Lock className="w-5 h-5 text-brand-gold" />
          <h3 className="font-extrabold text-lg tracking-tight">Security & Role Delegation</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-semibold">
            <thead>
              <tr className="bg-brand-gray-light dark:bg-slate-850 border-b border-brand-navy/10 dark:border-slate-800 text-brand-navy dark:text-slate-100/60 font-bold uppercase tracking-widest text-[9px]">
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Workspace Privilege</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s, index) => (
                <tr key={index} className="border-b border-brand-navy/5 dark:border-slate-850 hover:bg-brand-gray-light dark:hover:bg-slate-800 dark:bg-slate-850/35 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-extrabold text-brand-navy dark:text-slate-100">{s.name}</div>
                    <div className="text-[10px] text-text-muted dark:text-slate-400 mt-0.5">{s.role} • <span className="text-green-600 font-bold">{s.status}</span></div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={s.permissions}
                      onChange={(e) =>
                        handleUpdatePermission(
                          s.name,
                          e.target.value as "All (Super)" | "Read/Write" | "Read Only"
                        )
                      }
                      className="bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 rounded px-2 py-1 font-bold text-brand-navy dark:text-slate-100 focus:outline-none cursor-pointer"
                    >
                      <option value="All (Super)">All (Super)</option>
                      <option value="Read/Write">Read/Write</option>
                      <option value="Read Only">Read Only</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/20 flex gap-3 text-xs leading-relaxed font-semibold">
          <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
          <div>
            <p className="text-brand-navy dark:text-slate-100 font-black">Consular Access Controls</p>
            <p className="text-text-muted dark:text-slate-400 mt-0.5 text-[11px] leading-relaxed">
              Superadmins delegate functional workspaces to specific staff. "Read/Write" authorizes officers to review visa files and progress statuses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
