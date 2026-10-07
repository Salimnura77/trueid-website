import { useState } from "react";
import { Plus, CheckCircle, Clock, AlertCircle, Eye, Share2, Trash2 } from "lucide-react";
import { credentials } from "../data/demo";

const categories = ["All", "Government", "Financial"];

interface Props { navigate: (page: string) => void }

export default function VerifiedDocuments({ navigate }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = credentials.filter(c =>
    activeCategory === "All" || c.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto page-transition">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">Verified Documents</h1>
          <p className="text-sm text-[#64748B] mt-0.5">{credentials.filter(c => c.status === "verified").length} of {credentials.length} documents verified</p>
        </div>
        <button
          onClick={() => navigate("identity-verification")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: "#1D6AFF" }}
        >
          <Plus size={15} />
          Add Document
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Verified", count: credentials.filter(c => c.status === "verified").length, color: "#059669", bg: "#ECFDF5" },
          { label: "Pending", count: credentials.filter(c => c.status === "pending").length, color: "#D97706", bg: "#FFFBEB" },
          { label: "Expired", count: credentials.filter(c => c.status === "expired").length, color: "#DC2626", bg: "#FEF2F2" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4 text-center">
            <div className="font-display font-bold text-2xl" style={{ color: s.color }}>{s.count}</div>
            <div className="text-xs text-[#64748B] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: activeCategory === cat ? "#1D6AFF" : "#F1F5F9",
              color: activeCategory === cat ? "white" : "#64748B",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Document cards */}
      <div className="space-y-3">
        {filtered.map((cred) => (
          <div key={cred.id} className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-5 card-hover">
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">{cred.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-[#0F172A]">{cred.type}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">{cred.issuer}</div>
                  </div>
                  {cred.status === "verified" ? (
                    <span className="badge-verified text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 flex-shrink-0">
                      <CheckCircle size={10} /> Verified
                    </span>
                  ) : cred.status === "pending" ? (
                    <span className="badge-pending text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 flex-shrink-0">
                      <Clock size={10} /> Pending
                    </span>
                  ) : (
                    <span className="badge-expired text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 flex-shrink-0">
                      <AlertCircle size={10} /> Expired
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-[#F1F5F9]">
                  <div>
                    <div className="text-xs text-[#94A3B8]">Document Number</div>
                    <div className="font-mono-data text-sm font-medium text-[#0F172A] mt-0.5">{cred.number}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8]">Expires</div>
                    <div className="text-sm font-medium text-[#0F172A] mt-0.5">{cred.expiryDate}</div>
                  </div>
                  {cred.linkedAt && (
                    <div>
                      <div className="text-xs text-[#94A3B8]">Linked on</div>
                      <div className="text-sm font-medium text-[#0F172A] mt-0.5">
                        {new Date(cred.linkedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-[#94A3B8]">Category</div>
                    <div className="text-sm font-medium text-[#0F172A] mt-0.5 capitalize">{cred.category}</div>
                  </div>
                </div>

                {cred.status === "verified" && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => navigate("share-credential")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: "#E8EFFF", color: "#1D6AFF" }}
                    >
                      <Share2 size={12} /> Share
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "#F1F5F9", color: "#64748B" }}>
                      <Eye size={12} /> View
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ml-auto" style={{ background: "#FEF2F2", color: "#DC2626" }}>
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                )}
                {cred.status === "pending" && (
                  <div className="mt-3 p-3 rounded-lg text-xs" style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}>
                    <span className="font-semibold text-[#92400E]">Verification in progress</span>
                    <span className="text-[#B45309] ml-1">— Usually takes 24–48 hours</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
