"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Compass,
  GraduationCap,
  Shield,
  LayoutDashboard,
  FolderLock,
  Database,
  Users,
  Settings2,
  Bell,
  LogOut,
  UserCheck,
  PlaneTakeoff,
  Menu,
  X,
  CreditCard,
  Sun,
  Moon,
  Building
} from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Detect active role by parsing the path
  let activeRole = "client";
  if (pathname.includes("/portal/admin")) activeRole = "admin";
  if (pathname.includes("/portal/superadmin")) activeRole = "superadmin";

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState("light");
  const [userName, setUserName] = useState("User");

  // Sync theme with HTML document class on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Strict session and RBAC access validation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const userRole = localStorage.getItem("userRole"); // client, admin, superadmin

      if (!isLoggedIn) {
        // Force redirect to login page
        router.push("/login?error=auth_required&redirect=" + encodeURIComponent(pathname));
        return;
      }

      // Role-Based Access Control (RBAC) gates
      if (pathname.includes("/portal/admin") && userRole !== "admin") {
        router.push("/portal/" + userRole);
      } else if (pathname.includes("/portal/superadmin") && userRole !== "superadmin") {
        router.push("/portal/" + userRole);
      } else if (pathname.includes("/portal/client") && userRole !== "client") {
        router.push("/portal/" + userRole);
      }
    }
  }, [pathname, router]);

  // Sync username on mount / role shift
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        setUserName(storedName);
      } else {
        setUserName(activeRole === "client" ? "John Doe" : activeRole === "admin" ? "Agent Keza" : "Super Administrator");
      }
    }
  }, [activeRole]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    router.push("/login");
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  };

  const handleRoleSwitch = (newRole: string) => {
    if (newRole === "client") router.push("/portal/client");
    if (newRole === "admin") router.push("/portal/admin");
    if (newRole === "superadmin") router.push("/portal/superadmin");
  };

  const menuItems = {
    client: [
      { name: "My Dashboard", path: "/portal/client", icon: LayoutDashboard },
      { name: "Document Vault", path: "/portal/client#vault", icon: FolderLock },
      { name: "Trips & Safaris", path: "/portal/client#trips", icon: Compass }
    ],
    admin: [
      { name: "Client Pipelines", path: "/portal/admin", icon: Users },
      { name: "Consular Partner Gateway", path: "/portal/admin#partnerships", icon: Building }
    ],
    superadmin: [
      { name: "Command Center", path: "/portal/superadmin", icon: Database },
      { name: "Integrations & APIs", path: "/portal/superadmin#integrations", icon: CreditCard },
      { name: "System Settings", path: "/portal/superadmin#settings", icon: Settings2 }
    ]
  };

  const notifications = [
    { id: 1, text: "Passport scanned successfully via OCR.", time: "5 mins ago", unread: true },
    { id: 2, text: "Official Invitation Letter is under review by Agent Keza.", time: "1 hour ago", unread: true },
    { id: 3, text: "Yellow Fever Certificate approved.", time: "Yesterday", unread: false }
  ];

  const sidebarContent = () => (
    <div className="h-full flex flex-col justify-between py-6 px-4 bg-brand-navy dark:bg-slate-900 text-white select-none transition-colors duration-300">
      <div>
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 px-2 mb-8 group">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-brand-navy border border-brand-gold/30 flex items-center justify-center shrink-0">
            <Image src="/logo.png" alt="Blessed Logo" fill className="object-contain" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-md tracking-tight leading-none text-white">
              BLESSED
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold">
              Consular Portals
            </span>
          </div>
        </Link>

        {/* Dynamic Navigation Links based on active role */}
        <div className="space-y-6">
          <div>
            <div className="px-2 text-[10px] uppercase font-bold tracking-widest text-brand-gold/60 mb-3">
              {activeRole} Workspace
            </div>
            <nav className="space-y-1">
              {menuItems[activeRole as keyof typeof menuItems].map((item) => {
                const IconComponent = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-brand-gold text-brand-navy shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Spacer to push content */}
          <div className="flex-1" />
        </div>
      </div>

      {/* User profile & logout */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy font-bold shadow-inner shrink-0">
            {getInitials(userName)}
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm leading-tight text-white truncate max-w-[130px]">
              {userName}
            </span>
            <span className="text-[10px] text-white/50 capitalize font-medium">{activeRole} profile</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-colors w-full text-left cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-brand-gold" />
          Logout Portal
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-gray-light dark:bg-slate-950 text-brand-navy dark:text-slate-100 flex relative font-sans selection:bg-brand-gold selection:text-brand-navy transition-colors duration-300">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-brand-navy dark:bg-slate-900 shrink-0 border-r border-brand-navy/10 dark:border-slate-800 relative z-30">
        {sidebarContent()}
      </aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden fixed inset-0 bg-brand-navy/40 backdrop-blur-sm z-40"
            />
            {/* Drawer */}
            <div className="md:hidden fixed top-0 bottom-0 left-0 w-64 bg-brand-navy z-50 shadow-2xl">
              {sidebarContent()}
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute top-6 right-[-48px] bg-brand-navy p-2.5 rounded-r-lg text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-brand-navy/5 dark:border-slate-800 px-6 flex justify-between items-center relative z-20 shrink-0 text-brand-navy dark:text-slate-100 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-brand-gray-light dark:hover:bg-slate-800 rounded-lg transition-colors text-brand-navy dark:text-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-extrabold text-lg text-brand-navy dark:text-white capitalize tracking-tight">
              {activeRole} Consular Workspace
            </h2>
          </div>

          <div className="flex items-center gap-4 relative">
            {/* Light/Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 hover:bg-brand-gray-light dark:hover:bg-slate-800 rounded-lg text-brand-navy dark:text-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-brand-gold" />}
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 hover:bg-brand-gray-light dark:hover:bg-slate-800 rounded-lg text-brand-navy dark:text-slate-200 relative transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-gold ring-2 ring-white dark:ring-slate-900" />
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <>
                  <div
                    onClick={() => setShowNotifications(false)}
                    className="fixed inset-0 z-40"
                  />
                  <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-900 border border-brand-navy/15 dark:border-slate-850 rounded-xl shadow-xl z-50 py-3 overflow-hidden text-brand-navy dark:text-slate-100">
                    <div className="px-4 pb-2 border-b border-brand-navy/5 dark:border-slate-800 flex justify-between items-center">
                      <span className="font-bold text-sm text-brand-navy dark:text-white">Consular Alerts</span>
                      <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                        Real-time
                      </span>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 border-b border-brand-navy/5 dark:border-slate-800 text-xs flex flex-col gap-1 transition-colors hover:bg-brand-gray-light dark:hover:bg-slate-850 ${
                            n.unread ? "bg-brand-gold/5 dark:bg-brand-gold/10" : ""
                          }`}
                        >
                          <p className="text-text-dark dark:text-slate-200 font-medium leading-relaxed">{n.text}</p>
                          <span className="text-[10px] text-text-muted dark:text-slate-400 font-semibold">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </AnimatePresence>

            <div className="w-px h-6 bg-brand-navy/10 hidden sm:block" />

            {/* Profile trigger indicator */}
            <div className="items-center gap-2 hidden sm:flex select-none">
              <span className="text-xs font-bold text-brand-navy/70">
                {activeRole === "client" ? "Consular Client" : activeRole === "admin" ? "Consular Agent" : "System Superadmin"}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse border border-white" />
            </div>
          </div>
        </header>

        {/* Dashboard Canvas Wrapper */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-brand-gray-light/60 dark:bg-slate-950/45 transition-colors duration-300">
          <div className="max-w-6xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
