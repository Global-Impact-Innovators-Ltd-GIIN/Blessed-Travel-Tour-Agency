"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  ArrowRight,
  AlertCircle,
  Check,
  ChevronDown,
  Building,
  RefreshCw,
  Mail,
  Smartphone,
  ShieldAlert,
  Send,
  FileText,
  Lock,
  Clock,
  ArrowUpRight
} from "lucide-react";

interface ClientRecord {
  id: string;
  name: string;
  email: string;
  destination: string;
  activeStep: number; // 1 to 4
  passportStatus: "Pending" | "Uploaded" | "Approved" | "Rejected";
  inviteStatus: "Pending" | "Uploaded" | "Approved" | "Rejected";
  officer: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "partnerships">("pipeline");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [simulatedClients, setSimulatedClients] = useState<ClientRecord[]>([
    {
      id: "BTA-784-KGL",
      name: "John Doe",
      email: "john.doe@gmail.com",
      destination: "Volcanoes National Park, RW",
      activeStep: 2,
      passportStatus: "Approved",
      inviteStatus: "Uploaded",
      officer: "Keza Agasaro",
    },
    {
      id: "BTA-902-KGL",
      name: "Hon. Sarah Jenkins",
      email: "s.jenkins@diplomatic.gov",
      destination: "Paris, France",
      activeStep: 3,
      passportStatus: "Approved",
      inviteStatus: "Approved",
      officer: "Eric Murwanashyaka",
    },
    {
      id: "BTA-143-KGL",
      name: "Jean-Pierre Nsenga",
      email: "jp.nsenga@ur.ac.rw",
      destination: "Berlin, Germany",
      activeStep: 1,
      passportStatus: "Uploaded",
      inviteStatus: "Pending",
      officer: "Keza Agasaro",
    },
    {
      id: "BTA-551-KGL",
      name: "Emily Watson",
      email: "emily.watson@academic.edu",
      destination: "Akagera Safari, RW",
      activeStep: 4,
      passportStatus: "Approved",
      inviteStatus: "Approved",
      officer: "Eric Murwanashyaka",
    }
  ]);

  // Consular Partnerships Dispatches state & form handlers
  const [dispatches, setDispatches] = useState([
    {
      id: "DIS-001",
      clientName: "John Doe",
      clientId: "BTA-784-KGL",
      partner: "German Embassy Kigali",
      documents: ["Passport Bio Scan"],
      status: "Under Review",
      date: "2026-07-15 14:02"
    },
    {
      id: "DIS-002",
      clientName: "Hon. Sarah Jenkins",
      clientId: "BTA-902-KGL",
      partner: "Qatar Airways",
      documents: ["Passport Bio Scan", "Official Invitation Letter"],
      status: "Approved - Ticket Issued",
      date: "2026-07-15 11:30"
    }
  ]);

  const [formClient, setFormClient] = useState("BTA-784-KGL");
  const [formPartner, setFormPartner] = useState("German Embassy Kigali");
  const [sharePassport, setSharePassport] = useState(true);
  const [shareInvite, setShareInvite] = useState(false);
  const [dispatchLoading, setDispatchLoading] = useState(false);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedClient = simulatedClients.find(c => c.id === formClient);
    if (!matchedClient) return;

