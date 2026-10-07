import { useState } from "react";
import { QrCode, Camera, CheckCircle, ArrowRight, ScanLine } from "lucide-react";
import { user } from "../data/demo";

const recentQRPayments = [
  { merchant: "Chicken Republic VI", amount: 8750, date: "Sep 9, 2024", category: "Food" },
  { merchant: "Shoprite Ikeja City Mall", amount: 45200, date: "Sep 5, 2024", category: "Groceries" },
  { merchant: "NNPC Filling Station", amount: 25000, date: "Sep 3, 2024", category: "Fuel" },
  { merchant: "Delight Pharmacy", amount: 12300, date: "Aug 30, 2024", category: "Health" },
];

interface Props { navigate: (page: string) => void }

export default function QRPayments({ navigate }: Props) {
  const [tab, setTab] = useState<"scan" | "show">("scan");
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => { setScanning(false); setScanned(true); }, 2000);
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto page-transition">
      <div className="mb-5">
        <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">QR Payments</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Scan to pay or show your QR code</p>
      </div>

      {/* Tab toggle */}
      <div className="flex rounded-xl p-1 mb-5" style={{ background: "#F1F5F9" }}>
        <button
          onClick={() => setTab("scan")}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{ background: tab === "scan" ? "white" : "transparent", color: tab === "scan" ? "#0F172A" : "#64748B", boxShadow: tab === "scan" ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}
        >
          Scan QR
        </button>
        <button
          onClick={() => setTab("show")}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{ background: tab === "show" ? "white" : "transparent", color: tab === "show" ? "#0F172A" : "#64748B", boxShadow: tab === "show" ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}
        >
          My QR Code
        </button>
      </div>

      {tab === "scan" && (
        <div className="space-y-4">
          {!scanned && !confirmed && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
              {/* Scanner viewport */}
              <div
                className="relative rounded-2xl overflow-hidden mb-5"
                style={{ paddingBottom: "75%", background: "#0C1B33" }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {scanning ? (
                    <>
                      <ScanLine size={48} color="#1D6AFF" className="animate-bounce" />
                      <div className="text-white text-sm mt-3 font-medium">Scanning...</div>
                      <div className="absolute inset-x-8 top-8 h-0.5" style={{ background: "rgba(27,78,216,0.6)" }} />
                      <div className="absolute left-8 top-8 w-8 h-8 border-t-2 border-l-2 border-[#1D6AFF] rounded-tl-lg" />
                      <div className="absolute right-8 top-8 w-8 h-8 border-t-2 border-r-2 border-[#1D6AFF] rounded-tr-lg" />
                      <div className="absolute left-8 bottom-8 w-8 h-8 border-b-2 border-l-2 border-[#1D6AFF] rounded-bl-lg" />
                      <div className="absolute right-8 bottom-8 w-8 h-8 border-b-2 border-r-2 border-[#1D6AFF] rounded-br-lg" />
                    </>
                  ) : (
                    <>
                      <QrCode size={48} color="rgba(255,255,255,0.3)" />
                      <div className="text-white/50 text-sm mt-3">Camera preview</div>
                      <div className="absolute left-8 top-8 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
                      <div className="absolute right-8 top-8 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
                      <div className="absolute left-8 bottom-8 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
                      <div className="absolute right-8 bottom-8 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={handleScan}
                disabled={scanning}
                className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: "#1D6AFF" }}
              >
                <Camera size={18} /> {scanning ? "Scanning..." : "Start Camera Scan"}
              </button>
            </div>
          )}

          {scanned && !confirmed && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 animate-scale-in">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={18} color="#059669" />
                <span className="font-semibold text-[#059669] text-sm">QR Code Detected</span>
              </div>
              <h3 className="font-display font-bold text-[#0F172A] text-lg mb-1">Chicken Republic VI</h3>
              <div className="text-sm text-[#64748B] mb-5">Merchant ID: CR-LAG-2024-00124</div>

              <div className="p-4 rounded-xl mb-4" style={{ background: "#F8FAFC" }}>
                <div className="text-xs text-[#94A3B8] mb-1">Amount to Pay</div>
                <div className="font-display font-bold text-3xl text-[#0F172A]">₦8,750.00</div>
              </div>

              <div className="space-y-2 mb-5 text-sm">
                <div className="flex justify-between py-2 border-b border-[#F1F5F9]">
                  <span className="text-[#64748B]">Merchant</span>
                  <span className="font-medium">Chicken Republic VI</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F1F5F9]">
                  <span className="text-[#64748B]">Category</span>
                  <span className="font-medium">Food & Dining</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#64748B]">Your Balance After</span>
                  <span className="font-display font-semibold text-[#0F172A]">₦838,500.00</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setScanned(false); setScanning(false); }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-[#E2E8F0]"
                  style={{ color: "#0F172A" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setConfirmed(true)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: "#1D6AFF" }}
                >
                  Pay ₦8,750 <ArrowRight size={14} className="inline ml-1" />
                </button>
              </div>
            </div>
          )}

          {confirmed && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 text-center animate-scale-in">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#ECFDF5" }}>
                <CheckCircle size={40} color="#059669" />
              </div>
              <h2 className="font-display font-bold text-[#0F172A] text-xl mb-1">Payment Successful</h2>
              <p className="text-sm text-[#64748B] mb-5">₦8,750.00 sent to Chicken Republic VI</p>
              <div className="font-mono-data text-xs text-[#94A3B8] mb-5">QRP{Date.now().toString().slice(-8)}</div>
              <button
                onClick={() => { setScanned(false); setScanning(false); setConfirmed(false); }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#1D6AFF" }}
              >
                Done
              </button>
            </div>
          )}

          {/* Recent */}
          {!scanned && !confirmed && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
              <h3 className="font-display font-semibold text-[#0F172A] text-sm mb-4">Recent QR Payments</h3>
              <div className="space-y-3">
                {recentQRPayments.map((p) => (
                  <div key={p.merchant} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                      <QrCode size={16} color="#64748B" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#0F172A] truncate">{p.merchant}</div>
                      <div className="text-xs text-[#94A3B8]">{p.date} · {p.category}</div>
                    </div>
                    <div className="font-display font-semibold text-sm text-[#0F172A]">
                      ₦{p.amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "show" && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 text-center">
          <div className="mb-4">
            <div className="font-display font-semibold text-[#0F172A]">Your Payment QR</div>
            <div className="text-xs text-[#64748B] mt-0.5">Merchants scan this to charge you</div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="p-6 rounded-2xl" style={{ background: "#F8FAFC", border: "1px dashed #CBD5E1" }}>
              <div style={{ width: 180, height: 180, display: "grid", gridTemplateColumns: "repeat(18, 10px)", gap: 1 }}>
                {Array.from({ length: 18 * 18 }, (_, i) => {
                  const r = Math.floor(i / 18);
                  const c = i % 18;
                  const isCorner = (r < 5 && c < 5) || (r < 5 && c > 12) || (r > 12 && c < 5);
                  let dark = false;
                  if (isCorner) {
                    const rr = r > 12 ? r - 13 : r;
                    const cc = c > 12 ? c - 13 : c;
                    dark = rr === 0 || rr === 4 || cc === 0 || cc === 4 || (rr >= 1 && rr <= 3 && cc >= 1 && cc <= 3);
                  } else {
                    dark = ((r * 5 + c * 3) % 3 === 0);
                  }
                  return <div key={i} style={{ width: 10, height: 10, background: dark ? "#0C1B33" : "transparent", borderRadius: 1 }} />;
                })}
              </div>
            </div>
          </div>
          <div className="font-display font-semibold text-[#0F172A]">{user.name}</div>
          <div className="font-mono-data text-xs text-[#64748B] mt-0.5 mb-5">{user.trueId}</div>
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-[#E2E8F0]" style={{ color: "#64748B" }}>
              Save QR
            </button>
            <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#1D6AFF" }}>
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
