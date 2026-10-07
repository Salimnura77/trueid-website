import { useState } from "react";
import { Filter, Download, Search, MapPin, Monitor, CheckCircle, XCircle, AlertTriangle, MinusCircle } from "lucide-react";
import { activityLog } from "../data/demo";

const typeColors: Record<string, { bg: string; text: string; icon: string }> = {
  credential_share: { bg: "#E8EFFF", text: "#1D6AFF", icon: "🔗" },
  verification: { bg: "#ECFDF5", text: "#059669", icon: "✅" },
  login: { bg: "#F0FDF4", text: "#16A34A", icon: "📱" },
  security: { bg: "#FEF2F2", text: "#DC2626", icon: "🔒" },
  consent: { bg: "#FFF7ED", text: "#D97706", icon: "🛡️" },
};

const statusIcon: Record<string, React.ReactNode> = {
  success: <CheckCircle size={14} color="#059669" />,
  blocked: <XCircle size={14} color="#DC2626" />,
  revoked: <MinusCircle size={14} color="#D97706" />,
};

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const typeFilters = ["All Types", "Credential Share", "Verification", "Login", "Security", "Consent"];

interface Props { navigate: (page: string) => void }

export default function ActivityHistory({ navigate }: Props) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = activityLog.filter((a) => {
    const matchSearch = a.action.toLowerCase().includes(search.toLowerCase()) ||
      (a.organization || "").toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All Types" || a.type.replace("_", " ") === typeFilter.toLowerCase();
    return matchSearch && matchType;
  });

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto page-transition">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">Activity Log</h1>
          <p className="text-sm text-[#64748B] mt-0.5">Complete audit trail of your identity activity</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[#E2E8F0]" style={{ color: "#64748B" }}>
          <Download size={15} /> Export
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Events", value: activityLog.length },
          { label: "Successful", value: activityLog.filter(a => a.status === "success").length },
          { label: "Blocked", value: activityLog.filter(a => a.status === "blocked").length },
          { label: "Revoked", value: activityLog.filter(a => a.status === "revoked").length },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-3 text-center">
            <div className="font-display font-bold text-xl text-[#0F172A]">{s.value}</div>
            <div className="text-xs text-[#64748B] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color="#94A3B8" />
          <input
            type="text"
            placeholder="Search activity..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-white text-[#0F172A]"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {typeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className="px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap"
              style={{ background: typeFilter === t ? "#1D6AFF" : "#F1F5F9", color: typeFilter === t ? "white" : "#64748B" }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Activity list */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {filtered.map((act, idx) => {
          const typeInfo = typeColors[act.type] || typeColors.login;
          const isExpanded = expandedId === act.id;
          return (
            <div key={act.id} className={`border-b border-[#F1F5F9] ${idx === filtered.length - 1 ? "border-0" : ""}`}>
              <div
                className="flex items-start gap-4 p-4 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : act.id)}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                  style={{ background: typeInfo.bg }}
                >
                  {typeInfo.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#0F172A] text-sm">{act.action}</span>
                    <span className="flex items-center gap-1">{statusIcon[act.status]}</span>
                  </div>
                  <div className="text-xs text-[#64748B] mt-0.5 truncate">{act.description}</div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-[#94A3B8]">{formatDateTime(act.timestamp)}</span>
                    {act.organization && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: typeInfo.bg, color: typeInfo.text }}>
                        {act.organization}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                    act.status === "success" ? "badge-verified"
                    : act.status === "blocked" ? "badge-expired"
                    : act.status === "revoked" ? "badge-pending"
                    : "badge-active"
                  }`}
                >
                  {act.status}
                </span>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 bg-[#F8FAFC] border-t border-[#F1F5F9]">
                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} color="#94A3B8" className="mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-[#94A3B8]">Location</div>
                        <div className="text-sm font-medium text-[#0F172A]">{act.location}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Monitor size={14} color="#94A3B8" className="mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-[#94A3B8]">Device</div>
                        <div className="text-sm font-medium text-[#0F172A]">{act.device}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#94A3B8]">IP Address</div>
                      <div className="font-mono-data text-sm font-medium text-[#0F172A]">{act.ipAddress}</div>
                    </div>
                    {act.credential && (
                      <div>
                        <div className="text-xs text-[#94A3B8]">Credential</div>
                        <div className="text-sm font-medium text-[#0F172A]">{act.credential}</div>
                      </div>
                    )}
                  </div>
                  {act.status === "blocked" && (
                    <div className="mt-3 flex items-start gap-2 p-3 rounded-lg" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
                      <AlertTriangle size={14} color="#DC2626" className="flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#991B1B]">
                        This login attempt was automatically blocked because it came from an unrecognized device. If this was you, please update your trusted devices in Security settings.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-medium text-[#64748B]">No activity found</div>
            <div className="text-xs text-[#94A3B8] mt-1">Try adjusting your search or filters</div>
          </div>
        )}
      </div>
    </div>
  );
}
