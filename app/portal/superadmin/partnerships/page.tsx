"use client";

import { useState, useEffect } from "react";
import {
  Building,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Mail,
  User
} from "lucide-react";

export default function SuperadminPartnerships() {
  const [partnerApps, setPartnerApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load active applications on mount
  useEffect(() => {
    async function loadApps() {
      try {
        const res = await fetch("/api/partners");
        if (res.ok) {
          const data = await res.json();
          setPartnerApps(data);
        }
      } catch (err) {
        console.error("Failed to load partner apps:", err);
      } finally {
        setLoading(false);
      }
    }
    loadApps();
  }, []);

  return (
    <div className="space-y-6 text-brand-navy dark:text-slate-100 font-sans">
      <div className="flex justify-between items-center pb-4 border-b border-brand-navy/5 dark:border-slate-850">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Alliance Partnerships Requests</h2>
          <p className="text-xs text-text-muted dark:text-slate-400 mt-1">
            Review incoming requests from hotels, airlines, and payment vendors to join the Blessed network.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/15 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-lg flex items-center gap-2 border-b border-brand-navy/5 pb-3">
          <Building className="w-5 h-5 text-brand-gold" />
          Received Strategic Alliance Proposals
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-10 text-xs font-semibold text-text-muted">
            <RefreshCw className="w-5 h-5 animate-spin text-brand-gold mr-2" />
            Loading partner registries...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-semibold">
              <thead>
                <tr className="bg-brand-gray-light dark:bg-slate-850 border-b border-brand-navy/10 text-brand-navy dark:text-slate-100/60 font-bold uppercase tracking-widest text-[9px]">
                  <th className="py-3 px-4">Company Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Contact Email</th>
                  <th className="py-3 px-4">Collaboration Description</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {partnerApps.map((app) => (
                  <tr key={app.id} className="border-b border-brand-navy/5 dark:border-slate-850 hover:bg-brand-gray-light dark:hover:bg-slate-800 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-brand-navy dark:text-slate-100">{app.companyName}</div>
                      <div className="text-[10px] text-text-muted mt-0.5">Contact: {app.contactPerson}</div>
                    </td>
                    <td className="py-4 px-4 text-brand-navy dark:text-slate-200">{app.category}</td>
                    <td className="py-4 px-4">
                      <a href={`mailto:${app.email}`} className="text-brand-gold hover:underline font-bold">{app.email}</a>
                    </td>
                    <td className="py-4 px-4 text-text-muted dark:text-slate-400 max-w-sm truncate leading-relaxed">
                      {app.description}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-2.5 py-0.5 bg-brand-gold/15 text-brand-navy dark:text-brand-gold rounded-full font-extrabold text-[9px] uppercase tracking-wider">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {partnerApps.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-text-muted font-bold bg-brand-gray-light/20">
                      No strategic requests logged in the database yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
