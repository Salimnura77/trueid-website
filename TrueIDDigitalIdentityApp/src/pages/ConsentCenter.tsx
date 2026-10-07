import { useState } from "react";
import { Shield, CheckCircle, AlertCircle, X, ChevronDown, ChevronUp } from "lucide-react";
import { consentOrganizations } from "../data/demo";

interface Props { navigate: (page: string) => void }

export default function ConsentCenter({ navigate }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "expired">("all");

  const filtered = consentOrganizations.filter(o =>
    filter === "all" ? true : o.status === filter
  );

  const activeCount = consentOrganizations.filter(o => o.status === "active").length;

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto page-transition">
      <div className="mb-6">
        <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">Consent Center</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Manage which organizations can access your identity data</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4 text-center">
          <div className="font-display font-bold text-2xl text-[#1D6AFF]">{activeCount}</div>
          <div className="text-xs text-[#64748B] mt-0.5">Active</div>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4 text-center">
          <div className="font-display font-bold text-2xl text-[#DC2626]">{consentOrganizations.filter(o => o.status === "expired").length}</div>
          <div className="text-xs text-[#64748B] mt-0.5">Expired</div>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4 text-center">
          <div className="font-display font-bold text-2xl text-[#059669]">{consentOrganizations.reduce((sum, o) => sum + o.sharedCredentials.length, 0)}</div>
          <div className="text-xs text-[#64748B] mt-0.5">Data Points</div>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl mb-5" style={{ background: "#E8EFFF", border: "1px solid #A8C4FF" }}>
        <Shield size={18} color="#1D6AFF" className="flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-semibold text-[#1040A8]">You are in control</div>
          <div className="text-xs text-[#4D9EFF] mt-0.5">
            All access is read-only. Organizations can view but never modify your identity data. You can revoke any consent instantly.
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {(["all", "active", "expired"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize"
            style={{ background: filter === f ? "#1D6AFF" : "#F1F5F9", color: filter === f ? "white" : "#64748B" }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Organization list */}
      <div className="space-y-3">
        {filtered.map((org) => {
          const isExpanded = expanded === org.id;
          return (
            <div key={org.id} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                onClick={() => setExpanded(isExpanded ? null : org.id)}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "#F8FAFC" }}>
                  {org.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#0F172A] text-sm">{org.name}</div>
                  <div className="text-xs text-[#64748B]">{org.type} · {org.purpose}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="text-xs text-[#94A3B8]">
                      {org.sharedCredentials.join(" · ")}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${org.status === "active" ? "badge-verified" : "badge-expired"}`}>
                    {org.status === "active" ? <><CheckCircle size={10} className="inline mr-1" />Active</> : <><AlertCircle size={10} className="inline mr-1" />Expired</>}
                  </span>
                  {isExpanded ? <ChevronUp size={14} color="#94A3B8" /> : <ChevronDown size={14} color="#94A3B8" />}
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-[#F1F5F9]">
                  <div className="grid grid-cols-2 gap-3 pt-3 mb-4">
                    {[
                      { label: "Granted On", value: new Date(org.grantedDate).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) },
                      { label: "Last Accessed", value: new Date(org.lastAccessed).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) },
                      { label: "Expires On", value: new Date(org.expiryDate).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) },
                      { label: "Access Level", value: org.accessLevel },
                    ].map((f) => (
                      <div key={f.label}>
                        <div className="text-xs text-[#94A3B8]">{f.label}</div>
                        <div className="text-sm font-medium text-[#0F172A] mt-0.5">{f.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-[#94A3B8] mb-2">Shared Data Points</div>
                    <div className="flex flex-wrap gap-2">
                      {org.sharedCredentials.map((c) => (
                        <span key={c} className="px-2.5 py-1 rounded-full text-xs font-medium badge-active">{c}</span>
                      ))}
                    </div>
                  </div>

                  {org.status === "active" && (
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 rounded-xl text-xs font-semibold border border-[#E2E8F0]" style={{ color: "#64748B" }}>
                        Modify Access
                      </button>
                      <button className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-xl text-xs font-semibold" style={{ background: "#FEF2F2", color: "#DC2626" }}>
                        <X size={12} /> Revoke Access
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
