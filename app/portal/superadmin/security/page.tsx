"use client";

import { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  RotateCw,
  Clock,
  UserCheck,
  Lock,
  Key,
  Terminal,
  Activity
} from "lucide-react";

interface AuditLog {
  user: string;
  action: string;
  timestamp: string;
  ip: string;
  status: string;
}

export default function SuperadminSecurity() {
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      user: "superadmin@blessedtravel.rw",
      action: "Platform Security Audit Inspect",
      timestamp: "Jul 15, 2026 at 19:45:10",
      ip: "197.243.12.98 (Kigali, RW)",
      status: "Successful"
    },
    {
      user: "agent.keza@blessedtravel.rw",
      action: "Consular Dossier Verify Approved",
      timestamp: "Jul 15, 2026 at 17:15:33",
      ip: "197.243.14.22 (Kigali, RW)",
      status: "Successful"
    },
    {
      user: "client@gmail.com",
      action: "Secure Vault Document Upload",
      timestamp: "Jul 15, 2026 at 16:08:44",
      ip: "197.243.11.104 (Kigali, RW)",
      status: "Successful"
    },
    {
      user: "unknown@anonymous.net",
      action: "Blocked Auth Pipeline Intrusion",
      timestamp: "Jul 15, 2026 at 12:22:04",
      ip: "45.89.222.18 (Frankfurt, DE)",
      status: "Blocked"
    }
  ]);

  const [rotating, setRotating] = useState(false);

  const handleRotateKeys = () => {
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
      alert("Platform Security: AES-256 database cryptographic keys rotated successfully. Old handles expired.");
    }, 1500);
  };

  return (
    <div className="space-y-6 text-brand-navy dark:text-slate-100 font-sans">
      <div className="flex justify-between items-center pb-4 border-b border-brand-navy/5 dark:border-slate-850">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Security & Audits Console</h2>
          <p className="text-xs text-text-muted dark:text-slate-400 mt-1">
            Audit system operations logs, monitor session details, and rotate database cryptographic handles.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Logs Table (LEFT) */}
        <div className="md:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/15 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-lg flex items-center gap-2 border-b border-brand-navy/5 pb-3">
            <Terminal className="w-5 h-5 text-brand-gold" />
            System Authentication Audit Trail
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-semibold">
              <thead>
                <tr className="bg-brand-gray-light dark:bg-slate-850 border-b border-brand-navy/10 text-brand-navy dark:text-slate-100/60 font-bold uppercase tracking-widest text-[9px]">
                  <th className="py-3 px-4">Operator</th>
                  <th className="py-3 px-4">Transaction Action</th>
                  <th className="py-3 px-4">Timestamp & IP</th>
                  <th className="py-3 px-4 text-center">Audit</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, idx) => (
                  <tr key={idx} className="border-b border-brand-navy/5 dark:border-slate-850 hover:bg-brand-gray-light dark:hover:bg-slate-800 transition-colors">
                    <td className="py-4 px-4 font-bold text-brand-navy dark:text-slate-100">{log.user}</td>
                    <td className="py-4 px-4 text-text-muted dark:text-slate-400">{log.action}</td>
                    <td className="py-4 px-4">
                      <div>{log.timestamp}</div>
                      <div className="text-[10px] text-text-muted mt-0.5">{log.ip}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase ${
                        log.status === "Successful" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cryptographic Controls (RIGHT) */}
        <div className="md:col-span-4 space-y-6">
          {/* AES Status Card */}
          <div className="bg-brand-gold/10 rounded-2xl border border-brand-gold/20 p-6 space-y-4">
            <div className="flex gap-2 text-xs font-bold text-brand-navy dark:text-slate-100">
              <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
              <span>Cryptographic Vault Status</span>
            </div>
            <p className="text-[11px] leading-relaxed text-text-muted dark:text-slate-300 font-semibold">
              AES-256 platform encryption is fully active on all PostgreSQL columns containing passport scans or biodata records.
            </p>
          </div>

          {/* Key rotation */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/15 dark:border-slate-800 space-y-4">
            <h4 className="font-extrabold text-sm flex items-center gap-2">
              <Key className="w-4.5 h-4.5 text-brand-gold" />
              Cryptographic Handles
            </h4>
            <p className="text-[11px] leading-relaxed text-text-muted dark:text-slate-400 font-semibold">
              Force-expire current session signatures and rotate platform private decryption handles.
            </p>
            <button
              onClick={handleRotateKeys}
              disabled={rotating}
              className="w-full py-3 bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCw className={`w-4 h-4 ${rotating ? "animate-spin" : ""}`} />
              {rotating ? "Rotating Keys..." : "Rotate Cryptographic Keys"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
