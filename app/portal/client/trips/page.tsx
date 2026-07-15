"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Calendar,
  Plane,
  Building,
  CheckCircle,
  Clock,
  Download,
  AlertCircle
} from "lucide-react";

export default function ClientTrips() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Download Started: Your premium flight e-tickets and Bisate Lodge booking vouchers are downloading securely.");
    }, 1000);
  };

  const itinerarySteps = [
    { label: "Gorilla Trekking Permits", desc: "Acquired and registered with RDB (Rwanda Development Board)", status: "Active" },
    { label: "Bisate Lodge Reservation", desc: "Deluxe Forest Villa booked and confirmed", status: "Active" },
    { label: "Kigali Airport Protocol VIP Gate", desc: "Protocol officer Keza Agasaro assigned for welcome gate protocol", status: "Active" },
    { label: "Consular Visa Clearances", desc: "Visa stamped and archived in local passport dossier", status: "Active" }
  ];

  return (
    <div className="space-y-6 text-brand-navy dark:text-slate-100">
      <div className="flex justify-between items-center pb-4 border-b border-brand-navy/5 dark:border-slate-850">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Trips & Safaris Itineraries</h2>
          <p className="text-xs text-text-muted dark:text-slate-400 mt-1">
            Real-time tracking of active bookings, flight logs, and luxury accommodation vouchers.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        {/* LEFT: Active Itinerary Details Card */}
        <div className="md:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/10 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Current Adventure</span>
                <h3 className="text-2xl font-black mt-1">Volcanoes National Park Gorilla Trek</h3>
              </div>
              <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full font-bold text-[10px] uppercase tracking-wider">
                Confirmed
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="p-3 bg-brand-gray-light dark:bg-slate-850 rounded-xl flex flex-col justify-between border border-brand-navy/5 dark:border-slate-800">
                <span className="text-[10px] text-text-muted uppercase tracking-wider">Travel Dates</span>
                <span className="font-bold mt-1">Aug 12 - Aug 17, 2026</span>
              </div>
              <div className="p-3 bg-brand-gray-light dark:bg-slate-850 rounded-xl flex flex-col justify-between border border-brand-navy/5 dark:border-slate-800">
                <span className="text-[10px] text-text-muted uppercase tracking-wider">Assigned Flight</span>
                <span className="font-bold mt-1">WB-102 (RwandAir)</span>
              </div>
              <div className="p-3 bg-brand-gray-light dark:bg-slate-850 rounded-xl flex flex-col justify-between border border-brand-navy/5 dark:border-slate-800">
                <span className="text-[10px] text-text-muted uppercase tracking-wider">Lodging</span>
                <span className="font-bold mt-1">Bisate Forest Villa</span>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-brand-navy/5 dark:border-slate-850">
              <h4 className="font-bold text-sm">Consular & Booking Checklist</h4>
              <div className="space-y-3">
                {itinerarySteps.map((step, idx) => (
                  <div key={idx} className="flex gap-3 text-xs leading-relaxed font-semibold">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">{step.label}</p>
                      <p className="text-text-muted dark:text-slate-400 text-[11px] mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="mt-8 w-full py-3 bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
          >
            {downloading ? (
              <Clock className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Travel Vouchers & Tickets
              </>
            )}
          </button>
        </div>

        {/* RIGHT: Travel updates and warnings */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-brand-gold/10 rounded-2xl border border-brand-gold/20 p-6 space-y-4">
            <div className="flex gap-2 text-xs font-bold text-brand-navy dark:text-slate-100">
              <AlertCircle className="w-5 h-5 text-brand-gold shrink-0" />
              <span>Consular Travel Advisory</span>
            </div>
            <p className="text-[11px] leading-relaxed text-text-muted dark:text-slate-300 font-semibold">
              Yellow Fever vaccination certificates are mandatory for all entries at Kigali International Airport. Please make sure your vaccination record is uploaded inside your Secure Document Vault.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/10 dark:border-slate-800 space-y-4">
            <h4 className="font-extrabold text-sm">Need Additional Bookings?</h4>
            <p className="text-[11px] leading-relaxed text-text-muted dark:text-slate-400 font-semibold">
              Coordinate custom canopy forest tours at Nyungwe or safari vehicles in Akagera directly with your liaison.
            </p>
            <Link
              href="/portal/client/messages"
              className="inline-flex items-center justify-center w-full py-2.5 bg-brand-gray-light dark:bg-slate-850 hover:bg-brand-navy hover:text-white rounded-lg text-brand-navy dark:text-slate-100 font-bold text-xs transition-colors"
            >
              Consult Protocol Officer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
