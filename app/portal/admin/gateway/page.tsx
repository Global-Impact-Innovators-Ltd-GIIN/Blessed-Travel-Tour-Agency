"use client";

import { useState, useEffect } from "react";
import {
  Building,
  Plane,
  Shield,
  Clock,
  RefreshCw,
  Send,
  FileCheck,
  CheckCircle,
  XCircle,
  HelpCircle
} from "lucide-react";

export default function ConsularGateway() {
  const [simulatedClients, setSimulatedClients] = useState<any[]>([]);
  const [dispatches, setDispatches] = useState<any[]>([]);
  
  const [formClient, setFormClient] = useState("");
  const [formPartner, setFormPartner] = useState("German Embassy Kigali");
  const [sharePassport, setSharePassport] = useState(true);
  const [shareInvite, setShareInvite] = useState(false);
  const [dispatchLoading, setDispatchLoading] = useState(false);

  // Load clients and transmissions dynamically on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [clientsRes, dispatchesRes] = await Promise.all([
          fetch("/api/clients"),
          fetch("/api/dispatches")
        ]);
        if (clientsRes.ok && dispatchesRes.ok) {
          const clientsData = await clientsRes.json();
          const dispatchesData = await dispatchesRes.json();
          setSimulatedClients(clientsData);
          setDispatches(dispatchesData);
          
          if (clientsData.length > 0) {
            setFormClient(clientsData[0].id);
          }
        }
      } catch (err) {
        console.error("Database connection failure:", err);
      }
    }
    loadData();
  }, []);

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    const matchedClient = simulatedClients.find(c => c.id === formClient);
    if (!matchedClient) return;

    setDispatchLoading(true);
    const docs = [];
    if (sharePassport) docs.push("Passport Bio Scan");
    if (shareInvite) docs.push("Official Invitation Letter");

    const payload = {
      id: "DIS-" + Math.floor(Math.random() * 900 + 100),
      clientName: matchedClient.name,
      clientId: matchedClient.id,
      partner: formPartner,
      documents: docs,
      status: "Submitted to Partner",
      date: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    try {
      const res = await fetch("/api/dispatches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setDispatchLoading(false);
      if (res.ok) {
        const newDispatch = await res.json();
        setDispatches(prev => [newDispatch, ...prev]);
        alert(`Success: Dossier dispatched to ${formPartner} securely via 256-bit API tunnel!`);
      }
    } catch (err) {
      setDispatchLoading(false);
      alert("Error: Database connection failed.");
    }
  };

  const handleSimulatePartnerResponse = async (dispatchId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/dispatches", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: dispatchId, status: newStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setDispatches(prev => prev.map(d => d.id === dispatchId ? updated : d));
      }
    } catch (err) {
      alert("Error: Simulation failed.");
    }
  };

  return (
    <div className="space-y-8 text-brand-navy dark:text-slate-100 font-sans">
      <div className="flex justify-between items-center pb-4 border-b border-brand-navy/5 dark:border-slate-850">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Consular Partner Gateway</h2>
          <p className="text-xs text-text-muted dark:text-slate-400 mt-1">
            Securely transmit passport files and travel invitation vouchers to airlines and embassies.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Dispatch Form (LEFT) */}
        <div className="md:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/10 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="font-extrabold text-lg flex items-center gap-2 border-b border-brand-navy/5 pb-3">
            <Building className="w-5 h-5 text-brand-gold" />
            Dispatch Consular Files
          </h3>

          <form onSubmit={handleDispatch} className="space-y-4 text-xs font-semibold">
            <div className="flex flex-col">
              <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1.5">Select Client Dossier</label>
              <select
                value={formClient}
                onChange={(e) => setFormClient(e.target.value)}
                className="bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 rounded-lg px-3 py-2.5 text-brand-navy dark:text-slate-100 focus:outline-none cursor-pointer"
              >
                {simulatedClients.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1.5">Consular Partner Node</label>
              <select
                value={formPartner}
                onChange={(e) => setFormPartner(e.target.value)}
                className="bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 rounded-lg px-3 py-2.5 text-brand-navy dark:text-slate-100 focus:outline-none cursor-pointer"
              >
                <option>German Embassy Kigali</option>
                <option>RwandAir VIP Booking</option>
                <option>Bisate Lodge Protocol Desk</option>
                <option>Qatar Airways VIP Liaison</option>
              </select>
            </div>

            <div className="space-y-3 bg-brand-gray-light dark:bg-slate-850 p-4 rounded-xl border border-brand-navy/5">
              <p className="text-[10px] text-brand-gold uppercase tracking-widest font-bold">Select Files to Transmit</p>
              
              <label className="flex items-center gap-3 cursor-pointer text-brand-navy dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={sharePassport}
                  onChange={(e) => setSharePassport(e.target.checked)}
                  className="rounded text-brand-gold focus:ring-brand-gold w-4 h-4"
                />
                Passport Bio Scan
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-brand-navy dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={shareInvite}
                  onChange={(e) => setShareInvite(e.target.checked)}
                  className="rounded text-brand-gold focus:ring-brand-gold w-4 h-4"
                />
                Official Invitation Letter
              </label>
            </div>

            <button
              type="submit"
              disabled={dispatchLoading || simulatedClients.length === 0}
              className="w-full py-3 bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              {dispatchLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Dispatch Dossier
                </>
              )}
            </button>
          </form>
        </div>

        {/* Transmission Log Table (RIGHT) */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/10 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-lg border-b border-brand-navy/5 pb-3">Active Transmissions Log</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-semibold">
              <thead>
                <tr className="bg-brand-gray-light dark:bg-slate-850 border-b border-brand-navy/10 text-brand-navy dark:text-slate-100/60 font-bold uppercase tracking-widest text-[9px]">
                  <th className="py-3 px-4">Dossier details</th>
                  <th className="py-3 px-4">Destination Node</th>
                  <th className="py-3 px-4">Transmission Status</th>
                </tr>
              </thead>
              <tbody>
                {dispatches.map((d) => (
                  <tr key={d.id} className="border-b border-brand-navy/5 dark:border-slate-850 hover:bg-brand-gray-light dark:hover:bg-slate-800 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-brand-navy dark:text-slate-100">{d.clientName}</div>
                      <div className="text-[10px] text-text-muted mt-0.5">ID: {d.clientId}</div>
                      <div className="flex gap-1 mt-1">
                        {d.documents.map((doc: string, idx: number) => (
                          <span key={idx} className="text-[9px] bg-brand-gold/15 text-brand-navy dark:text-brand-gold px-1.5 py-0.5 rounded font-bold border border-brand-gold/20">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-brand-navy dark:text-slate-200">{d.partner}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-2">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full w-fit ${
                          d.status.includes("Approved")
                            ? "bg-green-100 text-green-700"
                            : d.status.includes("Rejected")
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {d.status.includes("Approved") && <CheckCircle className="w-3 h-3" />}
                          {d.status.includes("Rejected") && <XCircle className="w-3 h-3" />}
                          {!d.status.includes("Approved") && !d.status.includes("Rejected") && <Clock className="w-3 h-3" />}
                          {d.status}
                        </span>

                        {/* Partner simulator action response buttons */}
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleSimulatePartnerResponse(d.id, "Approved by Partner")}
                            className="px-2 py-1 bg-green-500/10 hover:bg-green-500/20 text-green-600 rounded text-[9px] font-bold transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleSimulatePartnerResponse(d.id, "Rejected by Partner")}
                            className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded text-[9px] font-bold transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

                {dispatches.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-text-muted font-bold bg-brand-gray-light/25">
                      No active transmissions logged in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