    setDispatchLoading(true);
    setTimeout(() => {
      setDispatchLoading(false);
      const docs = [];
      if (sharePassport) docs.push("Passport Bio Scan");
      if (shareInvite) docs.push("Official Invitation Letter");

      const newDispatch = {
        id: "DIS-" + Math.floor(Math.random() * 900 + 100),
        clientName: matchedClient.name,
        clientId: matchedClient.id,
        partner: formPartner,
        documents: docs,
        status: "Submitted to Partner",
        date: new Date().toISOString().replace('T', ' ').slice(0, 16)
      };

      setDispatches(prev => [newDispatch, ...prev]);
      alert(`Success: Dossier dispatched to ${formPartner} securely via 256-bit API tunnel!`);
    }, 1000);
  };

  const handleSimulatePartnerResponse = (dispatchId: string, newStatus: string) => {
    setDispatches(prev =>
      prev.map(d => d.id === dispatchId ? { ...d, status: newStatus } : d)
    );
  };

  // Filter clients based on search query
  const filteredClients = simulatedClients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStep = (clientId: string, newStep: number) => {
    setSimulatedClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, activeStep: newStep } : c))
    );
    if (selectedClient && selectedClient.id === clientId) {
      setSelectedClient((prev) => (prev ? { ...prev, activeStep: newStep } : null));
    }
  };

  const handleVerifyDocument = (
    clientId: string,
    docType: "passport" | "invite",
    status: "Approved" | "Rejected"
  ) => {
    setSimulatedClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          if (docType === "passport") {
            return { ...c, passportStatus: status };
          } else {
            return { ...c, inviteStatus: status };
          }
        }
        return c;
      })
    );

    // Update current detail screen if active
    if (selectedClient && selectedClient.id === clientId) {
      setSelectedClient((prev) => {
        if (!prev) return null;
        if (docType === "passport") {
          return { ...prev, passportStatus: status };
        } else {
          return { ...prev, inviteStatus: status };
        }
      });
    }

    alert(`Notification: Automatically dispatched alert to client regarding ${docType} ${status.toLowerCase()} status!`);
  };

  const getStepBadge = (step: number) => {
    switch (step) {
      case 1:
        return <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-bold text-xs">1. Submission</span>;
      case 2:
        return <span className="px-2.5 py-1 bg-brand-gold/15 text-brand-navy dark:text-slate-100 rounded-full font-bold text-xs">2. Review</span>;
      case 3:
        return <span className="px-2.5 py-1 bg-yellow-50 text-yellow-700 rounded-full font-bold text-xs">3. Embassy</span>;
      case 4:
        return <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full font-bold text-xs">4. Ready</span>;
      default:
        return null;
    }
  };

  const getDocBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle className="w-3.5 h-3.5" /> Approved</span>;
      case "Uploaded":
        return <span className="flex items-center gap-1 text-brand-gold font-bold"><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Verifying</span>;
      case "Rejected":
        return <span className="flex items-center gap-1 text-red-500 font-bold"><XCircle className="w-3.5 h-3.5" /> Rejected</span>;
      default:
        return <span className="text-brand-navy dark:text-slate-100/30">Pending</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Tab Selector */}
      <div className="flex gap-4 border-b border-brand-navy/10 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("pipeline")}
          className={`pb-2 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === "pipeline"
              ? "border-brand-gold text-brand-navy dark:text-slate-100"
              : "border-transparent text-text-muted hover:text-brand-navy dark:hover:text-slate-200"
          }`}
        >
          Client Pipelines
        </button>
        <button
          onClick={() => setActiveTab("partnerships")}
          className={`pb-2 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === "partnerships"
              ? "border-brand-gold text-brand-navy dark:text-slate-100"
              : "border-transparent text-text-muted hover:text-brand-navy dark:hover:text-slate-200"
          }`}
        >
          Consular Partner Gateway
        </button>
      </div>

      {activeTab === "pipeline" && (
        <>
          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-brand-navy/5 dark:border-slate-850 shadow-sm dark:shadow-none">
              <p className="text-2xl font-black text-brand-navy dark:text-slate-100">{simulatedClients.length}</p>
              <p className="text-xs text-text-muted dark:text-slate-400 font-bold uppercase tracking-wider mt-1">Active Pipeline</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-brand-navy/5 dark:border-slate-850 shadow-sm dark:shadow-none">
              <p className="text-2xl font-black text-brand-gold">
                {simulatedClients.filter((c) => c.passportStatus === "Uploaded" || c.inviteStatus === "Uploaded").length}
              </p>
              <p className="text-xs text-text-muted dark:text-slate-400 font-bold uppercase tracking-wider mt-1">Files Awaiting Review</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-brand-navy/5 dark:border-slate-850 shadow-sm dark:shadow-none">
              <p className="text-2xl font-black text-brand-navy dark:text-slate-100">
                {simulatedClients.filter((c) => c.activeStep === 3).length}
              </p>
              <p className="text-xs text-text-muted dark:text-slate-400 font-bold uppercase tracking-wider mt-1">Embassy Processing</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-brand-navy/5 dark:border-slate-850 shadow-sm dark:shadow-none">
              <p className="text-2xl font-black text-green-600">
                {simulatedClients.filter((c) => c.activeStep === 4).length}
              </p>
              <p className="text-xs text-text-muted dark:text-slate-400 font-bold uppercase tracking-wider mt-1">Visas Finalized</p>
            </div>
          </div>

      {/* Main pipeline display */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/10 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-none">
        
        {/* Table Toolbar */}
        <div className="p-6 border-b border-brand-navy/5 dark:border-slate-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy dark:text-slate-100/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 hover:border-brand-navy/20 dark:border-slate-800 focus:border-brand-gold rounded-lg pl-10 pr-4 py-2 text-sm text-brand-navy dark:text-slate-100 focus:outline-none transition-colors"
              placeholder="Search by client name or ID..."
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-text-muted dark:text-slate-400">
            <Users className="w-4 h-4 text-brand-gold animate-pulse" />
            Displaying {filteredClients.length} of {simulatedClients.length} active records
          </div>
        </div>

        {/* Pipeline Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-semibold">
            <thead>
              <tr className="bg-brand-gray-light dark:bg-slate-850/60 border-b border-brand-navy/15 dark:border-slate-800 text-brand-navy dark:text-slate-100/60 font-bold uppercase tracking-widest text-[9px]">
                <th className="py-4 px-6">Client Details</th>
                <th className="py-4 px-6">Destination</th>
                <th className="py-4 px-6">Active Stage</th>
                <th className="py-4 px-6">Passport Bio</th>
                <th className="py-4 px-6">Invite Letter</th>
                <th className="py-4 px-6">Liaison Officer</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-brand-navy/5 dark:border-slate-850 hover:bg-brand-gray-light dark:hover:bg-slate-800 dark:bg-slate-850/35 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-extrabold text-sm text-brand-navy dark:text-slate-100">{client.name}</div>
                    <div className="text-[10px] text-text-muted dark:text-slate-400 mt-0.5">{client.id}</div>
                  </td>
                  <td className="py-4 px-6 text-brand-navy dark:text-slate-100">{client.destination}</td>
                  <td className="py-4 px-6">{getStepBadge(client.activeStep)}</td>
                  <td className="py-4 px-6">{getDocBadge(client.passportStatus)}</td>
                  <td className="py-4 px-6">{getDocBadge(client.inviteStatus)}</td>
                  <td className="py-4 px-6 text-brand-navy dark:text-slate-100/80">{client.officer}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => {
                        setSelectedClient(client);
                        setShowDrawer(true);
                      }}
                      className="inline-flex items-center gap-1.5 bg-brand-navy hover:bg-brand-blue-dark text-white px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-brand-gold" />
                      Verify Case
                    </button>
                  </td>
                </tr>
              ))}

              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-text-muted dark:text-slate-400 font-bold text-sm bg-brand-gray-light dark:bg-slate-850/10">
                    No active clients found matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}

      {activeTab === "partnerships" && (
        <div className="grid md:grid-cols-12 gap-6 items-start">
          {/* Left Side: Dispatch Form */}
          <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/10 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-extrabold text-base text-brand-navy dark:text-white flex items-center gap-2 mb-2">
              <Send className="w-5 h-5 text-brand-gold" />
              Secure Dispatch Terminal
            </h3>
            <p className="text-xs text-text-muted dark:text-slate-400 mb-6 leading-relaxed">
              Transmit digital credentials directly to embassy review panels and logistics partners on behalf of client dossiers.
            </p>

            <form onSubmit={handleDispatch} className="space-y-4 text-xs font-semibold">
              {/* Select Client */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold tracking-widest text-brand-navy dark:text-slate-100/60 mb-1.5">
                  Select Active Client
                </label>
                <select
                  value={formClient}
                  onChange={(e) => setFormClient(e.target.value)}
                  className="bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 rounded-lg px-3 py-2.5 text-brand-navy dark:text-slate-100 focus:outline-none"
                >
                  {simulatedClients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                  ))}
                </select>
              </div>

              {/* Select Partner Gateway */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold tracking-widest text-brand-navy dark:text-slate-100/60 mb-1.5">
                  Target Partner Terminal
                </label>
                <select
                  value={formPartner}
                  onChange={(e) => setFormPartner(e.target.value)}
                  className="bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 rounded-lg px-3 py-2.5 text-brand-navy dark:text-slate-100 focus:outline-none"
                >
                  <option value="German Embassy Kigali">German Embassy Kigali (Consular Office)</option>
                  <option value="RwandAir">RwandAir Commercial Sales Hub</option>
                  <option value="Qatar Airways">Qatar Airways VIP Ticketing Node</option>
                  <option value="Radisson Blu Kigali">Radisson Blu Kigali Desk</option>
                  <option value="Rwanda Development Board">Rwanda Development Board (RDB)</option>
                </select>
              </div>

              {/* Checkbox documents */}
              <div className="flex flex-col space-y-2 p-3 bg-brand-gray-light dark:bg-slate-850 rounded-xl border border-brand-navy/5 dark:border-slate-850">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-navy dark:text-slate-100/60 mb-1.5 block">
                  Verify Credentials to Encrypt
                </span>
                
                <label className="flex items-center gap-2.5 text-brand-navy dark:text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sharePassport}
                    onChange={(e) => setSharePassport(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-gold border-brand-navy/10 dark:border-slate-750 focus:ring-0 focus:outline-none"
                  />
                  <span>Encrypt Passport Bio Page</span>
                </label>

                <label className="flex items-center gap-2.5 text-brand-navy dark:text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareInvite}
                    onChange={(e) => setShareInvite(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-gold border-brand-navy/10 dark:border-slate-750 focus:ring-0 focus:outline-none"
                  />
                  <span>Encrypt RDB Invitation Letter</span>
                </label>
              </div>

              {/* Dispatch Action */}
              <button
                type="submit"
                disabled={dispatchLoading}
                className="w-full bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                {dispatchLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Secure Dispatch Dossier
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Side: Active Dispatches Log */}
          <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/10 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-brand-navy/5 dark:border-slate-850 pb-4">
              <div>
                <h3 className="font-extrabold text-base text-brand-navy dark:text-white">Active Terminal Transmissions</h3>
                <p className="text-[10px] text-text-muted dark:text-slate-400 mt-0.5">Real-time status logs of shared client files</p>
              </div>
              <span className="px-2.5 py-1 bg-green-500/10 text-green-500 rounded-full font-bold text-[9px] uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                Live APIs Connection
              </span>
            </div>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {dispatches.map((d) => (
                <div
                  key={d.id}
                  className="p-4 bg-brand-gray-light dark:bg-slate-850/60 border border-brand-navy/5 dark:border-slate-850 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-brand-navy dark:text-white">{d.clientName}</span>
                      <span className="text-[9px] text-text-muted dark:text-slate-400 uppercase bg-brand-navy/5 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold">{d.clientId}</span>
                    </div>
                    <div className="text-xs font-semibold text-text-dark dark:text-slate-200 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      Shared with: <span className="font-bold text-brand-navy dark:text-slate-100">{d.partner}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {d.documents.map((doc, idx) => (
                        <span key={idx} className="text-[9px] bg-brand-gold/10 text-brand-navy dark:text-brand-gold px-2 py-0.5 rounded font-semibold flex items-center gap-1 border border-brand-gold/20">
                          <FileText className="w-2.5 h-2.5" />
                          {doc}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] text-text-muted dark:text-slate-500 font-medium">Transmitted: {d.date}</div>
                  </div>

                  <div className="flex flex-col items-end gap-2.5">
                    <div className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      d.status.includes("Approved")
                        ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-500 border border-green-500/20"
                        : d.status.includes("Failed")
                        ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-500/20"
                        : "bg-brand-gold/10 text-brand-navy dark:text-brand-gold border border-brand-gold/20"
                    }`}>
                      {d.status}
                    </div>

                    {/* Simulation Triggers for partner responses */}
                    {!d.status.includes("Approved") && !d.status.includes("Failed") && (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleSimulatePartnerResponse(d.id, "Approved - Visa Issued")}
                          className="bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                        >
                          Simulate Approve
                        </button>
                        <button
                          onClick={() => handleSimulatePartnerResponse(d.id, "Failed - Review Required")}
                          className="border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 text-[10px] font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                        >
                          Simulate Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {dispatches.length === 0 && (
                <div className="text-center py-12 text-text-muted dark:text-slate-400 font-bold text-sm bg-brand-gray-light dark:bg-slate-850/10 rounded-xl">
                  No dossiers dispatched. Use the terminal on the left to transmit files.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Verification Drawer Overlay */}
      <AnimatePresence>
        {showDrawer && selectedClient && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
              className="fixed inset-0 bg-brand-navy/50 z-40 backdrop-blur-sm"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 z-50 shadow-2xl p-6 border-l border-brand-navy/15 dark:border-slate-800 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest bg-brand-navy px-2.5 py-1 rounded">
                      Client Review
                    </span>
                    <h3 className="text-xl font-extrabold text-brand-navy dark:text-slate-100 mt-2">{selectedClient.name}</h3>
                    <p className="text-xs text-text-muted dark:text-slate-400">{selectedClient.id}</p>
                  </div>
                  <button
                    onClick={() => setShowDrawer(false)}
                    className="p-1.5 hover:bg-brand-gray-light dark:hover:bg-slate-800 dark:bg-slate-850 rounded-lg border border-brand-navy/10 dark:border-slate-800 text-brand-navy dark:text-slate-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                {/* Main options */}
                <div className="space-y-6 text-xs font-semibold">
                  
                  {/* Step Progression Option */}
                  <div className="p-4 bg-brand-gray-light dark:bg-slate-850 rounded-xl border border-brand-navy/5 dark:border-slate-850">
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-navy dark:text-slate-100/60 mb-2">
                      Consular Progress Step
                    </label>
                    <div className="flex items-center gap-3">
                      <select
                        value={selectedClient.activeStep}
                        onChange={(e) => handleUpdateStep(selectedClient.id, Number(e.target.value))}
                        className="flex-1 bg-white dark:bg-slate-900 border border-brand-navy/10 dark:border-slate-800 rounded px-2.5 py-2 font-bold text-brand-navy dark:text-slate-100 focus:outline-none"
                      >
                        <option value="1">Step 1: Document Submission</option>
                        <option value="2">Step 2: Agent Review</option>
                        <option value="3">Step 3: Embassy Processing</option>
                        <option value="4">Step 4: Issued & Ready</option>
                      </select>
                      <div className="w-8 h-8 rounded bg-brand-gold/15 flex items-center justify-center text-brand-navy dark:text-slate-100">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Passport document review actions */}
                  <div className="border border-brand-navy/10 dark:border-slate-800 p-4 rounded-xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm text-brand-navy dark:text-slate-100">Passport Bio Page</span>
                      {getDocBadge(selectedClient.passportStatus)}
                    </div>
                    {selectedClient.passportStatus === "Uploaded" && (
                      <div className="p-2.5 bg-brand-gold/5 rounded border border-brand-gold/20 leading-relaxed text-[11px] text-text-dark dark:text-slate-200 font-medium">
                        📂 File uploaded: <span className="font-bold text-brand-navy dark:text-slate-100">passport_scan.jpg</span>. OCR reports expiry match.
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVerifyDocument(selectedClient.id, "passport", "Approved")}
                        className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleVerifyDocument(selectedClient.id, "passport", "Rejected")}
                        className="flex-1 py-2 border border-red-500 hover:bg-red-50 text-red-500 rounded font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>

                  {/* Invite letter document review actions */}
                  <div className="border border-brand-navy/10 dark:border-slate-800 p-4 rounded-xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm text-brand-navy dark:text-slate-100">Official Invitation Letter</span>
                      {getDocBadge(selectedClient.inviteStatus)}
                    </div>
                    {selectedClient.inviteStatus === "Uploaded" && (
                      <div className="p-2.5 bg-brand-gold/5 rounded border border-brand-gold/20 leading-relaxed text-[11px] text-text-dark dark:text-slate-200 font-medium">
                        📂 File uploaded: <span className="font-bold text-brand-navy dark:text-slate-100">rdb_invitation.pdf</span>. Requires official validation.
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVerifyDocument(selectedClient.id, "invite", "Approved")}
                        className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleVerifyDocument(selectedClient.id, "invite", "Rejected")}
                        className="flex-1 py-2 border border-red-500 hover:bg-red-50 text-red-500 rounded font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Footer details in Drawer */}
              <div className="pt-6 border-t border-brand-navy/5 dark:border-slate-850 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-text-muted dark:text-slate-400">
                  <span>Client Contact Info</span>
                  <div className="flex gap-2">
                    <a href={`mailto:${selectedClient.email}`} className="p-1.5 hover:bg-brand-gray-light dark:hover:bg-slate-800 dark:bg-slate-850 rounded text-brand-navy dark:text-slate-100 transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                    <a href="tel:+250788123456" className="p-1.5 hover:bg-brand-gray-light dark:hover:bg-slate-800 dark:bg-slate-850 rounded text-brand-navy dark:text-slate-100 transition-colors">
                      <Smartphone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="p-3 bg-brand-navy text-white rounded-lg flex items-center gap-3 text-xs">
                  <ShieldAlert className="w-5 h-5 text-brand-gold shrink-0" />
                  <p className="leading-relaxed">All document changes trigger instant automated SMS progress alerts to clients.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
