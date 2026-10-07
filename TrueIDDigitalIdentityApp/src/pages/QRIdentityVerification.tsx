import { useState } from "react";
import { QrCode, Clock, RefreshCw, CheckCircle, Shield } from "lucide-react";
import { user } from "../data/demo";

const recentScans = [
  { org: "Zenith Bank", branch: "Victoria Island Branch", time: "Sep 9, 10:15 AM", credential: "TrueID + NIN", status: "verified" },
  { org: "First Bank Nigeria", branch: "Lekki Phase 1", time: "Sep 5, 2:30 PM", credential: "NIN + BVN", status: "verified" },
  { org: "Lagos State Ministry", branch: "Alausa, Ikeja", time: "Aug 30, 11:05 AM", credential: "NIN + Voter's Card", status: "verified" },
];

interface Props { navigate: (page: string) => void }

export default function QRIdentityVerification({ navigate }: Props) {
  const [timeLeft, setTimeLeft] = useState(285);
  const [refreshed, setRefreshed] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = timeLeft / 300;

  const handleRefresh = () => {
    setTimeLeft(300);
    setRefreshed(true);
    setTimeout(() => setRefreshed(false), 1500);
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto page-transition">
      <div className="mb-5">
        <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">QR Identity Verification</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Let organizations instantly verify your identity via QR</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* QR Display */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-[#0F172A]">Identity QR Code</h3>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              style={{ background: "#F1F5F9", color: "#64748B" }}
            >
              <RefreshCw size={12} className={refreshed ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {/* QR with expiry ring */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <svg width="200" height="200" className="absolute inset-0" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="100" cy="100" r="96" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                <circle
                  cx="100" cy="100" r="96"
                  fill="none"
                  stroke={timeLeft > 60 ? "#059669" : "#EF4444"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 2 * Math.PI * 96} ${2 * Math.PI * 96}`}
                />
              </svg>
              <div className="w-[200px] h-[200px] flex items-center justify-center">
                <div className="p-3 rounded-xl" style={{ background: "white", border: "1px solid #E2E8F0" }}>
                  <div style={{ width: 140, height: 140, display: "grid", gridTemplateColumns: "repeat(14, 10px)", gap: 0.5 }}>
                    {Array.from({ length: 14 * 14 }, (_, i) => {
                      const r = Math.floor(i / 14);
                      const c = i % 14;
                      const isCorner = (r < 4 && c < 4) || (r < 4 && c > 9) || (r > 9 && c < 4);
                      let dark = false;
                      if (isCorner) {
                        const rr = r > 9 ? r - 10 : r;
                        const cc = c > 9 ? c - 10 : c;
                        dark = rr === 0 || rr === 3 || cc === 0 || cc === 3 || (rr >= 1 && rr <= 2 && cc >= 1 && cc <= 2);
                      } else {
                        dark = ((r * 4 + c * 3 + i) % 3 === 0);
                      }
                      return <div key={i} style={{ width: 10, height: 10, background: dark ? "#0C1B33" : "transparent", borderRadius: 1 }} />;
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Clock size={14} color={timeLeft > 60 ? "#059669" : "#EF4444"} />
                <span className="font-mono-data font-semibold text-sm" style={{ color: timeLeft > 60 ? "#059669" : "#EF4444" }}>
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
              </div>
              <div className="text-xs text-[#94A3B8]">QR expires and auto-refreshes</div>
            </div>
          </div>

          {/* User info */}
          <div className="mt-4 p-3 rounded-xl" style={{ background: "#F8FAFC" }}>
            <div className="text-xs text-[#94A3B8] mb-2">Shares on scan</div>
            <div className="space-y-1.5">
              {["Full Name", "TrueID Number", "Verification Status", "Trust Score"].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle size={12} color="#059669" />
                  <span className="text-xs text-[#0F172A]">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details & History */}
        <div className="space-y-4">
          {/* How it works */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] text-sm mb-3">How It Works</h3>
            <div className="space-y-3">
              {[
                { step: "1", text: "Show this QR code to the verifying organization" },
                { step: "2", text: "They scan with their TrueID-compatible device" },
                { step: "3", text: "Your verified identity is confirmed in seconds" },
                { step: "4", text: "A full audit log is recorded for your review" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "#1D6AFF" }}>
                    {s.step}
                  </div>
                  <p className="text-xs text-[#64748B] pt-0.5">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent scans */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] text-sm mb-3">Recent Scans</h3>
            <div className="space-y-3">
              {recentScans.map((scan, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-[#F1F5F9] last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#ECFDF5" }}>
                    <QrCode size={14} color="#059669" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#0F172A]">{scan.org}</div>
                    <div className="text-xs text-[#64748B] truncate">{scan.branch}</div>
                    <div className="text-xs text-[#94A3B8] mt-0.5">{scan.time}</div>
                  </div>
                  <span className="badge-verified text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0">✓</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}>
            <Shield size={14} color="#D97706" className="flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#92400E]">
              QR codes are time-limited and single-use. Each scan is logged and visible in your Activity Log.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
