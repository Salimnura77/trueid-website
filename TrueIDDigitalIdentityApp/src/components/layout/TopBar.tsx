import { Bell, Search } from "lucide-react";
import { user, notifications } from "../../data/demo";

/* TrueID.me shield — identical to Sidebar version */
function TrueIDShield({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 2L4 9V22C4 31.4 11.2 40.1 20 42.5C28.8 40.1 36 31.4 36 22V9L20 2Z"
        fill="url(#shieldGradTB)"
      />
      <circle cx="20" cy="21" r="9.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" fill="none" />
      <circle cx="20" cy="21" r="4.5" fill="white" fillOpacity="0.92" />
      <path d="M13.5 14.5 A9.5 9.5 0 0 1 26.5 14.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.7"/>
      <defs>
        <linearGradient id="shieldGradTB" x1="4" y1="2" x2="36" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2579FF" />
          <stop offset="100%" stopColor="#0F50D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const pageNames: Record<string, string> = {
  dashboard: "Dashboard",
  "my-ids": "My IDs",
  "identity-verification": "Verify Identity",
  "verified-documents": "Documents",
  "share-credential": "Share Credentials",
  "consent-center": "Consent Center",
  "activity-history": "Activity Log",
  "digital-wallet": "Digital Wallet",
  "send-money": "Send Money",
  "receive-money": "Receive Money",
  "qr-payments": "QR Pay",
  "qr-identity": "QR Identity",
  notifications: "Notifications",
  "security-center": "Security Center",
  settings: "Settings",
  "help-support": "Help & Support",
};

interface TopBarProps {
  currentPage: string;
  navigate: (page: string) => void;
}

export default function TopBar({ currentPage, navigate }: TopBarProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className="flex-shrink-0 flex items-center justify-between px-5 md:px-6 h-[60px] border-b"
      style={{ background: "white", borderColor: "var(--border)" }}
    >
      {/* Mobile: logo — Desktop: page title */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="md:hidden flex items-center gap-2">
          <TrueIDShield size={28} />
          <span className="font-display font-extrabold text-[#0B1628]" style={{ fontSize: 16, letterSpacing: "-0.02em" }}>
            TrueID<span style={{ color: "#1D6AFF" }}>.me</span>
          </span>
        </div>
        <div className="hidden md:block min-w-0">
          <h2
            className="font-display font-bold text-[#0B1628] leading-tight truncate"
            style={{ fontSize: 17 }}
          >
            {pageNames[currentPage] || "TrueID.me"}
          </h2>
          {currentPage === "dashboard" && (
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              {new Date().toLocaleDateString("en-NG", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[#F1F5F9]"
          title="Search"
        >
          <Search size={17} color="var(--muted-foreground)" />
        </button>
        <button
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[#F1F5F9]"
          onClick={() => navigate("notifications")}
          title="Notifications"
        >
          <Bell size={17} color="var(--muted-foreground)" />
          {unreadCount > 0 && (
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border border-white"
              style={{ background: "#EF4444" }}
            />
          )}
        </button>
        {/* Mobile avatar */}
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-display font-bold text-xs md:hidden ml-1"
          style={{ background: "#1D6AFF" }}
          onClick={() => navigate("settings")}
        >
          {user.initials}
        </button>
      </div>
    </header>
  );
}
