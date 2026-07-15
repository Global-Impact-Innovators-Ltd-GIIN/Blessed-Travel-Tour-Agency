"use client";

import { useState } from "react";
import {
  PlaneTakeoff,
  Plus,
  Compass,
  MapPin,
  Calendar,
  Layers,
  Award,
  DollarSign,
  Tag,
  Building,
  Check
} from "lucide-react";

interface TravelPackage {
  name: string;
  location: string;
  price: string;
  lodge: string;
  slots: string;
  status: string;
}

export default function PublishPackages() {
  const [packages, setPackages] = useState<TravelPackage[]>([
    {
      name: "Volcanoes Gorilla Trekking",
      location: "Volcanoes National Park",
      price: "$2,850",
      lodge: "Bisate Lodge",
      slots: "8 slots/day",
      status: "Active"
    },
    {
      name: "Akagera Big Five Safaris",
      location: "Akagera Savannah",
      price: "$1,620",
      lodge: "Akagera Game Lodge",
      slots: "Unlimited",
      status: "Active"
    },
    {
      name: "Nyungwe Canopy Rain Walk",
      location: "Nyungwe Rainforest",
      price: "$1,150",
      lodge: "One&Only Lodge",
      slots: "12 slots/day",
      status: "Draft"
    }
  ]);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [lodge, setLodge] = useState("Bisate Lodge");
  const [slots, setSlots] = useState("");

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !price || !slots) return;

    const newPkg: TravelPackage = {
      name,
      location,
      price: price.startsWith("$") ? price : `$${price}`,
      lodge,
      slots,
      status: "Active"
    };

    setPackages(prev => [...prev, newPkg]);
    setName("");
    setLocation("");
    setPrice("");
    setSlots("");
    alert(`Success: "${name}" has been published to the Blessed travel registers!`);
  };

  return (
    <div className="space-y-8 text-brand-navy dark:text-slate-100 font-sans">
      <div className="flex justify-between items-center pb-4 border-b border-brand-navy/5 dark:border-slate-850">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Travel Package Publisher</h2>
          <p className="text-xs text-text-muted dark:text-slate-400 mt-1">
            Construct, define, and publish premium safari and consular protocols travel packages.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Package Creator Form (LEFT) */}
        <div className="md:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/10 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="font-extrabold text-lg flex items-center gap-2 border-b border-brand-navy/5 pb-3">
            <Plus className="w-5 h-5 text-brand-gold animate-pulse" />
            Build New Itinerary Package
          </h3>

          <form onSubmit={handlePublish} className="space-y-4 text-xs font-semibold">
            <div className="flex flex-col">
              <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1.5">Itinerary Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Nyungwe Rain Canopy Tour"
                className="bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 rounded-lg px-3 py-2.5 text-brand-navy dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1.5">Destination Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Nyungwe National Park"
                className="bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 rounded-lg px-3 py-2.5 text-brand-navy dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1.5">Price (USD)</label>
                <input
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 1150"
                  className="bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 rounded-lg px-3 py-2.5 text-brand-navy dark:text-slate-100 focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1.5">Quota Limit</label>
                <input
                  type="text"
                  required
                  value={slots}
                  onChange={(e) => setSlots(e.target.value)}
                  placeholder="e.g. 12 slots/day"
                  className="bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 rounded-lg px-3 py-2.5 text-brand-navy dark:text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1.5">Premium Lodge Partner</label>
              <select
                value={lodge}
                onChange={(e) => setLodge(e.target.value)}
                className="bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 rounded-lg px-3 py-2.5 text-brand-navy dark:text-slate-100 focus:outline-none cursor-pointer"
              >
                <option>Bisate Lodge</option>
                <option>Akagera Game Lodge</option>
                <option>One&Only Nyungwe House</option>
                <option>Radisson Blu Convention Centre</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <PlaneTakeoff className="w-4 h-4" />
              Publish Package Details
            </button>
          </form>
        </div>

        {/* Catalog Table (RIGHT) */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/10 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-lg border-b border-brand-navy/5 pb-3">Active Travel Catalog</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-semibold">
              <thead>
                <tr className="bg-brand-gray-light dark:bg-slate-850 border-b border-brand-navy/10 text-brand-navy dark:text-slate-100/60 font-bold uppercase tracking-widest text-[9px]">
                  <th className="py-3 px-4">Package</th>
                  <th className="py-3 px-4">Lodge Partner</th>
                  <th className="py-3 px-4 text-center">Quota Status</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg, idx) => (
                  <tr key={idx} className="border-b border-brand-navy/5 dark:border-slate-850 hover:bg-brand-gray-light dark:hover:bg-slate-800 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-brand-navy dark:text-slate-100">{pkg.name}</div>
                      <div className="text-[10px] text-text-muted mt-0.5 flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-brand-gold" /> {pkg.location}
                      </div>
                      <div className="mt-1 text-xs text-brand-navy dark:text-brand-gold font-black">{pkg.price}</div>
                    </td>
                    <td className="py-4 px-4 font-bold text-brand-navy dark:text-slate-200">
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-brand-navy dark:text-slate-100/40" />
                        {pkg.lodge}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[10px] text-text-muted dark:text-slate-400 font-bold">{pkg.slots}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase ${
                          pkg.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {pkg.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
