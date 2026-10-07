import { useState } from "react";
import { Search, ArrowRight, CheckCircle, ChevronDown } from "lucide-react";
import { recentRecipients, user } from "../data/demo";

const nigerianBanks = [
  "Access Bank", "First Bank Nigeria", "GTBank", "UBA", "Zenith Bank",
  "Fidelity Bank", "First City Monument Bank", "Polaris Bank", "Stanbic IBTC",
  "Sterling Bank", "Union Bank", "Wema Bank", "Keystone Bank", "Ecobank Nigeria",
  "Providus Bank", "TrueID Wallet",
];

interface Props { navigate: (page: string) => void }

export default function SendMoney({ navigate }: Props) {
  const [step, setStep] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [bank, setBank] = useState("GTBank");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<typeof recentRecipients[0] | null>(null);
  const [sent, setSent] = useState(false);

  const resolvedName = selectedRecipient ? selectedRecipient.name : recipient ? "CHIDINMA NGOZI ADEYEMI" : "";
  const numAmount = parseFloat(amount.replace(/,/g, "")) || 0;

  const handleAmountChange = (val: string) => {
    const num = val.replace(/[^0-9]/g, "");
    setAmount(num ? parseInt(num).toLocaleString("en-NG") : "");
  };

  if (sent) {
    return (
      <div className="p-4 md:p-6 max-w-md mx-auto page-transition">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 text-center mt-10">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#ECFDF5" }}>
            <CheckCircle size={40} color="#059669" />
          </div>
          <h2 className="font-display font-bold text-[#0F172A] text-xl mb-2">Transfer Successful!</h2>
          <p className="text-sm text-[#64748B] mb-1">
            <strong>₦{parseFloat(amount.replace(/,/g, "")).toLocaleString("en-NG", { minimumFractionDigits: 2 })}</strong> has been sent to
          </p>
          <p className="font-semibold text-[#0F172A] mb-5">{resolvedName || recipient}</p>
          <div className="p-4 rounded-xl mb-5 text-left space-y-2" style={{ background: "#F8FAFC" }}>
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">Reference</span>
              <span className="font-mono-data font-medium text-[#0F172A]">TRF{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">Bank</span>
              <span className="font-medium text-[#0F172A]">{selectedRecipient?.bank || bank}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">Time</span>
              <span className="font-medium text-[#0F172A]">{new Date().toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setSent(false); setStep(0); setAmount(""); setRecipient(""); setNote(""); setSelectedRecipient(null); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-[#E2E8F0]"
              style={{ color: "#0F172A" }}
            >
              Send Again
            </button>
            <button
              onClick={() => navigate("digital-wallet")}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "#1D6AFF" }}
            >
              Back to Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-md mx-auto page-transition">
      <div className="mb-6">
        <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">Send Money</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Transfer to any bank or TrueID wallet</p>
      </div>

      {/* Balance */}
      <div className="p-4 rounded-xl mb-5 flex items-center justify-between" style={{ background: "#E8EFFF", border: "1px solid #A8C4FF" }}>
        <span className="text-sm text-[#1040A8] font-medium">Wallet Balance</span>
        <span className="font-display font-bold text-[#1D6AFF]">₦{user.walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
      </div>

      <div className="space-y-4">
        {/* Recipient */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
          <h3 className="font-display font-semibold text-[#0F172A] text-sm mb-3">Recipient</h3>

          {/* Recent recipients */}
          <div className="flex gap-3 overflow-x-auto pb-2 mb-4">
            {recentRecipients.map((r) => (
              <button
                key={r.name}
                onClick={() => { setSelectedRecipient(r); setRecipient(r.phone); setBank(r.bank); }}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-display font-semibold text-sm border-2 transition-all"
                  style={{
                    background: "#1D6AFF",
                    borderColor: selectedRecipient?.name === r.name ? "#1D6AFF" : "transparent",
                    outline: selectedRecipient?.name === r.name ? "2px solid #93C5FD" : "none",
                  }}
                >
                  {r.initials}
                </div>
                <span className="text-xs text-[#64748B] whitespace-nowrap">{r.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-[#64748B] block mb-1.5">Account Number / Phone</label>
              <input
                type="text"
                value={recipient}
                onChange={e => { setRecipient(e.target.value); setSelectedRecipient(null); }}
                placeholder="0123456789 or +234..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A]"
              />
              {recipient && !selectedRecipient && (
                <div className="mt-2 p-2.5 rounded-lg" style={{ background: "#ECFDF5", border: "1px solid #A7F3D0" }}>
                  <div className="text-xs text-[#065F46] font-semibold">{resolvedName}</div>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-[#64748B] block mb-1.5">Bank</label>
              <div className="relative">
                <select
                  value={bank}
                  onChange={e => setBank(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] appearance-none bg-white"
                >
                  {nigerianBanks.map((b) => <option key={b}>{b}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" color="#94A3B8" />
              </div>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
          <h3 className="font-display font-semibold text-[#0F172A] text-sm mb-3">Amount</h3>
          <div className="relative mb-3">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display font-bold text-lg text-[#94A3B8]">₦</span>
            <input
              type="text"
              value={amount}
              onChange={e => handleAmountChange(e.target.value)}
              placeholder="0.00"
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#E2E8F0] text-lg font-display font-bold text-[#0F172A]"
            />
          </div>
          <div className="flex gap-2">
            {["5,000", "10,000", "20,000", "50,000"].map((q) => (
              <button
                key={q}
                onClick={() => setAmount(q)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold border border-[#E2E8F0] hover:border-[#1D6AFF] transition-colors"
                style={{ color: "#64748B" }}
              >
                ₦{q}
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
          <h3 className="font-display font-semibold text-[#0F172A] text-sm mb-3">Note (Optional)</h3>
          <input
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="What's this for?"
            className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A]"
          />
        </div>

        {/* Summary */}
        {numAmount > 0 && (recipient || selectedRecipient) && (
          <div className="p-4 rounded-xl space-y-2" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">Amount</span>
              <span className="font-semibold text-[#0F172A]">₦{numAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B]">Fee</span>
              <span className="font-semibold text-[#0F172A]">₦{numAmount > 5000 ? "25.00" : "10.00"}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-[#E2E8F0] pt-2 mt-1">
              <span className="text-[#64748B] font-medium">Total</span>
              <span className="font-display font-bold text-[#0F172A]">₦{(numAmount + (numAmount > 5000 ? 25 : 10)).toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        )}

        <button
          onClick={() => numAmount > 0 && (recipient || selectedRecipient) && setSent(true)}
          disabled={!numAmount || (!recipient && !selectedRecipient)}
          className="w-full py-3.5 rounded-xl font-display font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40 transition-all"
          style={{ background: "#1D6AFF" }}
        >
          Send ₦{amount || "0.00"} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
