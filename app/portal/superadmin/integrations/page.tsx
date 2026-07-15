"use client";

import { useState } from "react";
import {
  Settings2,
  CreditCard,
  ToggleRight,
  ToggleLeft,
  Key,
  MessageSquare,
  Activity,
  CheckCircle,
  Clock
} from "lucide-react";

export default function SuperadminIntegrations() {
  const [momoEnabled, setMomoEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  
  const [momoKey, setMomoKey] = useState("momo_prod_kgl_82938472910");
  const [twilioSid, setTwilioSid] = useState("AC8374928374928374928374");

  const handleSaveIntegrations = (e: React.FormEvent) => {
    e.preventDefault();
    alert("System Settings: MTN MoMo Gateway and SMS Server API keys updated successfully!");
  };

  const netMetrics = [
    { label: "MoMo API Node", status: "Operational", ping: "45ms", icon: CheckCircle },
    { label: "Twilio SMS Broker", status: "Operational", ping: "12ms", icon: CheckCircle },
    { label: "Supabase DB Core", status: "Operational", ping: "8ms", icon: CheckCircle }
  ];

  return (
    <div className="space-y-6 text-brand-navy dark:text-slate-100 font-sans">
      <div className="flex justify-between items-center pb-4 border-b border-brand-navy/5 dark:border-slate-850">
        <div>
          <h2 className="text-2xl font-black tracking-tight">API Gateways & Integrations</h2>
          <p className="text-xs text-text-muted dark:text-slate-400 mt-1">
            Manage real-time mobile payment gateway keys, Twilio SMS servers, and database pools.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Forms column (LEFT) */}
        <div className="md:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/15 dark:border-slate-800 shadow-sm space-y-6">
          <form onSubmit={handleSaveIntegrations} className="space-y-6 text-xs font-semibold">
            {/* MTN MoMo Integration Card */}
            <div className="p-4 bg-brand-gray-light dark:bg-slate-850/60 rounded-2xl border border-brand-navy/5 dark:border-slate-850 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-brand-gold" />
                  <div>
                    <h4 className="font-extrabold text-sm text-brand-navy dark:text-slate-100">MTN MoMo Gateway</h4>
                    <p className="text-[10px] text-text-muted dark:text-slate-400 mt-0.5">Regional mobile payments integration</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMomoEnabled(!momoEnabled)}
                  className="text-brand-navy dark:text-slate-100 focus:outline-none transition-transform cursor-pointer"
                >
                  {momoEnabled ? (
                    <ToggleRight className="w-9 h-9 text-brand-navy dark:text-slate-100" />
                  ) : (
                    <ToggleLeft className="w-9 h-9 text-brand-navy/35 dark:text-slate-100/35" />
                  )}
                </button>
              </div>

              {momoEnabled && (
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-brand-navy dark:text-slate-100/60 mb-1.5">
                      Production Merchant Key
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-navy dark:text-slate-100/40" />
                      <input
                        type="text"
                        value={momoKey}
                        onChange={(e) => setMomoKey(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-brand-navy/10 dark:border-slate-800 rounded-lg pl-9 pr-4 py-2 text-brand-navy dark:text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Twilio SMS Notification Card */}
            <div className="p-4 bg-brand-gray-light dark:bg-slate-850/60 rounded-2xl border border-brand-navy/5 dark:border-slate-850 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-brand-gold" />
                  <div>
                    <h4 className="font-extrabold text-sm text-brand-navy dark:text-slate-100">Twilio SMS Broker</h4>
                    <p className="text-[10px] text-text-muted dark:text-slate-400 mt-0.5">Automated visual status tracking alerts</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsEnabled(!smsEnabled)}
                  className="text-brand-navy dark:text-slate-100 focus:outline-none transition-transform cursor-pointer"
                >
                  {smsEnabled ? (
                    <ToggleRight className="w-9 h-9 text-brand-navy dark:text-slate-100" />
                  ) : (
                    <ToggleLeft className="w-9 h-9 text-brand-navy/35 dark:text-slate-100/35" />
                  )}
                </button>
              </div>

              {smsEnabled && (
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-brand-navy dark:text-slate-100/60 mb-1.5">
                      Account SID Reference
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-navy dark:text-slate-100/40" />
                      <input
                        type="text"
                        value={twilioSid}
                        onChange={(e) => setTwilioSid(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-brand-navy/10 dark:border-slate-800 rounded-lg pl-9 pr-4 py-2 text-brand-navy dark:text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-brand-navy hover:bg-brand-blue-dark text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Save Integration Gateway States
            </button>
          </form>
        </div>

        {/* Network Status metrics (RIGHT) */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/15 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-extrabold text-sm flex items-center gap-2 border-b border-brand-navy/5 pb-2">
              <Activity className="w-4 h-4 text-brand-gold" />
              API Connectivity Metrics
            </h4>

            <div className="space-y-4 text-xs font-semibold">
              {netMetrics.map((met, idx) => {
                const IconComp = met.icon;
                return (
                  <div key={idx} className="flex justify-between items-center p-3 bg-brand-gray-light dark:bg-slate-850 rounded-xl border border-brand-navy/5">
                    <div>
                      <p className="font-bold text-brand-navy dark:text-slate-100">{met.label}</p>
                      <p className="text-[10px] text-green-600 mt-0.5">{met.status}</p>
                    </div>
                    <span className="text-[10px] text-text-muted font-mono">{met.ping}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
