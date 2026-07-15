"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Send,
  User,
  Phone,
  FileCheck,
  ShieldAlert,
  Paperclip,
  CheckCheck,
  Smile
} from "lucide-react";

interface ChatMessage {
  id: number;
  sender: "client" | "officer";
  text: string;
  timestamp: string;
}

export default function ClientMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "officer",
      text: "Hello! I am Keza Agasaro, your assigned Blessed Travel consular protocol officer. I will be coordinating your gorilla trekking permits and visa clearances.",
      timestamp: "Today at 09:30 AM"
    },
    {
      id: 2,
      sender: "officer",
      text: "I noticed your passport photo bio scan is already uploaded. I am verifying its details now. Please make sure to upload the invitation letter from Bisate Lodge so we can Fast-Track the dossiers.",
      timestamp: "Today at 11:15 AM"
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: messages.length + 1,
      sender: "client",
      text: inputText,
      timestamp: `Today at ${timeString}`
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simulate officer typing and auto-reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const officerReply: ChatMessage = {
        id: messages.length + 2,
        sender: "officer",
        text: "Dossier logged. I have received your message and will update the consular files accordingly. Let me know if you need anything else verified!",
        timestamp: `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      };
      setMessages((prev) => [...prev, officerReply]);
    }, 1800);
  };

  return (
    <div className="space-y-6 text-brand-navy dark:text-slate-100 flex flex-col h-[82vh]">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-brand-navy/5 dark:border-slate-850 shrink-0">
        <div>
          <h2 className="text-2xl font-black tracking-tight">VIP Liaison Messenger</h2>
          <p className="text-xs text-text-muted dark:text-slate-400 mt-1">
            256-bit encrypted direct chat line with your assigned protocol officer in Kigali.
          </p>
        </div>
      </div>

      {/* Chat Area Grid */}
      <div className="grid md:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* LEFT: Live Messenger Chat Area */}
        <div className="md:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-brand-navy/10 dark:border-slate-800 shadow-sm flex flex-col justify-between overflow-hidden min-h-0">
          
          {/* Active Officer Header */}
          <div className="p-4 bg-brand-gray-light dark:bg-slate-850/60 border-b border-brand-navy/5 dark:border-slate-850 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-gold bg-brand-navy/5">
                <Image src="/headshot.jfif" alt="Keza Agasaro" fill className="object-cover" />
              </div>
              <div className="text-left">
                <h4 className="font-extrabold text-sm leading-snug">Keza Agasaro</h4>
                <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  Active & Online
                </p>
              </div>
            </div>
            
            <a
              href="tel:+250788987654"
              className="p-2 bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-gold rounded-lg transition-colors border border-brand-navy/5"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Chat Messages Log */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {messages.map((msg) => {
              const isOfficer = msg.sender === "officer";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[80%] ${isOfficer ? "text-left mr-auto" : "flex-row-reverse text-right ml-auto"}`}
                >
                  {isOfficer && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-brand-gold bg-brand-navy/5">
                      <Image src="/headshot.jfif" alt="Officer" fill className="object-cover" />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <div
                      className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed ${
                        isOfficer
                          ? "bg-brand-gray-light dark:bg-slate-850 text-brand-navy dark:text-slate-100 rounded-tl-none border border-brand-navy/5 dark:border-slate-800"
                          : "bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy rounded-tr-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="text-[9px] text-text-muted dark:text-slate-400 flex items-center gap-1 justify-end font-bold">
                      {msg.timestamp}
                      {!isOfficer && <CheckCheck className="w-3 h-3 text-brand-gold dark:text-brand-navy" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 max-w-[80%] text-left mr-auto">
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-brand-gold bg-brand-navy/5">
                  <Image src="/headshot.jfif" alt="Officer" fill className="object-cover" />
                </div>
                <div className="bg-brand-gray-light dark:bg-slate-850 p-3 rounded-2xl rounded-tl-none border border-brand-navy/5 dark:border-slate-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-navy dark:bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-brand-navy dark:bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-brand-navy dark:bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form Message input */}
          <form onSubmit={handleSend} className="p-4 border-t border-brand-navy/5 dark:border-slate-850 flex gap-2 shrink-0">
            <button
              type="button"
              className="p-3 text-text-muted dark:text-slate-400 hover:text-brand-navy dark:hover:text-white transition-colors cursor-pointer"
            >
              <Paperclip className="w-4.5 h-4.5" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type secure message..."
              className="flex-1 bg-brand-gray-light dark:bg-slate-850 border border-brand-navy/10 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-brand-navy dark:text-white focus:outline-none focus:border-brand-gold"
            />
            <button
              type="submit"
              className="p-3 bg-brand-navy dark:bg-brand-gold hover:bg-brand-blue-dark dark:hover:bg-yellow-500 text-white dark:text-brand-navy rounded-xl transition-all flex items-center justify-center cursor-pointer shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* RIGHT: Quick stats and advisory coordinates */}
        <div className="md:col-span-4 space-y-6 shrink-0">
          <div className="bg-brand-gold/10 rounded-2xl border border-brand-gold/20 p-6 space-y-4 text-xs font-semibold">
            <h4 className="font-bold flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-brand-gold" />
              Consular Protocol Liaison
            </h4>
            <p className="text-[11px] leading-relaxed text-text-muted dark:text-slate-300 font-semibold">
              Officer Keza Agasaro is stationed at the Kigali International Airport (KGL) protocols division. Direct contact lines are validated through our secure communications server.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-brand-navy/10 dark:border-slate-800 text-xs font-semibold space-y-3">
            <h4 className="font-extrabold text-sm">Security Advisory</h4>
            <div className="flex gap-2 text-red-600">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed font-semibold">
                Do not share private security codes, passwords, or transaction PINs. Officers will only request passport scans and formal invitation letters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
