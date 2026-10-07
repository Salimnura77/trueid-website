import { useState } from "react";
import { Search, MessageCircle, Phone, Mail, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { supportCategories } from "../data/demo";

const tickets = [
  { id: "TKT-2024-001", subject: "BVN verification taking too long", status: "resolved", date: "Aug 28, 2024" },
  { id: "TKT-2024-002", subject: "Unable to share credentials with bank", status: "open", date: "Sep 8, 2024" },
];

interface Props { navigate: (page: string) => void }

export default function HelpSupport({ navigate }: Props) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto page-transition">
      <div className="mb-5">
        <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">Help & Support</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Find answers or contact our support team</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" color="#94A3B8" />
        <input
          type="text"
          placeholder="Search for help articles..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] bg-white shadow-sm"
        />
      </div>

      {/* Contact options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {[
          { label: "Live Chat", desc: "Available 24/7", icon: MessageCircle, color: "#1D6AFF", bg: "#E8EFFF", action: "Start Chat" },
          { label: "Call Us", desc: "+234 700 TRUEID", icon: Phone, color: "#059669", bg: "#ECFDF5", action: "Call Now" },
          { label: "Email", desc: "hello@trueid.ng", icon: Mail, color: "#7C3AED", bg: "#F5F3FF", action: "Send Email" },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4 flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.bg }}>
                <Icon size={18} color={c.color} />
              </div>
              <div className="font-semibold text-[#0F172A] text-sm">{c.label}</div>
              <div className="text-xs text-[#64748B]">{c.desc}</div>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-lg mt-1" style={{ background: c.bg, color: c.color }}>
                {c.action}
              </button>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* FAQ Categories */}
        <div>
          <h3 className="font-display font-semibold text-[#0F172A] mb-3">Frequently Asked</h3>
          <div className="space-y-3">
            {supportCategories.map((cat) => (
              <div key={cat.title} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === cat.title ? null : cat.title)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: "#F1F5F9" }}>
                    {cat.icon === "shield" ? "🛡️" : cat.icon === "wallet" ? "💳" : cat.icon === "lock" ? "🔒" : "⚙️"}
                  </div>
                  <span className="flex-1 font-semibold text-[#0F172A] text-sm">{cat.title}</span>
                  {expanded === cat.title ? <ChevronUp size={16} color="#94A3B8" /> : <ChevronDown size={16} color="#94A3B8" />}
                </button>
                {expanded === cat.title && (
                  <div className="border-t border-[#F1F5F9]">
                    {cat.articles.map((article) => (
                      <button
                        key={article}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#F8FAFC] border-b border-[#F1F5F9] last:border-0 transition-colors"
                      >
                        <span className="text-sm text-[#64748B]">{article}</span>
                        <ExternalLink size={13} color="#CBD5E1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* My Tickets */}
        <div>
          <h3 className="font-display font-semibold text-[#0F172A] mb-3">My Support Tickets</h3>
          <div className="space-y-3 mb-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono-data text-xs text-[#94A3B8]">{ticket.id}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ticket.status === "resolved" ? "badge-verified" : "badge-active"}`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="text-sm font-medium text-[#0F172A]">{ticket.subject}</div>
                <div className="text-xs text-[#94A3B8] mt-1">{ticket.date}</div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 rounded-xl text-sm font-semibold border border-[#E2E8F0]" style={{ color: "#1D6AFF" }}>
            + Open New Ticket
          </button>

          {/* System Status */}
          <div className="mt-4 bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-[#0F172A] text-sm">System Status</h4>
              <span className="badge-verified text-xs font-semibold px-2.5 py-1 rounded-full">All systems operational</span>
            </div>
            <div className="space-y-2">
              {["Identity Services", "Wallet & Payments", "API & Integrations", "Notifications"].map((s) => (
                <div key={s} className="flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">{s}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
                    <span className="text-xs text-[#059669] font-medium">Operational</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
