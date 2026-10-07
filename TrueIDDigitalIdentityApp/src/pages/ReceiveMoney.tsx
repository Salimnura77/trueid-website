import { Copy, Share2, Download, CheckCircle } from "lucide-react";
import { useState } from "react";
import { user, transactions } from "../data/demo";

function QRCodeDisplay() {
  const cells: boolean[] = [];
  for (let i = 0; i < 25 * 25; i++) {
    const r = Math.floor(i / 25);
    const c = i % 25;
    if ((r < 7 && c < 7) || (r < 7 && c > 17) || (r > 17 && c < 7)) {
      const inner = r >= 1 && r <= 5 && c >= 1 && c <= 5;
      const innerOuter = r >= 0 && r <= 6 && c >= 0 && c <= 6;
      cells.push(!inner && innerOuter || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
    } else {
      cells.push(Math.random() > 0.55);
    }
  }

  return (
    <div className="p-4 rounded-2xl inline-block" style={{ background: "white", border: "2px solid #E2E8F0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(25, 8px)", gap: 1 }}>
        {Array.from({ length: 25 * 25 }, (_, i) => {
          const r = Math.floor(i / 25);
          const c = i % 25;
          const isCorner = (r < 7 && c < 7) || (r < 7 && c > 17) || (r > 17 && c < 7);
          let dark = false;
          if (isCorner) {
            const rr = r > 17 ? r - 18 : r;
            const cc = c > 17 ? c - 18 : c;
            const isOuter = rr === 0 || rr === 6 || cc === 0 || cc === 6;
            const isInner = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
            dark = isOuter || isInner;
          } else {
            dark = ((r * 7 + c * 3 + r + c) % 3 === 0);
          }
          return (
            <div key={i} style={{ width: 8, height: 8, background: dark ? "#0C1B33" : "transparent", borderRadius: dark ? 1 : 0 }} />
          );
        })}
      </div>
    </div>
  );
}

interface Props { navigate: (page: string) => void }

export default function ReceiveMoney({ navigate }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const incoming = transactions.filter(t => t.amount > 0);

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto page-transition">
      <div className="mb-6">
        <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">Receive Money</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Share your account details or QR code to receive payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* QR Code */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col items-center gap-4">
          <h3 className="font-display font-semibold text-[#0F172A] self-start">Scan to Pay</h3>
          <QRCodeDisplay />
          <div className="text-center">
            <div className="font-display font-semibold text-[#0F172A]">{user.name}</div>
            <div className="font-mono-data text-xs text-[#64748B] mt-0.5">{user.trueId}</div>
          </div>
          <div className="flex gap-3 w-full">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border border-[#E2E8F0]"
              style={{ color: "#64748B" }}
            >
              <Download size={15} /> Save QR
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "#1D6AFF" }}
            >
              <Share2 size={15} /> Share
            </button>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] mb-4">Account Details</h3>
            <div className="space-y-3">
              {[
                { label: "Account Name", value: user.name, key: "name" },
                { label: "TrueID Wallet", value: user.walletAccountNumber, key: "wallet", mono: true },
                { label: "TrueID", value: user.trueId, key: "trueid", mono: true },
                { label: "Phone", value: user.phone, key: "phone" },
              ].map((field) => (
                <div key={field.key} className="flex items-center justify-between py-2.5 border-b border-[#F1F5F9]">
                  <div>
                    <div className="text-xs text-[#94A3B8]">{field.label}</div>
                    <div className={`text-sm font-medium text-[#0F172A] mt-0.5 ${field.mono ? "font-mono-data" : ""}`}>
                      {field.value}
                    </div>
                  </div>
                  <button
                    onClick={() => copy(field.value, field.key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{ background: copied === field.key ? "#ECFDF5" : "#F1F5F9", color: copied === field.key ? "#059669" : "#64748B" }}
                  >
                    {copied === field.key ? <CheckCircle size={12} /> : <Copy size={12} />}
                    {copied === field.key ? "Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Linked bank accounts */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] text-sm mb-3">Also receive via</h3>
            <div className="space-y-2">
              {[
                { bank: "Zenith Bank", number: "2023456789" },
                { bank: "GTBank", number: "0112345678" },
              ].map((a) => (
                <div key={a.bank} className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0]">
                  <div>
                    <div className="text-xs font-semibold text-[#0F172A]">{a.bank}</div>
                    <div className="font-mono-data text-xs text-[#64748B]">{a.number}</div>
                  </div>
                  <button
                    onClick={() => copy(a.number, a.bank)}
                    className="text-xs font-medium px-2.5 py-1.5 rounded-lg"
                    style={{ background: "#F1F5F9", color: "#64748B" }}
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incoming */}
      <div className="mt-5 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
        <h3 className="font-display font-semibold text-[#0F172A] mb-4">Recent Incoming</h3>
        <div className="space-y-3">
          {incoming.map((txn) => (
            <div key={txn.id} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#ECFDF5" }}>
                <span className="text-base">↓</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#0F172A] truncate">{txn.description}</div>
                <div className="text-xs text-[#64748B]">{new Date(txn.date).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</div>
              </div>
              <div className="font-display font-semibold text-sm text-[#059669]">
                +₦{txn.amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
