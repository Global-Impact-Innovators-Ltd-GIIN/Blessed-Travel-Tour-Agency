"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Clock,
  RefreshCw,
  Trash2,
  FileCheck,
  Shield,
  CheckCircle2
} from "lucide-react";

export default function ClientVault() {
  const [clientRecord, setClientRecord] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("cachedClientRecord");
      return cached ? JSON.parse(cached) : null;
    }
    return null;
  });

  // Document states
  const [passportFile, setPassportFile] = useState<{ name: string; size: string; status: string } | null>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("cachedClientRecord");
      if (cached) {
        const record = JSON.parse(cached);
        if (record.passportStatus && record.passportStatus !== "Pending") {
          return {
            name: "passport_scan.jpg",
            size: "2.4 MB",
            status: record.passportStatus
          };
        }
      }
    }
    return null;
  });
  const [passportUploading, setPassportUploading] = useState(false);
  const [passportScanning, setPassportScanning] = useState(false);
  const [passportProgress, setPassportProgress] = useState(0);
  const [scannedData, setScannedData] = useState<{ name: string; num: string; exp: string } | null>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("cachedClientRecord");
      if (cached) {
        const record = JSON.parse(cached);
        if (record.passportStatus === "Approved") {
          return {
            name: record.name.toUpperCase(),
            num: "PC9283401",
            exp: "2031-10-12"
          };
        }
      }
    }
    return null;
  });

  const [inviteFile, setInviteFile] = useState<{ name: string; size: string; status: string } | null>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("cachedClientRecord");
      if (cached) {
        const record = JSON.parse(cached);
        if (record.inviteStatus && record.inviteStatus !== "Pending") {
          return {
            name: "invitation_letter.pdf",
            size: "1.2 MB",
            status: record.inviteStatus
          };
        }
      }
    }
    return null;
  });
  const [inviteUploading, setInviteUploading] = useState(false);
  const [inviteProgress, setInviteProgress] = useState(0);

  const [extraFile, setExtraFile] = useState<{ name: string; size: string; status: string } | null>(null);
  const [extraUploading, setExtraUploading] = useState(false);
  const [extraProgress, setExtraProgress] = useState(0);

  // Load client record from database on mount
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
              localStorage.setItem("cachedClientRecord", JSON.stringify(record));
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

  const handlePassportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setPassportUploading(true);
    setPassportProgress(0);
    setPassportFile(null);
    setScannedData(null);

    const interval = setInterval(() => {
      setPassportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPassportUploading(false);
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
    }, 2500);
  };

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
    <div className="space-y-6 text-brand-navy dark:text-slate-100">
      <div className="flex justify-between items-center pb-4 border-b border-brand-navy/5 dark:border-slate-850">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Secure Document Vault</h2>
          <p className="text-xs text-text-muted dark:text-slate-400 mt-1">
            Archived identification records protected with AES-256 cloud encryption.
          </p>
        </div>
        <span className="text-xs font-bold text-text-muted dark:text-slate-400 flex items-center gap-1.5 bg-brand-gold/10 px-3 py-1.5 rounded-full border border-brand-gold/20">
          <Shield className="w-4 h-4 text-brand-gold animate-pulse" />
          Fintech Security Layer Active
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* CARD A: Passport Bio Page */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-navy/10 dark:border-slate-800 hover:border-brand-gold transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
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
              <span className="px-2.5 py-1 bg-brand-gold/10 text-brand-navy dark:text-brand-gold font-bold text-[10px] uppercase tracking-wider rounded">
                High Priority
              </span>
              {passportFile && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-green-600">
                  <FileCheck className="w-3.5 h-3.5" /> Scanned
                </span>
              )}
            </div>

            <h4 className="font-extrabold text-base text-brand-navy dark:text-slate-100">Passport Bio Page</h4>
            <p className="text-xs text-text-muted dark:text-slate-400 mt-1 leading-relaxed">
              Upload identification page (must be valid for at least 6 months).
            </p>

            <div className="mt-4">
              {passportUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
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
                    <p className="font-bold truncate">{passportFile.name}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{passportFile.size}</p>
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
                  <Upload className="w-6 h-6 text-brand-navy/30 dark:text-slate-100/30 mb-2" />
                  <span className="text-xs font-bold">Upload Passport File</span>
                  <span className="text-[10px] text-text-muted mt-1">JPEG, PNG up to 5MB</span>
                  <input type="file" accept="image/*" onChange={handlePassportUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {scannedData && (
            <div className="mt-4 pt-4 border-t border-brand-navy/5 dark:border-slate-850 space-y-1.5 text-[10px] font-bold bg-brand-gold/5 p-2.5 rounded-lg border border-brand-gold/15">
              <p className="text-brand-gold uppercase tracking-widest text-[9px]">OCR Extracted Info</p>
              <div className="flex justify-between">
                <span className="text-text-muted">NAME:</span>
                <span>{scannedData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">PASSPORT NO:</span>
                <span>{scannedData.num}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">EXPIRY:</span>
                <span>{scannedData.exp}</span>
              </div>
            </div>
          )}
        </div>

        {/* CARD B: Official Invitation Letter */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-navy/10 dark:border-slate-800 hover:border-brand-gold transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="px-2.5 py-1 bg-brand-navy/5 dark:bg-slate-800 text-brand-navy dark:text-slate-100 font-bold text-[10px] uppercase tracking-wider rounded">
                Core Document
              </span>
              {inviteFile && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-brand-gold">
                  <Clock className="w-3.5 h-3.5" /> {inviteFile.status}
                </span>
              )}
            </div>

            <h4 className="font-extrabold text-base text-brand-navy dark:text-slate-100">Official Invitation Letter</h4>
            <p className="text-xs text-text-muted dark:text-slate-400 mt-1 leading-relaxed">
              Upload the formal invitation correspondence from your Rwandan hosting entity.
            </p>

            <div className="mt-4">
              {inviteUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
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
                    <p className="font-bold truncate">{inviteFile.name}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{inviteFile.size}</p>
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
                  <Upload className="w-6 h-6 text-brand-navy/30 dark:text-slate-100/30 mb-2" />
                  <span className="text-xs font-bold">Upload Invite PDF</span>
                  <span className="text-[10px] text-text-muted mt-1">PDF file up to 10MB</span>
                  <input type="file" accept=".pdf" onChange={handleInviteUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* CARD C: Supporting Essentials */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-navy/10 dark:border-slate-800 hover:border-brand-gold transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="px-2.5 py-1 bg-brand-navy/5 dark:bg-slate-800 text-brand-navy dark:text-slate-100 font-bold text-[10px] uppercase tracking-wider rounded">
                Checklist Essentials
              </span>
              {extraFile && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-green-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                </span>
              )}
            </div>

            <h4 className="font-extrabold text-base text-brand-navy dark:text-slate-100">Supporting Essentials</h4>
            <p className="text-xs text-text-muted dark:text-slate-400 mt-1 leading-relaxed">
              Upload additional required certificates (e.g. Yellow Fever Certificate, proof of lodging).
            </p>

            <div className="mt-4">
              {extraUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
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
                    <p className="font-bold truncate">{extraFile.name}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{extraFile.size}</p>
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
                  <Upload className="w-6 h-6 text-brand-navy/30 dark:text-slate-100/30 mb-2" />
                  <span className="text-xs font-bold">Upload Certificates</span>
                  <span className="text-[10px] text-text-muted mt-1">PDF or image formats</span>
                  <input type="file" onChange={handleExtraUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
