"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Upload,
  UserCheck,
  Phone,
  MessageSquare,
  Clock,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Eye,
  Trash2,
  FileCheck,
  Check,
  Shield
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
  // State for the Progress Tracker steps
  const [currentStepId, setCurrentStepId] = useState(1); // 1 = Submission, 2 = Review, 3 = Embassy, 4 = Finalized
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
              
              if (record.passportStatus && record.passportStatus !== "Pending") {
                setPassportFile({
                  name: "passport_scan.jpg",
                  size: "2.4 MB",
                  status: record.passportStatus
                });
                if (record.passportStatus === "Approved") {
                  setScannedData({
                    name: record.name.toUpperCase(),
                    num: "PC9283401",
                    exp: "2031-10-12"
                  });
                }
              }

              if (record.inviteStatus && record.inviteStatus !== "Pending") {
                setInviteFile({
                  name: "invitation_letter.pdf",
                  size: "1.2 MB",
                  status: record.inviteStatus
                });
              }
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

  // Document states
  const [passportFile, setPassportFile] = useState<{ name: string; size: string; status: string } | null>(null);
  const [passportUploading, setPassportUploading] = useState(false);
  const [passportScanning, setPassportScanning] = useState(false);
  const [passportProgress, setPassportProgress] = useState(0);
  const [scannedData, setScannedData] = useState<{ name: string; num: string; exp: string } | null>(null);

  const [inviteFile, setInviteFile] = useState<{ name: string; size: string; status: string } | null>(null);
  const [inviteUploading, setInviteUploading] = useState(false);
  const [inviteProgress, setInviteProgress] = useState(0);

  const [extraFile, setExtraFile] = useState<{ name: string; size: string; status: string } | null>(null);
  const [extraUploading, setExtraUploading] = useState(false);
  const [extraProgress, setExtraProgress] = useState(0);

  // Simulated passport upload & OCR trigger
  const handlePassportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setPassportUploading(true);
    setPassportProgress(0);
    setPassportFile(null);
    setScannedData(null);

    // Simulate progress upload
    const interval = setInterval(() => {
      setPassportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPassportUploading(false);
          // Trigger OCR scanning effect
          triggerOCRScan(file.name);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const triggerOCRScan = (fileName: string) => {
    setPassportScanning(true);
    setTimeout(async () => {
      setPassportScanning(false);
      setPassportFile({
        name: fileName,
        size: "1.8 MB",
        status: "Uploaded"
      });
      setScannedData({
        name: clientRecord?.name?.toUpperCase() || "JOHN DOE",
        num: "PC9283401",
        exp: "2031-10-12"
      });

      // Update document upload flag in Supabase
      if (clientRecord) {
        try {
          await fetch("/api/clients", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: clientRecord.id, passportStatus: "Uploaded" }),
          });
        } catch (err) {
          console.error("Error updating passport status:", err);
        }
      }
    }, 2500); // 2.5 seconds of futuristic scanning line animation
  };

  // Mock Invite letter upload
  const handleInviteUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setInviteUploading(true);
    setInviteProgress(0);

    const interval = setInterval(() => {
      setInviteProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setInviteUploading(false);
          setInviteFile({
            name: file.name,
            size: "720 KB",
            status: "Uploaded"
          });

          // Update document upload flag in Supabase
          if (clientRecord) {
            fetch("/api/clients", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: clientRecord.id, inviteStatus: "Uploaded" }),
            }).catch((err) => console.error("Error updating invite status:", err));
          }
          return 100;
        }
        return prev + 20;
      });
    }, 100);
  };

  // Mock Extra details upload
  const handleExtraUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setExtraUploading(true);
    setExtraProgress(0);

    const interval = setInterval(() => {
      setExtraProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setExtraUploading(false);
          setExtraFile({
            name: file.name,
            size: "1.1 MB",
            status: "Submitted"
          });
          return 100;
        }
        return prev + 25;
      });
    }, 100);
  };

  return (
    <div className="grid md:grid-cols-12 gap-8 text-brand-navy dark:text-slate-100">
      {/* LEFT PORTION: main tracker and document vault */}
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
            
            {/* Horizontal line divider behind steps */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-brand-gray-light dark:bg-slate-850 -translate-y-1/2 z-0 hidden md:block" />
            
            {steps.map((step) => {
              const isActive = step.status === "active";
              const isCompleted = step.status === "completed";
              
              return (
                <div key={step.id} className="relative z-10 flex-1 w-full">
                  <div
                    onClick={() => setActivePopover(activePopover === step.id ? null : step.id)}
                    className="flex md:flex-col items-center gap-4 md:gap-2 text-center cursor-pointer group"
                  >
                    {/* Circle Indicator */}
                    <div className="relative">
                      {isActive && (
                        <motion.div
                          layoutId="pulsing-glow"
                          className="absolute inset-[-6px] rounded-full bg-brand-gold/30 border border-brand-gold/50 z-0"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.8 }}
                        />
                      )}
                      
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 relative z-10 transition-all duration-300 ${
                          isCompleted
                            ? "bg-brand-gold border-brand-gold text-brand-navy dark:text-slate-100 shadow-sm dark:shadow-none"
                            : isActive
                            ? "bg-white dark:bg-slate-900 border-brand-gold text-brand-gold scale-105"
                            : "bg-white dark:bg-slate-900 border-brand-navy/15 dark:border-slate-800 text-brand-navy dark:text-slate-100/30"
                        }`}
                      >
                        {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : step.id}
                      </div>
                    </div>

                    {/* Step Labels */}
                    <div className="flex flex-col text-left md:text-center">
                      <span className={`text-sm font-extrabold transition-colors ${
                        isCompleted || isActive ? "text-brand-navy dark:text-slate-100" : "text-brand-navy dark:text-slate-100/40"
                      }`}>
                        {step.label}
                      </span>
                      <span className="text-[11px] text-text-muted dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                        {step.sublabel}
                      </span>
                    </div>
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

        {/* SECURE DOCUMENT VAULT */}
        <div id="vault" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-lg tracking-tight">Secure Document Vault</h3>
            <span className="text-xs font-semibold text-text-muted dark:text-slate-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-brand-gold" />
              AES-256 Cloud Encryption Active
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* CARD A: Passport Bio Page */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-navy/10 dark:border-slate-800 hover:border-brand-gold transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
              
              {/* Scanline overlay animations when scanning */}
              <AnimatePresence>
                {passportScanning && (
                  <div className="absolute inset-0 bg-brand-navy/5 z-20 pointer-events-none">
                    <motion.div
                      animate={{ y: ["0%", "100%", "0%"] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="w-full h-1 bg-brand-gold shadow-[0_0_12px_#d4af37]"
                    />
                  </div>
                )}
              </AnimatePresence>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="px-2.5 py-1 bg-brand-gold/10 text-brand-navy dark:text-slate-100 font-bold text-[10px] uppercase tracking-wider rounded">
                    High Priority
                  </div>
                  {passportFile && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-green-600">
                      <FileCheck className="w-3.5 h-3.5" /> Scanned
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-base text-brand-navy dark:text-slate-100">Passport Bio Page</h4>
                <p className="text-xs text-text-muted dark:text-slate-400 mt-1 leading-relaxed">
                  Provide a clean screenshot/photo of your identification page (must be valid for at least 6 months).
                </p>

                {/* Simulated file state displays */}
                <div className="mt-4">
                  {passportUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-brand-navy dark:text-slate-100">
                        <span>Uploading passport...</span>
                        <span>{passportProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-brand-gray-light dark:bg-slate-850 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-gold transition-all" style={{ width: `${passportProgress}%` }} />
                      </div>
                    </div>
                  )}

                  {passportScanning && (
                    <div className="flex items-center gap-2 p-2 bg-brand-gold/10 rounded-lg text-brand-navy dark:text-slate-100 text-xs font-semibold animate-pulse">
                      <RefreshCw className="w-4 h-4 text-brand-gold animate-spin" />
                      Running Futuristic OCR scan...
                    </div>
                  )}

                  {passportFile && !passportScanning && (
                    <div className="p-3 bg-brand-gray-light dark:bg-slate-850 rounded-lg border border-brand-navy/5 dark:border-slate-850 flex items-center justify-between text-xs">
                      <div className="min-w-0">
                        <p className="font-bold text-brand-navy dark:text-slate-100 truncate">{passportFile.name}</p>
                        <p className="text-[10px] text-text-muted dark:text-slate-400 mt-0.5">{passportFile.size}</p>
                      </div>
                      <button
                        onClick={() => {
                          setPassportFile(null);
                          setScannedData(null);
                        }}
                        className="p-1 hover:bg-red-50 hover:text-red-500 rounded text-brand-navy dark:text-slate-100/40 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {!passportFile && !passportUploading && !passportScanning && (
                    <label className="border-2 border-dashed border-brand-navy/10 dark:border-slate-800 hover:border-brand-gold/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-brand-gray-light dark:bg-slate-850/30">
                      <Upload className="w-6 h-6 text-brand-navy dark:text-slate-100/30 mb-2 group-hover:text-brand-gold" />
                      <span className="text-xs font-bold text-brand-navy dark:text-slate-100">Upload Passport File</span>
                      <span className="text-[10px] text-text-muted dark:text-slate-400 mt-1">JPEG, PNG up to 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePassportUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Show extracted details once scanned */}
              {scannedData && (
                <div className="mt-4 pt-4 border-t border-brand-navy/5 dark:border-slate-850 space-y-1.5 text-[10px] font-bold bg-brand-gold/5 p-2.5 rounded-lg border border-brand-gold/15">
                  <p className="text-brand-gold uppercase tracking-widest text-[9px]">OCR Extracted Info</p>
                  <div className="flex justify-between">
                    <span className="text-text-muted dark:text-slate-400">NAME:</span>
                    <span className="text-brand-navy dark:text-slate-100">{scannedData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted dark:text-slate-400">PASSPORT NO:</span>
                    <span className="text-brand-navy dark:text-slate-100">{scannedData.num}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted dark:text-slate-400">EXPIRY:</span>
                    <span className="text-brand-navy dark:text-slate-100">{scannedData.exp}</span>
                  </div>
                </div>
              )}
            </div>

            {/* CARD B: Official Invitation Letter */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-navy/10 dark:border-slate-800 hover:border-brand-gold transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="px-2.5 py-1 bg-brand-navy/5 text-brand-navy dark:text-slate-100 font-bold text-[10px] uppercase tracking-wider rounded">
                    Core Document
                  </div>
                  {inviteFile && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-brand-gold">
                      <Clock className="w-3.5 h-3.5" /> Under Review
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-base text-brand-navy dark:text-slate-100">Official Invitation Letter</h4>
                <p className="text-xs text-text-muted dark:text-slate-400 mt-1 leading-relaxed">
                  Provide the formal invitation correspondence from your Rwandan hosting entity or institution.
                </p>

                <div className="mt-4">
                  {inviteUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-brand-navy dark:text-slate-100">
                        <span>Uploading document...</span>
                        <span>{inviteProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-brand-gray-light dark:bg-slate-850 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-navy transition-all" style={{ width: `${inviteProgress}%` }} />
                      </div>
                    </div>
                  )}

                  {inviteFile && (
                    <div className="p-3 bg-brand-gray-light dark:bg-slate-850 rounded-lg border border-brand-navy/5 dark:border-slate-850 flex items-center justify-between text-xs">
                      <div className="min-w-0">
                        <p className="font-bold text-brand-navy dark:text-slate-100 truncate">{inviteFile.name}</p>
                        <p className="text-[10px] text-text-muted dark:text-slate-400 mt-0.5">{inviteFile.size}</p>
                      </div>
                      <button
                        onClick={() => setInviteFile(null)}
                        className="p-1 hover:bg-red-50 hover:text-red-500 rounded text-brand-navy dark:text-slate-100/40 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {!inviteFile && !inviteUploading && (
                    <label className="border-2 border-dashed border-brand-navy/10 dark:border-slate-800 hover:border-brand-gold/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-brand-gray-light dark:bg-slate-850/30">
                      <Upload className="w-6 h-6 text-brand-navy dark:text-slate-100/30 mb-2" />
                      <span className="text-xs font-bold text-brand-navy dark:text-slate-100">Upload Invite PDF</span>
                      <span className="text-[10px] text-text-muted dark:text-slate-400 mt-1">PDF file up to 10MB</span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleInviteUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* CARD C: Supporting Essentials */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-navy/10 dark:border-slate-800 hover:border-brand-gold transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="px-2.5 py-1 bg-brand-navy/5 text-brand-navy dark:text-slate-100 font-bold text-[10px] uppercase tracking-wider rounded">
                    Consular Checklist
                  </div>
                  {extraFile && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-green-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-base text-brand-navy dark:text-slate-100">Supporting Essentials</h4>
                <p className="text-xs text-text-muted dark:text-slate-400 mt-1 leading-relaxed">
                  Upload additional required papers (e.g. Yellow Fever Certificate, proof of lodging, or flight itineraries).
                </p>

                <div className="mt-4">
                  {extraUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-brand-navy dark:text-slate-100">
                        <span>Uploading files...</span>
                        <span>{extraProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-brand-gray-light dark:bg-slate-850 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-navy transition-all" style={{ width: `${extraProgress}%` }} />
                      </div>
                    </div>
                  )}

                  {extraFile && (
                    <div className="p-3 bg-brand-gray-light dark:bg-slate-850 rounded-lg border border-brand-navy/5 dark:border-slate-850 flex items-center justify-between text-xs">
                      <div className="min-w-0">
                        <p className="font-bold text-brand-navy dark:text-slate-100 truncate">{extraFile.name}</p>
                        <p className="text-[10px] text-text-muted dark:text-slate-400 mt-0.5">{extraFile.size}</p>
                      </div>
                      <button
                        onClick={() => setExtraFile(null)}
                        className="p-1 hover:bg-red-50 hover:text-red-500 rounded text-brand-navy dark:text-slate-100/40 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {!extraFile && !extraUploading && (
                    <label className="border-2 border-dashed border-brand-navy/10 dark:border-slate-800 hover:border-brand-gold/50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-brand-gray-light dark:bg-slate-850/30">
                      <Upload className="w-6 h-6 text-brand-navy dark:text-slate-100/30 mb-2" />
                      <span className="text-xs font-bold text-brand-navy dark:text-slate-100">Upload Certificates</span>
                      <span className="text-[10px] text-text-muted dark:text-slate-400 mt-1">PDF or image formats</span>
                      <input
                        type="file"
                        onChange={handleExtraUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Protocol details and quick actions */}
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
              <button
                onClick={() => alert("Initiating Live-Chat with Liaison Keza Agasaro...")}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-navy hover:bg-brand-blue-dark text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-brand-gold" />
                Live Chat
              </button>
            </div>
          </div>
        </div>

        {/* TRIP INFO SUMMARY CARD */}
        <div id="trips" className="bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/10 dark:border-slate-800 p-6 shadow-sm dark:shadow-none">
          <h3 className="font-extrabold text-md tracking-tight mb-4 text-brand-navy dark:text-slate-100">Active Itinerary Summary</h3>
          
          <div className="space-y-4 text-xs font-semibold">
            <div className="flex items-center justify-between p-3 bg-brand-gray-light dark:bg-slate-850 rounded-xl border border-brand-navy/5 dark:border-slate-850">
              <div className="text-left">
                <p className="text-[10px] text-text-muted dark:text-slate-400 uppercase font-bold tracking-wider">Destination</p>
                <p className="font-bold text-brand-navy dark:text-slate-100 mt-0.5">Volcanoes National Park</p>
              </div>
              <span className="px-2.5 py-1 bg-brand-gold/10 text-brand-navy dark:text-slate-100 rounded font-bold text-[10px]">
                Gorilla Trekking
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between border-b border-brand-navy/5 dark:border-slate-850 pb-2">
                <span className="text-text-muted dark:text-slate-400">Travel Date:</span>
                <span className="text-brand-navy dark:text-slate-100 font-bold">Aug 12 - Aug 17, 2026</span>
              </div>
              <div className="flex justify-between border-b border-brand-navy/5 dark:border-slate-850 pb-2">
                <span className="text-text-muted dark:text-slate-400">Flight Code:</span>
                <span className="text-brand-navy dark:text-slate-100 font-bold">WB-102 (RwandAir)</span>
              </div>
              <div className="flex justify-between border-b border-brand-navy/5 dark:border-slate-850 pb-2">
                <span className="text-text-muted dark:text-slate-400">Hotel Booking:</span>
                <span className="text-brand-navy dark:text-slate-100 font-bold">Bisate Lodge (Bespoke Villa)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted dark:text-slate-400">Consular Visa Status:</span>
                <span className="text-brand-gold font-black">STAMPED APPROVED</span>
              </div>
            </div>

            <button
              onClick={() => alert("Downloading secure e-ticket receipts...")}
              className="w-full text-center py-2.5 bg-brand-gray-light dark:bg-slate-850 hover:bg-brand-navy hover:text-white rounded-lg text-brand-navy dark:text-slate-100 font-bold text-xs uppercase tracking-wider transition-all duration-300"
            >
              Download E-Tickets & Vouchers
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
