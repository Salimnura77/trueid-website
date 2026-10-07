import { useState } from "react";
import { QrCode, Share2, Download, ShieldCheck, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { user, credentials } from "../data/demo";

/* TrueID.me shield — same SVG used throughout the app */
function TrueIDShieldInline({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none">
      <path d="M20 2L4 9V22C4 31.4 11.2 40.1 20 42.5C28.8 40.1 36 31.4 36 22V9L20 2Z" fill="url(#shGradCard)" />
      <circle cx="20" cy="21" r="9.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" fill="none" />
      <circle cx="20" cy="21" r="4.5" fill="white" fillOpacity="0.9" />
      <path d="M13.5 14.5 A9.5 9.5 0 0 1 26.5 14.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.65"/>
      <defs>
        <linearGradient id="shGradCard" x1="4" y1="2" x2="36" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2579FF" />
          <stop offset="100%" stopColor="#0F50D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TrueIDCard({ navigate }: { navigate: (p: string) => void }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="relative w-full" style={{ maxWidth: 390, perspective: 1000 }}>
      <div
        className="relative w-full cursor-pointer"
        style={{
          height: 228,
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl id-card-surface p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Header row */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <TrueIDShieldInline size={24} />
              <div>
                <div className="font-display font-extrabold text-white leading-none" style={{ fontSize: 15, letterSpacing: "-0.02em" }}>
                  TrueID<span style={{ color: "#4D9EFF" }}>.me</span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.38)", fontSize: 9.5 }}>
                  Digital Identity · Nigeria
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(16,185,129,0.18)", color: "#10B981", border: "1px solid rgba(16,185,129,0.28)" }}
              >
                ✓ Verified
              </span>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Platinum</div>
            </div>
          </div>

          {/* Middle: avatar + name */}
          <div className="relative z-10 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-extrabold text-white text-xl flex-shrink-0"
              style={{ background: "rgba(29,106,255,0.45)", border: "1.5px solid rgba(255,255,255,0.18)" }}
            >
              {user.initials}
            </div>
            <div>
              <div className="font-display font-bold text-white leading-tight" style={{ fontSize: 19 }}>{user.name}</div>
              <div className="font-mono-data text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.06em" }}>
                {user.trueId}
              </div>
            </div>
          </div>

          {/* Trust bar */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Identity Trust Score</span>
              <span className="font-display font-extrabold text-sm" style={{ color: "#10B981" }}>{user.trustScore}/100</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div className="h-1.5 rounded-full" style={{ background: "#10B981", width: `${user.trustScore}%` }} />
            </div>
            <div className="text-xs mt-1.5 flex items-center justify-between" style={{ color: "rgba(255,255,255,0.25)" }}>
              <span>Tap to flip</span>
              <span>Issued {user.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl id-card-surface p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="relative z-10">
            <div className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.38)" }}>Identity Details</div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-3 text-xs">
            {[
              { label: "Date of Birth", value: user.dateOfBirth },
              { label: "Gender", value: user.gender },
              { label: "Nationality", value: user.nationality },
              { label: "NIN", value: user.nin },
            ].map((f) => (
              <div key={f.label}>
                <div style={{ color: "rgba(255,255,255,0.36)" }}>{f.label}</div>
                <div className="text-white font-medium mt-0.5">{f.value}</div>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex items-center justify-between">
            {/* Mini QR */}
            <div style={{ width: 52, height: 52, borderRadius: 8, background: "rgba(255,255,255,0.08)", padding: 6 }}>
              <svg width="40" height="40" viewBox="0 0 40 40">
                {/* Corner squares */}
                <rect x="2" y="2" width="10" height="10" rx="1.5" fill="rgba(255,255,255,0.7)"/>
                <rect x="3.5" y="3.5" width="7" height="7" rx="1" fill="#0B1628"/>
                <rect x="5" y="5" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.7)"/>
                <rect x="28" y="2" width="10" height="10" rx="1.5" fill="rgba(255,255,255,0.7)"/>
                <rect x="29.5" y="3.5" width="7" height="7" rx="1" fill="#0B1628"/>
                <rect x="31" y="5" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.7)"/>
                <rect x="2" y="28" width="10" height="10" rx="1.5" fill="rgba(255,255,255,0.7)"/>
                <rect x="3.5" y="29.5" width="7" height="7" rx="1" fill="#0B1628"/>
                <rect x="5" y="31" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.7)"/>
                {/* Data dots */}
                {[14,16,18,20,22,14,16,20,22,14,18,22,14,16,18,20,22].map((x, i) => (
                  <rect key={i} x={x} y={14 + Math.floor(i / 5) * 4} width="2" height="2" fill={`rgba(255,255,255,${0.25 + (i % 4) * 0.15})`}/>
                ))}
              </svg>
            </div>
            <div className="text-xs text-right" style={{ color: "rgba(255,255,255,0.35)" }}>
              <div>Scan to verify identity</div>
              <div className="mt-0.5 font-mono-data" style={{ color: "rgba(255,255,255,0.5)" }}>{user.trueId}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props { navigate: (page: string) => void }

export default function MyIDs({ navigate }: Props) {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto page-transition">
      <div>
        <h1 className="font-display font-bold text-[#0B1628] text-xl md:text-2xl">My TrueID</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Your verified digital identity credential</p>
      </div>

      {/* ID Card */}
      <div className="flex flex-col items-center gap-4">
        <TrueIDCard navigate={navigate} />
        <div className="flex gap-3">
          <button
            onClick={() => navigate("share-credential")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "#1D6AFF" }}
          >
            <Share2 size={15} />
            Share Identity
          </button>
          <button
            onClick={() => navigate("qr-identity")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[#DDE3EC]"
            style={{ color: "#0B1628" }}
          >
            <QrCode size={15} />
            Show QR
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[#DDE3EC]"
            style={{ color: "#0B1628" }}
          >
            <Download size={15} />
            Save
          </button>
        </div>
      </div>

      {/* Linked Credentials */}
      <div className="bg-white rounded-2xl border border-[#DDE3EC] shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-[#0B1628]">Linked Identity Documents</h3>
          <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
            {credentials.filter(c => c.status === "verified").length} verified
          </span>
        </div>
        <div className="space-y-2.5">
          {credentials.map((cred) => (
            <div
              key={cred.id}
              className="flex items-center gap-4 p-3.5 rounded-xl border transition-colors hover:border-[#A8C4FF]"
              style={{ borderColor: "#DDE3EC" }}
            >
              <div className="text-2xl w-10 text-center flex-shrink-0">{cred.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm" style={{ color: "#0B1628" }}>{cred.type}</div>
                <div className="text-xs mt-0.5 truncate" style={{ color: "var(--muted-foreground)" }}>{cred.issuer}</div>
                <div className="font-mono-data text-xs mt-0.5" style={{ color: "#94A3B8" }}>{cred.number}</div>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                {cred.status === "verified" ? (
                  <span className="badge-verified text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle size={10} /> Verified
                  </span>
                ) : cred.status === "pending" ? (
                  <span className="badge-pending text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock size={10} /> Pending
                  </span>
                ) : (
                  <span className="badge-expired text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <AlertCircle size={10} /> Expired
                  </span>
                )}
                {cred.expiryDate !== "Never" && (
                  <div className="text-xs" style={{ color: "#94A3B8" }}>Exp {cred.expiryDate.slice(0, 4)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Identity Summary */}
      <div className="bg-white rounded-2xl border border-[#DDE3EC] shadow-sm p-5">
        <h3 className="font-display font-semibold text-[#0B1628] mb-4">Identity Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: user.name },
            { label: "TrueID Number", value: user.trueId, mono: true },
            { label: "Verification Level", value: user.trustLevel },
            { label: "Member Since", value: user.joinDate },
            { label: "Location", value: user.location },
            { label: "Trust Score", value: `${user.trustScore}/100` },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-xs" style={{ color: "#94A3B8" }}>{item.label}</div>
              <div className={`text-sm font-medium mt-0.5 ${item.mono ? "font-mono-data" : ""}`} style={{ color: "#0B1628" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl"
        style={{ background: "#E8EFFF", border: "1px solid #A8C4FF" }}
      >
        <ShieldCheck size={18} color="#1D6AFF" className="flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-semibold" style={{ color: "#1040A8" }}>Protected by TrueID.me Security</div>
          <div className="text-xs mt-0.5" style={{ color: "#3A70D4" }}>
            Your identity data is encrypted with AES-256 and stored on secure servers in Nigeria. NDPR compliant · CBN aligned · Bank-grade encryption.
          </div>
        </div>
      </div>
    </div>
  );
}
