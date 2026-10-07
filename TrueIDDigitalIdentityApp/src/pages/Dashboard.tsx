import { ArrowUpRight, ArrowDownLeft, QrCode, ScanFace, Share2, CreditCard, Wallet, ShieldCheck, TrendingUp, ChevronRight, Shield } from "lucide-react";
import { user, transactions, activityLog, consentOrganizations } from "../data/demo";

function TrustRing({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const color = score >= 90 ? "#10B981" : score >= 70 ? "#F59E0B" : "#EF4444";
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="trust-ring">
      <circle cx="64" cy="64" r={r} fill="none" stroke="#DDE3EC" strokeWidth="10" />
      <circle
        cx="64" cy="64" r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circ}`}
        transform="rotate(-90 64 64)"
        style={{ transition: "stroke-dasharray 1.2s ease" }}
      />
      <text x="64" y="59" textAnchor="middle" fill="#0B1628" fontSize="23" fontFamily="Plus Jakarta Sans" fontWeight="800">{score}</text>
      <text x="64" y="75" textAnchor="middle" fill="#5E748A" fontSize="10" fontFamily="Inter">/100</text>
    </svg>
  );
}

function formatAmount(amount: number) {
  return `${amount < 0 ? "-" : "+"}₦${Math.abs(amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", { day: "numeric", month: "short" });
}

const quickActions = [
  { label: "Verify ID", icon: ScanFace, page: "identity-verification", bg: "#E8EFFF", color: "#1D6AFF" },
  { label: "Share", icon: Share2, page: "share-credential", bg: "#ECFDF5", color: "#059669" },
  { label: "Send", icon: ArrowUpRight, page: "send-money", bg: "#F5F3FF", color: "#7C3AED" },
  { label: "QR Pay", icon: QrCode, page: "qr-payments", bg: "#FFF7ED", color: "#D97706" },
  { label: "Receive", icon: ArrowDownLeft, page: "receive-money", bg: "#ECFEFF", color: "#0891B2" },
  { label: "My IDs", icon: CreditCard, page: "my-ids", bg: "#FDF2F8", color: "#DB2777" },
];

const stats = [
  { label: "Wallet Balance", value: `₦${user.walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`, icon: Wallet, color: "#1D6AFF", bg: "#E8EFFF" },
  { label: "Active Credentials", value: "5 / 6", icon: ShieldCheck, color: "#059669", bg: "#ECFDF5" },
  { label: "Organizations", value: consentOrganizations.filter(o => o.status === "active").length.toString(), icon: TrendingUp, color: "#7C3AED", bg: "#F5F3FF" },
];

interface Props { navigate: (page: string) => void }

export default function Dashboard({ navigate }: Props) {
  return (
    <div className="p-4 md:p-6 space-y-5 max-w-5xl mx-auto page-transition">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-extrabold text-[#0B1628] text-xl md:text-2xl" style={{ letterSpacing: "-0.02em" }}>
            Good morning, {user.firstName} 👋
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            Your identity is verified and protected.
          </p>
        </div>
        {/* Trust mark badges — from the brand */}
        <div className="hidden md:flex items-center gap-2">
          {["NDPR Compliant", "CBN Aligned", "Encrypted"].map((mark) => (
            <span
              key={mark}
              className="text-xs font-semibold px-2.5 py-1 rounded-full border"
              style={{ color: "#5E748A", borderColor: "#DDE3EC", background: "white", fontSize: 10 }}
            >
              {mark}
            </span>
          ))}
        </div>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Trust Score */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-[#DDE3EC] shadow-sm p-5 flex flex-col items-center justify-center gap-3 card-hover">
          <TrustRing score={user.trustScore} />
          <div className="text-center">
            <div className="font-display font-bold text-[#0B1628] text-sm">Identity Trust Score</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Platinum Verified</div>
            <div className="mt-2 flex items-center justify-center">
              <span className="badge-verified text-xs font-semibold px-3 py-1 rounded-full">
                ✓ Fully Verified
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="md:col-span-3 space-y-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-xl border border-[#DDE3EC] shadow-sm p-4 flex items-center gap-4 card-hover">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                  <Icon size={18} color={s.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
                  <div className="stat-card-number text-lg text-[#0B1628] truncate">{s.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-[#DDE3EC] shadow-sm p-5">
        <h3 className="font-display font-semibold text-[#0B1628] text-sm mb-4">Quick Actions</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.page}
                onClick={() => navigate(a.page)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:scale-105 active:scale-95"
                style={{ background: a.bg }}
              >
                <Icon size={20} color={a.color} strokeWidth={1.8} />
                <span className="text-xs font-semibold" style={{ color: a.color, fontSize: 11 }}>{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Transactions + Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl border border-[#DDE3EC] shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-[#0B1628] text-sm">Recent Transactions</h3>
            <button onClick={() => navigate("digital-wallet")} className="text-xs font-medium flex items-center gap-1 hover:underline" style={{ color: "#1D6AFF" }}>
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((txn) => (
              <div key={txn.id} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: txn.amount > 0 ? "#ECFDF5" : "#F1F5F9" }}
                >
                  {txn.amount > 0 ? (
                    <ArrowDownLeft size={16} color="#059669" />
                  ) : (
                    <ArrowUpRight size={16} color="#64748B" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#0B1628] truncate font-medium">{txn.description}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{formatDate(txn.date)}</div>
                </div>
                <div className={`text-sm font-semibold font-display ${txn.amount > 0 ? "text-[#059669]" : "text-[#0B1628]"}`}>
                  {formatAmount(txn.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-2xl border border-[#DDE3EC] shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-[#0B1628] text-sm">Identity Activity</h3>
            <button onClick={() => navigate("activity-history")} className="text-xs font-medium flex items-center gap-1 hover:underline" style={{ color: "#1D6AFF" }}>
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {activityLog.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
                  style={{
                    background:
                      act.status === "success" ? "#ECFDF5"
                      : act.status === "blocked" ? "#FEF2F2"
                      : act.status === "revoked" ? "#FFF7ED"
                      : "#F1F5F9",
                  }}
                >
                  {act.type === "credential_share" ? "🔗" : act.type === "verification" ? "✅" : act.type === "security" ? "🔒" : act.type === "consent" ? "🛡️" : "📱"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#0B1628] font-medium truncate">{act.action}</div>
                  <div className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>{act.organization || "TrueID.me System"}</div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
                    act.status === "success" ? "badge-verified"
                    : act.status === "blocked" ? "badge-expired"
                    : act.status === "revoked" ? "badge-pending"
                    : "badge-active"
                  }`}
                >
                  {act.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Organizations */}
      <div className="bg-white rounded-2xl border border-[#DDE3EC] shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold text-[#0B1628] text-sm">Connected Organizations</h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Organizations with access to your identity</p>
          </div>
          <button onClick={() => navigate("consent-center")} className="text-xs font-medium flex items-center gap-1 hover:underline" style={{ color: "#1D6AFF" }}>
            Manage <ChevronRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {consentOrganizations.filter(o => o.status === "active").slice(0, 6).map((org) => (
            <div key={org.id} className="flex items-center gap-2.5 p-3 rounded-xl border border-[#DDE3EC] hover:border-[#A8C4FF] transition-colors">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: "#F8FAFC" }}>
                {org.logo}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#0B1628] truncate">{org.name}</div>
                <div className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>{org.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom brand trust strip */}
      <div
        className="flex items-center justify-center gap-6 py-3 rounded-xl border"
        style={{ background: "white", borderColor: "#DDE3EC" }}
      >
        <div className="flex items-center gap-2">
          <Shield size={13} color="#1D6AFF" />
          <span className="text-xs font-semibold" style={{ color: "#5E748A" }}>NDPR Compliant</span>
        </div>
        <div className="w-px h-4" style={{ background: "#DDE3EC" }} />
        <div className="flex items-center gap-2">
          <Shield size={13} color="#1D6AFF" />
          <span className="text-xs font-semibold" style={{ color: "#5E748A" }}>CBN Aligned</span>
        </div>
        <div className="w-px h-4" style={{ background: "#DDE3EC" }} />
        <div className="flex items-center gap-2">
          <Shield size={13} color="#1D6AFF" />
          <span className="text-xs font-semibold" style={{ color: "#5E748A" }}>Bank-grade Encryption</span>
        </div>
      </div>
    </div>
  );
}
