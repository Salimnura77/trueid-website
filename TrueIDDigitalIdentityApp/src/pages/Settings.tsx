import { useState } from "react";
import { Camera, ChevronRight, User, Bell, Shield, Globe, CreditCard, HelpCircle, LogOut } from "lucide-react";
import { user } from "../data/demo";

interface Props { navigate: (page: string) => void }

export default function Settings({ navigate }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const sections = [
    {
      title: "Account",
      items: [
        { label: "Security Center", icon: Shield, page: "security-center" },
        { label: "Notifications", icon: Bell, page: "notifications" },
        { label: "Language & Region", icon: Globe, page: null },
        { label: "Linked Bank Accounts", icon: CreditCard, page: "digital-wallet" },
      ],
    },
    {
      title: "Privacy",
      items: [
        { label: "Consent Center", icon: Shield, page: "consent-center" },
        { label: "Activity Log", icon: null, page: "activity-history" },
        { label: "Data & Privacy Policy", icon: null, page: null },
        { label: "Delete Account", icon: null, page: null, danger: true },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "Help & Support", icon: HelpCircle, page: "help-support" },
        { label: "About TrueID", icon: null, page: null },
        { label: "Terms of Service", icon: null, page: null },
      ],
    },
  ];

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto page-transition">
      <div className="mb-5">
        <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">Settings</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Manage your profile and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-5">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl" style={{ background: "#1D6AFF" }}>
              {user.initials}
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#0F172A" }}>
              <Camera size={12} color="white" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-display font-bold text-[#0F172A] text-lg">{user.name}</div>
            <div className="font-mono-data text-xs text-[#64748B] mt-0.5">{user.trueId}</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge-verified text-xs font-semibold px-2.5 py-1 rounded-full">✓ Platinum Verified</span>
              <span className="text-xs text-[#64748B]">Since {user.joinDate}</span>
            </div>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{ background: "#E8EFFF", color: "#1D6AFF" }}
          >
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>

        {editing ? (
          <div className="mt-5 space-y-3">
            {[
              { label: "Full Name", value: name, set: setName },
              { label: "Email Address", value: email, set: setEmail },
              { label: "Phone Number", value: phone, set: setPhone },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs font-medium text-[#64748B] block mb-1">{f.label}</label>
                <input
                  value={f.value}
                  onChange={e => f.set(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A]"
                />
              </div>
            ))}
            <button
              onClick={() => setEditing(false)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white mt-2"
              style={{ background: "#1D6AFF" }}
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-[#F1F5F9]">
            {[
              { label: "Email", value: user.email },
              { label: "Phone", value: user.phone },
              { label: "Location", value: user.location },
              { label: "Occupation", value: user.occupation },
            ].map((f) => (
              <div key={f.label}>
                <div className="text-xs text-[#94A3B8]">{f.label}</div>
                <div className="text-sm font-medium text-[#0F172A] mt-0.5 truncate">{f.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings Sections */}
      {sections.map((section) => (
        <div key={section.title} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden mb-3">
          <div className="px-5 pt-4 pb-2">
            <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#94A3B8", letterSpacing: "0.1em" }}>
              {section.title}
            </div>
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => item.page && navigate(item.page)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-[#F8FAFC] transition-colors"
                >
                  {Icon ? (
                    <Icon size={16} color="#64748B" className="flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                  <span className={`flex-1 text-sm ${("danger" in item && item.danger) ? "text-[#DC2626]" : "text-[#0F172A]"}`}>
                    {item.label}
                  </span>
                  <ChevronRight size={14} color="#CBD5E1" />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Sign out */}
      <button className="w-full py-3 rounded-2xl text-sm font-semibold border border-[#E2E8F0] flex items-center justify-center gap-2 mt-2 hover:bg-[#FEF2F2] hover:border-[#FECACA] transition-colors" style={{ color: "#DC2626" }}>
        <LogOut size={16} /> Sign Out
      </button>

      <p className="text-center text-xs text-[#94A3B8] mt-4">TrueID v2.4.1 · © 2024 TrueID Nigeria</p>
    </div>
  );
}
