import { ArrowUpRight, ArrowDownLeft, QrCode, Plus, Eye, EyeOff, Copy, ChevronRight } from "lucide-react";
import { useState } from "react";
import { user, transactions, linkedBankAccounts } from "../data/demo";

function formatAmount(amount: number) {
  return `${amount < 0 ? "-" : "+"}₦${Math.abs(amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

const categoryColor: Record<string, string> = {
  transfer: "#1D6AFF", bills: "#D97706", airtime: "#7C3AED", income: "#059669", food: "#DB2777", default: "#64748B",
};

interface Props { navigate: (page: string) => void }

export default function DigitalWallet({ navigate }: Props) {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "in" | "out">("all");

  const filtered = transactions.filter(t =>
    activeTab === "all" ? true : activeTab === "in" ? t.amount > 0 : t.amount < 0
  );

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto page-transition">
      <div className="mb-5">
        <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">Digital Wallet</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Secure payments powered by TrueID</p>
      </div>

      {/* Wallet Card */}
      <div className="wallet-card-surface rounded-2xl p-6 mb-5">
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div>
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>TrueID Wallet</div>
            <div className="text-xs mt-0.5 font-mono-data" style={{ color: "rgba(255,255,255,0.35)" }}>
              {user.walletAccountNumber}
            </div>
          </div>
          <button onClick={() => setShowBalance(!showBalance)} className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.1)" }}>
            {showBalance ? <Eye size={16} color="rgba(255,255,255,0.7)" /> : <EyeOff size={16} color="rgba(255,255,255,0.7)" />}
          </button>
        </div>

        <div className="relative z-10 mb-6">
          <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Available Balance</div>
          <div className="font-display font-bold text-3xl text-white" style={{ letterSpacing: "-0.02em" }}>
            {showBalance ? `₦${user.walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}` : "₦ ••••••••"}
          </div>
        </div>

        <div className="relative z-10 flex gap-3">
          {[
            { label: "Send", icon: ArrowUpRight, page: "send-money" },
            { label: "Receive", icon: ArrowDownLeft, page: "receive-money" },
            { label: "QR Pay", icon: QrCode, page: "qr-payments" },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.page}
                onClick={() => navigate(a.page)}
                className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <Icon size={18} color="white" />
                <span className="text-xs font-medium text-white">{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Transactions */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F1F5F9]">
              <h3 className="font-display font-semibold text-[#0F172A]">Transactions</h3>
              <div className="flex gap-1">
                {(["all", "in", "out"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
                    style={{ background: activeTab === t ? "#1D6AFF" : "#F1F5F9", color: activeTab === t ? "white" : "#64748B" }}
                  >
                    {t === "all" ? "All" : t === "in" ? "Money In" : "Money Out"}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-[#F1F5F9]">
              {filtered.map((txn) => {
                const catColor = categoryColor[txn.category] || categoryColor.default;
                return (
                  <div key={txn.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#F8FAFC] transition-colors">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: txn.amount > 0 ? "#ECFDF5" : "#F1F5F9" }}
                    >
                      {txn.amount > 0
                        ? <ArrowDownLeft size={18} color="#059669" />
                        : <ArrowUpRight size={18} color="#64748B" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#0F172A] truncate">{txn.description}</div>
                      <div className="text-xs text-[#94A3B8]">{formatDate(txn.date)} · {txn.ref}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className={`font-display font-semibold text-sm ${txn.amount > 0 ? "text-[#059669]" : "text-[#0F172A]"}`}>
                        {formatAmount(txn.amount)}
                      </div>
                      <span className="badge-verified text-xs font-medium px-2 py-0.5 rounded-full">
                        {txn.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Linked accounts */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-[#0F172A] text-sm">Linked Banks</h3>
              <button className="text-xs text-[#1D6AFF] font-medium flex items-center gap-1">
                <Plus size={12} /> Add
              </button>
            </div>
            <div className="space-y-3">
              {linkedBankAccounts.map((bank) => (
                <div key={bank.id} className="flex items-center gap-3 p-3 rounded-xl border border-[#E2E8F0]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: "#F8FAFC" }}>
                    🏦
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#0F172A]">{bank.bank}</div>
                    <div className="font-mono-data text-xs text-[#64748B]">{bank.accountNumber}</div>
                  </div>
                  {bank.primary && (
                    <span className="badge-active text-xs font-medium px-2 py-0.5 rounded-full">Primary</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick summary */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] text-sm mb-4">This Month</h3>
            <div className="space-y-3">
              {[
                { label: "Total Received", value: "+₦770,000", color: "#059669" },
                { label: "Total Sent", value: "-₦125,550", color: "#0F172A" },
                { label: "Net Position", value: "+₦644,450", color: "#059669" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">{s.label}</span>
                  <span className="font-display font-semibold text-sm" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
