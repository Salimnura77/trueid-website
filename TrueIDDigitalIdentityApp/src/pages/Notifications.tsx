import { useState } from "react";
import { Bell, Shield, Wallet, Info, AlertTriangle, CheckCheck } from "lucide-react";
import { notifications } from "../data/demo";

const iconMap: Record<string, React.ReactNode> = {
  "shield-check": <Shield size={16} color="#059669" />,
  "wallet": <Wallet size={16} color="#1D6AFF" />,
  "alert": <AlertTriangle size={16} color="#DC2626" />,
  "share": <Shield size={16} color="#7C3AED" />,
  "info": <Info size={16} color="#64748B" />,
};

const typeBg: Record<string, string> = {
  identity: "#ECFDF5",
  wallet: "#E8EFFF",
  security: "#FEF2F2",
  system: "#F8FAFC",
};

function timeAgo(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date("2024-09-11T12:00:00");
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

interface Props { navigate: (page: string) => void }

export default function Notifications({ navigate }: Props) {
  const [notifs, setNotifs] = useState(notifications);
  const [filter, setFilter] = useState("All");

  const unread = notifs.filter(n => !n.read).length;
  const types = ["All", "Identity", "Wallet", "Security", "System"];

  const filtered = notifs.filter(n =>
    filter === "All" || n.type === filter.toLowerCase()
  );

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto page-transition">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">Notifications</h1>
          <p className="text-sm text-[#64748B] mt-0.5">
            {unread > 0 ? `${unread} unread notification${unread > 1 ? "s" : ""}` : "All caught up"}
          </p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl"
            style={{ background: "#E8EFFF", color: "#1D6AFF" }}
          >
            <CheckCheck size={13} /> Mark all read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all"
            style={{ background: filter === t ? "#1D6AFF" : "#F1F5F9", color: filter === t ? "white" : "#64748B" }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-2">
        {filtered.map((notif) => (
          <div
            key={notif.id}
            className="bg-white rounded-xl border overflow-hidden transition-all cursor-pointer"
            style={{ borderColor: notif.read ? "#E2E8F0" : "#A8C4FF", background: notif.read ? "white" : "#FAFCFF" }}
            onClick={() => markRead(notif.id)}
          >
            <div className="flex items-start gap-4 p-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: typeBg[notif.type] || "#F8FAFC" }}
              >
                {iconMap[notif.icon] || <Bell size={16} color="#64748B" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-[#0F172A] text-sm">{notif.title}</span>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: "#1D6AFF" }} />
                  )}
                </div>
                <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{notif.message}</p>
                <div className="text-xs text-[#94A3B8] mt-1.5">{timeAgo(notif.timestamp)}</div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Bell size={40} className="mx-auto mb-3" color="#CBD5E1" />
            <div className="font-medium text-[#64748B]">No notifications</div>
            <div className="text-xs text-[#94A3B8] mt-1">You're all caught up!</div>
          </div>
        )}
      </div>
    </div>
  );
}
