import { useState } from "react";
import {
  LayoutDashboard, CreditCard, Wallet, History, MoreHorizontal,
  X, ScanFace, FileCheck, Share2, ShieldCheck, ArrowUpRight,
  ArrowDownLeft, QrCode, Bell, Lock, Settings, HelpCircle,
} from "lucide-react";

const bottomTabs = [
  { label: "Home", icon: LayoutDashboard, page: "dashboard" },
  { label: "My IDs", icon: CreditCard, page: "my-ids" },
  { label: "Wallet", icon: Wallet, page: "digital-wallet" },
  { label: "Activity", icon: History, page: "activity-history" },
  { label: "More", icon: MoreHorizontal, page: "__more__" },
];

const moreItems = [
  { label: "Verify Identity", icon: ScanFace, page: "identity-verification" },
  { label: "Documents", icon: FileCheck, page: "verified-documents" },
  { label: "Share Credentials", icon: Share2, page: "share-credential" },
  { label: "Consent Center", icon: ShieldCheck, page: "consent-center" },
  { label: "Send Money", icon: ArrowUpRight, page: "send-money" },
  { label: "Receive Money", icon: ArrowDownLeft, page: "receive-money" },
  { label: "QR Pay", icon: QrCode, page: "qr-payments" },
  { label: "QR Identity", icon: QrCode, page: "qr-identity" },
  { label: "Notifications", icon: Bell, page: "notifications" },
  { label: "Security", icon: Lock, page: "security-center" },
  { label: "Settings", icon: Settings, page: "settings" },
  { label: "Help & Support", icon: HelpCircle, page: "help-support" },
];

interface MobileNavProps {
  currentPage: string;
  navigate: (page: string) => void;
}

export default function MobileNav({ currentPage, navigate }: MobileNavProps) {
  const [showMore, setShowMore] = useState(false);

  const handleNav = (page: string) => {
    if (page === "__more__") {
      setShowMore(true);
    } else {
      navigate(page);
      setShowMore(false);
    }
  };

  const isMoreActive = !bottomTabs.slice(0, 4).some((t) => t.page === currentPage);

  return (
    <>
      {/* Bottom tab bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2"
        style={{
          background: "white",
          borderTop: "1px solid #E2E8F0",
          height: 64,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {bottomTabs.map((tab) => {
          const Icon = tab.icon;
          const active =
            tab.page === "__more__" ? isMoreActive && showMore : currentPage === tab.page;
          return (
            <button
              key={tab.page}
              onClick={() => handleNav(tab.page)}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all"
              style={{ minWidth: 56 }}
            >
              <Icon
                size={22}
                style={{ color: active ? "#1D6AFF" : "#94A3B8" }}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span
                className="text-xs font-medium"
                style={{ color: active ? "#1D6AFF" : "#94A3B8", fontSize: 10 }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* More sheet */}
      {showMore && (
        <>
          <div
            className="md:hidden fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.4)" }}
            onClick={() => setShowMore(false)}
          />
          <div
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl animate-slide-up"
            style={{ background: "white", paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#E2E8F0]">
              <span className="font-display font-semibold text-[#0F172A]">More</span>
              <button
                onClick={() => setShowMore(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#F1F5F9" }}
              >
                <X size={16} color="#64748B" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1 p-4">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const active = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNav(item.page)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
                    style={{ background: active ? "#EEF2FF" : "transparent" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: active ? "#1D6AFF" : "#F1F5F9" }}
                    >
                      <Icon size={18} color={active ? "white" : "#64748B"} />
                    </div>
                    <span
                      className="text-center leading-tight font-medium"
                      style={{ fontSize: 10, color: active ? "#1D6AFF" : "#64748B" }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
