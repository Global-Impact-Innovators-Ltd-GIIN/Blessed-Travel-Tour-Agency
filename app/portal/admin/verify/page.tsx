"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  FileCheck,
  Check,
  X,
  ArrowLeft,
  RefreshCw,
  Clock,
  User,
  AlertCircle
} from "lucide-react";

function VerificationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clientId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<any>(null);
  const [verifyingDoc, setVerifyingDoc] = useState<"passport" | "invite" | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    async function loadClient() {
      if (!clientId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/clients");
        if (res.ok) {
          const data = await res.json();
          const match = data.find((c: any) => c.id === clientId);
          setClient(match || null);
        }
      } catch (err) {
        console.error("Database connection failure:", err);
      } finally {
        setLoading(false);
      }
    }
    loadClient();
  }, [clientId]);

  const handleVerifyAction = async (docType: "passport" | "invite", status: "Approved" | "Rejected") => {
    if (!client) return;
    setActionLoading(true);

    const payload: any = { id: client.id };
    if (docType === "passport") payload.passportStatus = status;
    if (docType === "invite") payload.inviteStatus = status;

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const updated = await res.json();
        setClient((prev: any) => ({
          ...prev,
          passportStatus: payload.passportStatus || prev.passportStatus,
          inviteStatus: payload.inviteStatus || prev.inviteStatus
        }));
        alert(`Success: ${docType === "passport" ? "Passport Scan" : "Invitation Letter"} marked as ${status} successfully!`);
      }
    } catch (err) {
      alert("Error: Verification transaction failed.");
    } finally {
      setActionLoading(false);
      setVerifyingDoc(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-xs font-semibold text-text-muted">
        <RefreshCw className="w-5 h-5 animate-spin text-brand-gold mr-2" />
        Retrieving database dossier...
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/10 text-center space-y-4 text-xs font-semibold max-w-md mx-auto">
        <AlertCircle className="w-12 h-12 text-brand-gold mx-auto" />
        <h3 className="font-extrabold text-lg text-brand-navy dark:text-white">Dossier Not Found</h3>
        <p className="text-text-muted dark:text-slate-400">
          No traveler profile matching references was located inside the secure database registers.
        </p>
        <Link
          href="/portal/admin"
          className="inline-flex items-center gap-1 bg-brand-navy text-white px-4 py-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Pipelines
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-brand-navy dark:text-slate-100 font-sans">
      <div className="flex items-center gap-4 pb-4 border-b border-brand-navy/5 dark:border-slate-850">
        <Link
          href="/portal/admin"
          className="p-2 bg-brand-navy/5 hover:bg-brand-navy/10 rounded-lg text-brand-navy dark:text-slate-200 transition-colors border border-brand-navy/5"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-black tracking-tight">Dossier Verification Desk</h2>
          <p className="text-xs text-text-muted dark:text-slate-400 mt-1">
            Review submitted credentials for <span className="font-bold text-brand-navy dark:text-white">{client.name}</span> ({client.id})
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Document Review Box (LEFT) */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Passport verification card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/10 dark:border-slate-800 space-y-6">
            <div className="flex justify-between items-center border-b border-brand-navy/5 pb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-brand-gold" />
                <h4 className="font-extrabold text-base">Passport Identification Scan</h4>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                client.passportStatus === "Approved"
                  ? "bg-green-500/10 text-green-600"
                  : client.passportStatus === "Rejected"
                  ? "bg-red-500/10 text-red-600"
                  : "bg-yellow-500/10 text-yellow-600"
              }`}>
                {client.passportStatus}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 text-xs font-semibold">
              <div className="space-y-4">
                <div className="p-4 bg-brand-gray-light dark:bg-slate-850 rounded-2xl border border-brand-navy/5 border-dashed flex flex-col items-center justify-center h-48">
                  <FileCheck className="w-12 h-12 text-brand-navy/20 dark:text-white/20 mb-2" />
                  <span className="font-bold">passport_scan.jpg</span>
                  <span className="text-[10px] text-text-muted mt-1">2.4 MB • Image Document</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-[10px] text-brand-gold uppercase tracking-widest font-bold">OCR Scanned Registers</p>
                <div className="space-y-2 bg-brand-gold/5 p-3 rounded-2xl border border-brand-gold/15">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Extracted Name:</span>
                    <span className="font-bold text-brand-navy dark:text-white">{client.name.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Passport Code:</span>
                    <span className="font-bold text-brand-navy dark:text-white">PC9283401</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Validity Expiry:</span>
                    <span className="font-bold text-brand-navy dark:text-white">2031-10-12</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => handleVerifyAction("passport", "Approved")}
                    disabled={actionLoading}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button
                    onClick={() => handleVerifyAction("passport", "Rejected")}
                    disabled={actionLoading}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Invitation letter verification card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/10 dark:border-slate-800 space-y-6">
            <div className="flex justify-between items-center border-b border-brand-navy/5 pb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-brand-gold" />
                <h4 className="font-extrabold text-base">Official Invitation Letter</h4>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                client.inviteStatus === "Approved"
                  ? "bg-green-500/10 text-green-600"
                  : client.inviteStatus === "Rejected"
                  ? "bg-red-500/10 text-red-600"
                  : "bg-yellow-500/10 text-yellow-600"
              }`}>
                {client.inviteStatus}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 text-xs font-semibold">
              <div className="p-4 bg-brand-gray-light dark:bg-slate-850 rounded-2xl border border-brand-navy/5 border-dashed flex flex-col items-center justify-center h-48">
                <FileCheck className="w-12 h-12 text-brand-navy/20 dark:text-white/20 mb-2" />
                <span className="font-bold">invitation_letter.pdf</span>
                <span className="text-[10px] text-text-muted mt-1">1.2 MB • PDF Document</span>
              </div>
              
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <h5 className="font-bold">Hosting Verification Details</h5>
                  <p className="text-text-muted dark:text-slate-400 mt-2 leading-relaxed text-[11px]">
                    Verify the matching host agency name, check that the signature is officially authenticated, and check that the date coordinates align.
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => handleVerifyAction("invite", "Approved")}
                    disabled={actionLoading}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button
                    onClick={() => handleVerifyAction("invite", "Rejected")}
                    disabled={actionLoading}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dossier info summary card (RIGHT) */}
        <div className="md:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/10 p-6 space-y-4 text-xs font-semibold h-fit">
          <h4 className="font-bold flex items-center gap-2 border-b border-brand-navy/5 pb-2">
            <User className="w-4 h-4 text-brand-gold" />
            Traveler Dossier Summary
          </h4>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-muted">Traveler:</span>
              <span className="text-brand-navy dark:text-slate-100 font-bold">{client.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Target Destination:</span>
              <span className="text-brand-navy dark:text-slate-100 font-bold">{client.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Liaison Officer:</span>
              <span className="text-brand-gold font-bold">{client.officer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Active Timeline:</span>
              <span className="text-brand-navy dark:text-slate-100 font-bold">Stage {client.activeStep} of 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyDashboard() {
  return (
    <Suspense fallback={<div className="text-xs font-bold text-text-muted p-10 animate-pulse">Initializing Consular Subsystem...</div>}>
      <VerificationContent />
    </Suspense>
  );
}
