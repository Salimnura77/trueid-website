import {
  LayoutDashboard, CreditCard, ScanFace, FileCheck, Share2, ShieldCheck,
  History, Wallet, ArrowUpRight, ArrowDownLeft, QrCode, Bell, Lock,
  Settings, HelpCircle, LogOut, ChevronRight,
} from "lucide-react";
import { user } from "../../data/demo";

/* TrueID.me shield — matches the actual brand logo closely */
function TrueIDShield({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield base */}
      <path
        d="M20 2L4 9V22C4 31.4 11.2 40.1 20 42.5C28.8 40.1 36 31.4 36 22V9L20 2Z"
        fill="url(#shieldGrad)"
      />
      {/* Outer scan ring */}
      <circle cx="20" cy="21" r="9.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" fill="none" />
      {/* Inner filled circle */}
      <circle cx="20" cy="21" r="4.5" fill="white" fillOpacity="0.92" />
      {/* Top scan arc */}
      <path d="M13.5 14.5 A9.5 9.5 0 0 1 26.5 14.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.7"/>
      <defs>
        <linearGradient id="shieldGrad" x1="4" y1="2" x2="36" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2579FF" />
          <stop offset="100%" stopColor="#0F50D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const navSections = [
  {
    label: "Identity",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
      { label: "My IDs", icon: CreditCard, page: "my-ids" },
      { label: "Verify Identity", icon: ScanFace, page: "identity-verification" },
      { label: "Documents", icon: FileCheck, page: "verified-documents" },
      { label: "Share Credentials", icon: Share2, page: "share-credential" },
      { label: "Consent Center", icon: ShieldCheck, page: "consent-center" },
      { label: "Activity Log", icon: History, page: "activity-history" },
    ],
  },
  {
    label: "Payments",
    items: [
      { label: "Digital Wallet", icon: Wallet, page: "digital-wallet" },
      { label: "Send Money", icon: ArrowUpRight, page: "send-money" },
      { label: "Receive Money", icon: ArrowDownLeft, page: "receive-money" },
      { label: "QR Pay", icon: QrCode, page: "qr-payments" },
      { label: "QR Identity", icon: QrCode, page: "qr-identity" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Notifications", icon: Bell, page: "notifications", badge: 3 },
      { label: "Security", icon: Lock, page: "security-center" },
      { label: "Settings", icon: Settings, page: "settings" },
      { label: "Help & Support", icon: HelpCircle, page: "help-support" },
    ],
  },
];

interface SidebarProps {
  currentPage: string;
  navigate: (page: string) => void;
}

export default function Sidebar({ currentPage, navigate }: SidebarProps) {
  const trustColor = user.trustScore >= 90 ? "#10B981" : user.trustScore >= 70 ? "#F59E0B" : "#EF4444";

  return (
    <aside
      className="hidden md:flex flex-col h-full flex-shrink-0"
      style={{ background: "var(--sidebar-bg)", width: 248, minWidth: 248, borderRight: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <TrueIDShield size={34} />
        <div>
          <div className="font-display font-extrabold text-white leading-none" style={{ fontSize: 17, letterSpacing: "-0.02em" }}>
            TrueID<span style={{ color: "#1D6AFF" }}>.me</span>
          </div>
          <div className="text-xs font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.32)", letterSpacing: "0.02em" }}>
            Nigeria
          </div>
        </div>
      </div>

      {/* User profile */}
      <div className="px-3 pt-3 pb-1 flex-shrink-0">
        <button
          onClick={() => navigate("settings")}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all hover:bg-white/5 text-left"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0"
            style={{ background: "#1D6AFF", fontSize: 13 }}
          >
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-white text-sm font-semibold font-display truncate leading-tight">{user.firstName}</div>
            <div className="text-xs truncate leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.38)", fontSize: 10 }}>
              {user.trueId}
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: trustColor, boxShadow: `0 0 6px ${trustColor}80` }}
            />
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-4 min-h-0">
        {navSections.map((section) => (
          <div key={section.label}>
            <div
              className="text-xs font-bold uppercase px-3 mb-1.5"
              style={{ color: "rgba(255,255,255,0.22)", letterSpacing: "0.11em", fontSize: 9.5 }}
            >
              {section.label}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => navigate(item.page)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all ${
                      isActive ? "nav-item-active" : "nav-item"
                    }`}
                    style={isActive ? { background: "rgba(29,106,255,0.18)", color: "white", borderLeft: "2px solid #1D6AFF" } : { paddingLeft: 14 }}
                  >
                    <Icon size={15} className="flex-shrink-0" strokeWidth={isActive ? 2.2 : 1.8} />
                    <span className="flex-1 font-medium" style={{ fontSize: 13 }}>{item.label}</span>
                    {"badge" in item && item.badge && !isActive ? (
                      <span
                        className="text-white font-bold rounded-full"
                        style={{ background: "#EF4444", fontSize: 9, padding: "2px 6px", minWidth: 18, textAlign: "center" }}
                      >
                        {item.badge}
                      </span>
                    ) : isActive ? (
                      <ChevronRight size={12} style={{ color: "#1D6AFF" }} />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Trust Score + Sign Out */}
      <div
        className="px-3 pb-4 space-y-1.5 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12 }}
      >
        {/* Trust badge */}
        <div
          className="px-3 py-2.5 rounded-xl flex items-center justify-between"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={13} style={{ color: trustColor }} />
            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.42)" }}>Trust Score</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-display font-extrabold text-sm" style={{ color: trustColor }}>{user.trustScore}</span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>/100</span>
          </div>
        </div>

        {/* NDPR / CBN trust marks */}
        <div className="flex items-center gap-2 px-1 py-1">
          {["NDPR", "CBN", "Encrypted"].map((mark) => (
            <span key={mark} className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.2)", fontSize: 9.5 }}>
              {mark}
            </span>
          ))}
        </div>

        <button className="nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm">
          <LogOut size={14} className="flex-shrink-0" />
          <span style={{ fontSize: 13 }}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
